var game = init();

$(document).keydown(function(event) {
  game.dot.changeDir(event.keyCode);
  // event.preventDefault();
});

function init() {
  var $dot = $("#dot"),
      distance = 10,
      rate = 40,
      min = 0,
      maxY,
      maxX;

  var controllerListenerInterval = setInterval(controllerListener, 5);
  
  function dot() {
    var direction = "";
    var angle = 0;

    var moveInterval = setInterval(move, rate);
    
    function move() {
      var left = parseInt($dot.css('left'));
      var top = parseInt($dot.css('top'));

      if (direction === "L" && left > min) { // left
        $dot.css("left", left - distance+"px");
        rotate(-30);
      }
      else if (direction === "R" && left < maxX) { // right
        $dot.css("left", left + distance+"px");
        rotate(30);
      }
      else if (direction === "U" && top > min) { // up
        $dot.css("top", top - distance+"px");
      }
      else if (direction === "D" && top < maxY) { // down
        $dot.css("top", top + distance+"px");
      }
    }
    
    function rotate(deg) {
      angle = (angle += deg) % 360;
      $dot.css('transform', 'rotateZ('+angle+'deg)');
    }

    function changeDir(k) {
      if (k === 37 || k.gpLeft === true) { // left
        direction = "L";
      }
      else if (k === 39 || k.gpRight === true) { // right
        direction = "R";
      }
      else if (k === 38 || k.gpUp === true) { // up
        direction = "U";
      }
      else if (k === 40 || k.gpDown === true) { // down
        direction = "D";
      } else if (k === 32) { // stop
        direction = ""; 
      }
    }

    return {
      rotate: rotate,
      changeDir: changeDir
    };
  }
  
  function controllerListener() {
  //  gp = navigator.getGamepads()[0].buttons;

  //  var buttonPressed = {
  //    gpUp: gp[12].pressed,
  //    gpDown: gp[13].pressed,
  //    gpLeft: gp[14].pressed,
  //    gpRight: gp[15].pressed
  //  };

  //  game.dot.changeDir(buttonPressed);
  }

	(function calcMax() {
    maxX = $("#container").width() - $dot.outerWidth();
    maxY = $("#container").height() - $dot.outerHeight();
  })();

  return {
    dot: dot()
  };
}
