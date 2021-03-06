function Timer(canvas, timerText, finish) {
  var ctx = canvas.getContext('2d');
  var duration = 0;
  var goal;
  var timerId;
  var prevImage;

  draw('00:00');

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  function draw(text) {
    clear();
    ctx.font = "20pt Arial";
    ctx.fillText(text, canvas.width / 2 - 40, canvas.height - 20 );
    timerText.text(text);
  };

  function getImage() {
    var now = moment();
    var rest = goal.unix() - now.unix();

    if (rest > 0) {
      draw(moment(rest * 1000).utc().format('mm:ss'));
    } else {
      clearInterval(timerId);
      draw('00:00');
      showNotice();
      finish();
    }

    return canvas.toDataURL();
  };

  function showImageToHangouts(dataUri) {
    if (typeof(test) === 'undefined') {
      var image = gapi.hangout.av.effects.createImageResource(dataUri);
      image.showOverlay();

      if (prevImage) {
        prevImage.dispose();
      }

      prevImage = image;
    }
  };

  function showNotice() {
    if (typeof(test) === 'undefined') {
      gapi.hangout.layout.displayNotice('TimeOver');
    }
  };

  return {
    start: function() {
             goal = moment().add(duration, 'second');
             duration = 0;
             timerId = setInterval(function () { showImageToHangouts(getImage()); }, 200);
           },
    stop: function() {
            clearInterval(timerId);
            draw('00:00');
          },
    reset: function() {
            duration = 0;
            draw('00:00');
           },
    addMinutes: function(minutes) {
                  duration += 60 * minutes;
                  draw(moment(duration * 1000).utc().format('mm:ss'));
                },
    addSeconds: function(seconds) {
                  duration += seconds;
                  draw(moment(duration * 1000).utc().format('mm:ss'));
                }
  };
};
