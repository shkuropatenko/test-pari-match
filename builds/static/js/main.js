// parallax

jQuery(function(){
  var scene = document.getElementById('scene');
  var parallaxInstance = new Parallax(scene, {
    relativeInput: true
  });
  parallaxInstance.friction(0.1, 0.1);
});
