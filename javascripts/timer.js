function Timer(canvas) {
  var ctx = canvas.getContext('2d');
  ctx.scale(-1, 1);

  var goal;

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function draw(text) {
    ctx.font = "20pt Arial";
    ctx.fillText(text, - canvas.width / 2, canvas.height / 2);
  }

  return {
    start: function(sec) {
             goal = moment().add(sec, 'second');
           },
    getImage: function() {
                clear();

                var now = moment();
                var rest = goal.subtract(now);

                draw(rest.format('mm:ss'));
                return canvas.toDataURL();
              }
  };
};
