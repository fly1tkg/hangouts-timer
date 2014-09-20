function Timer(canvas) {
  var ctx = canvas.getContext('2d');
  ctx.scale(-1, 1);

  var goal;
  var timerId;

  function clear() {
    ctx.clearRect(0, 0, - canvas.width, canvas.height);
  }

  function draw(text) {
    ctx.font = "20pt Arial";
    ctx.fillText(text, - canvas.width / 2, canvas.height / 2);
  }

  function getImage() {
    clear();

    var now = moment();

    if (goal.unix() - now.unix() > 0) {
      var rest = moment(goal).subtract(now);
      draw(rest.format('mm:ss'));
    } else {
      clearInterval(timerId);
      draw('00:00');
    }

    return canvas.toDataURL();
  }

  return {
    start: function(sec, callback) {
             goal = moment().add(sec, 'second');
             timerId = setInterval(getImage, 200);
           }
  };
};
