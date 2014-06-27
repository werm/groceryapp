var socket = io(); // TIP: io() with no args does auto-discovery
socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
  socket.emit('ferret', 'tobi', function (data) {
    console.log(data); // data will be 'woot'
  });
});