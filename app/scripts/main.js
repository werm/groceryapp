var socket = io(); // TIP: io() with no args does auto-discovery
socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
  socket.on('alert', function(data){
    $('#alerts').html('<div class="alert alert-' + data.alertType + ' alert-fixed-top">' + data.msg + '</div>');
    $('#alerts').delay(2000).fadeOut('slow');
  });

  $(document).on('submit', '#itemForm', function(e){
    e.preventDefault();
    var itemName = $('#itemName').val();
    var itemQty = $('#itemQuantity').val();
    var itemNote = $('#itemNote').val();
    var newItem = { name: itemName, qty: itemQty, note: itemNote }
    socket.emit('new item', newItem, function (data) {
      console.log(data); // data will be 'woot'
    });
  });
});
