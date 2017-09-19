module.exports = function(io) {
  io.on('connection', function (socket) {
    console.log('client connected:', socket.id);

    socket.on('disconnect', function(data) {
      console.log('client disconnected', socket.id);
    });
    //the socket.emit sends the message back to the send
    //while the broadcast sends it to everyone else that is connected
    
    socket.on('hello', function(data) {
      console.log(data);
      socket.emit('hello', data);
      socket.broadcast.emit('hello', data);
    })
  });


}
