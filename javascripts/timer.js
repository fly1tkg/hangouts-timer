function Timer(canvas) {
  var ctx = canvas.getContext('2d');
  ctx.scale(-1, 1);

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function draw() {
    ctx.font = "20pt Arial";
    ctx.fillText("10:00", - canvas.width / 2, canvas.height / 2);
  }

  return {
    getImage: function() {
                clear();
                draw();
                return canvas.toDataURL();
              }
  };
};
