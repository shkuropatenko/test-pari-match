'use strict';

const Handlebars = tars.packages.handlebars;

/**
 * You can add your own helpers to handlebarsHelpers Object
 * All helpers from that object will be available in templates
 * @type {Object}
 */
const handlebarsHelpers = {

    /**
     * This is an example of handlebars-helper
     * This helper gets string and returns it
     * @param  {String} str Source string
     * @return {String}     Result string
     */
    exampleHelper: function (str) {
        return str;
    },

    // math
    add: function (value, addition) {
        return value + addition;
    },

    subtract: function (value, substraction) {
        return value - substraction;
    },

    divide: function (value, divisor) {
        return value / divisor;
    },

    multiply: function (value, multiplier) {
        return value * multiplier;
    },

    floor: function (value) {
        return Math.floor(value);
    },

    ceil: function (value) {
        return Math.ceil(value);
    },

    round: function (value) {
        return Math.round(value);
    },

    // Attempt to parse the int, if not class it as 0
    sum: function () {
        var args = _.flatten(arguments);
        var sum = 0;
        var i = args.length - 1;
        while (i--) {
            sum += _.parseInt(args[i]) || 0;
        }
        return Number(sum);
    }
};

var hasOwn = Object.prototype.hasOwnProperty;

function noop() {
    return '';
}
function getStack(context) {
    return context.$$layoutStack || (
        context.$$layoutStack = []
    );
}

function applyStack(context) {
    var stack = getStack(context);

    while (stack.length) {
        stack.shift()(context);
    }
}

function getActions(context) {
    return context.$$layoutActions || (
        context.$$layoutActions = {}
    );
}

function getActionsByName(context, name) {
    var actions = getActions(context);

    return actions[name] || (
        actions[name] = []
    );
}

function applyAction(val, action) {
    var context = this;

    function fn() {
        return action.fn(context, action.options);
    }

    switch (action.mode) {
        case 'append': {
            return val + fn();
        }

        case 'prepend': {
            return fn() + val;
        }

        case 'replace': {
            return fn();
        }

        default: {
            return val;
        }
    }
}

function mixin(target) {
    var arg, key,
        len = arguments.length,
        i = 1;

    for (; i < len; i++) {
        arg = arguments[i];

        if (!arg) {
            continue;
        }

        for (key in arg) {
            // istanbul ignore else
            if (hasOwn.call(arg, key)) {
                target[key] = arg[key];
            }
        }
    }

    return target;
}

const handlebarsLayoutsHelpers = {
    extend: function (name, customContext, options) {
        // Make `customContext` optional
        if (arguments.length < 3) {
            options = customContext;
            customContext = null;
        }

        options = options || {};

        var fn = options.fn || noop,
            context = mixin({}, this, customContext, options.hash),
            data = Handlebars.createFrame(options.data),
            template = Handlebars.partials[name];

        // Partial template required
        if (template == null) {
            throw new Error('Missing partial: \'' + name + '\'');
        }

        // Compile partial, if needed
        if (typeof template !== 'function') {
            template = Handlebars.compile(template);
        }

        // Add overrides to stack
        getStack(context).push(fn);

        // Render partial
        return template(context, { data: data });
    },

    /**
		 * @method embed
		 * @param {String} name
		 * @param {?Object} customContext
		 * @param {Object} options
		 * @param {Function(Object)} options.fn
		 * @param {Object} options.hash
		 * @return {String} Rendered partial.
		 */
    embed: function () {
        var context = mixin({}, this || {});

        // Reset context
        context.$$layoutStack = null;
        context.$$layoutActions = null;

        // Extend
        return helpers.extend.apply(context, arguments);
    },

    /**
		 * @method block
		 * @param {String} name
		 * @param {Object} options
		 * @param {Function(Object)} options.fn
		 * @return {String} Modified block content.
		 */
    block: function (name, options) {
        options = options || {};

        var fn = options.fn || noop,
            data = Handlebars.createFrame(options.data),
            context = this || {};

        applyStack(context);

        return getActionsByName(context, name).reduce(
            applyAction.bind(context),
            fn(context, { data: data })
        );
    },

    /**
		 * @method content
		 * @param {String} name
		 * @param {Object} options
		 * @param {Function(Object)} options.fn
		 * @param {Object} options.hash
		 * @param {String} options.hash.mode
		 * @return {String} Always empty.
		 */
    content: function (name, options) {
        options = options || {};

        var fn = options.fn,
            data = Handlebars.createFrame(options.data),
            hash = options.hash || {},
            mode = hash.mode || 'replace',
            context = this || {};

        applyStack(context);

        // Getter
        if (!fn) {
            return name in getActions(context);
        }

        // Setter
        getActionsByName(context, name).push({
            options: { data: data },
            mode: mode.toLowerCase(),
            fn: fn
        });
    }
}

module.exports = Object.assign(
    handlebarsHelpers,
    handlebarsLayoutsHelpers
);
