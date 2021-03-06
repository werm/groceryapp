module.exports = function (io) {
  'use strict';
  io.on('connection', function (socket) {
    socket.emit('alert', {
      "msg": "Sockets connected!",
      "alertType": "success"
    });

    socket.on('ferret', function (name, fn) {
      fn('woot');
    });

    socket.emit('send:item', {
      name: 'Bob'
    });

    socket.on('send-item', function(data){
      io.sockets.emit('new-item', { item: data });
      // socket.broadcast.emit('new-message', data);
    });

    socket.broadcast.emit('user connected');

    socket.on('message', function (from, msg) {

      console.log('recieved message from', from, 'msg', JSON.stringify(msg));

      console.log('broadcasting message');
      console.log('payload is', msg);
      io.sockets.emit('broadcast', {
        payload: msg,
        source: from
      });
      console.log('broadcast complete');
    });
  });
};