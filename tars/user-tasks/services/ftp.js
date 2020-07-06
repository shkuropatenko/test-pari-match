'use strict';

const gulp = tars.packages.gulp;
const tarsConfig = tars.config;
let localConfig = false;
try {
    localConfig = require( process.cwd() + '/tars-local-config.js');
} catch (error) {
    tars.say('local config not found');
}
// Include browserSync, if you need to reload browser:
// const browserSync = tars.packages.browserSync;

let ftp = require('vinyl-ftp');
let gutil = tars.packages.gutil;

/**
 * Upload build by ftp
 */
module.exports = function () {
    // ['main:build'],
    return gulp.task( 'service:ftp', done => {
        if (tarsConfig.useFTP && localConfig && localConfig.ftp.host && localConfig.ftp.user && localConfig.ftp.pass) {
            let conn = ftp.create( {
                'host': localConfig.ftp.host,
                'user': localConfig.ftp.user,
                'password': localConfig.ftp.pass,
                'parallel': 5,
                'log': gutil.log
            });

            // using base = '.' will transfer everything to /public_html correctly
            // turn off buffering in gulp.src for best performance

            return gulp.src(`${tars.options.build.path}**`, { base: tars.options.build.path, buffer: false })
                .pipe( conn.newerOrDifferentSize( localConfig.ftp.remotePath + tars.packageInfo.name ) ) // only upload newer files
                .pipe( conn.dest( localConfig.ftp.remotePath + tars.packageInfo.name ) );
        }

        tars.skipTaskLog('service:ftp', 'FTP is not used');
        done(null);
    } );
};
