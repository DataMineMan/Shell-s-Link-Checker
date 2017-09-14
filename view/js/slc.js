"use strict";
let socket = {};
try {
  socket = io();
} catch(err) {
  Helper.notify('Connection Error', 'danger', 'cloud-upload');
}

socket.on('connect', () => {
  Helper.notify('Connection Successful', 'success', 'cloud-upload');
  socket.emit('request', 'body');
});
socket.on('disconnect', () => {
  Helper.notify('Connection Error', 'danger', 'cloud-upload');
});
socket.on('logged in', function() {

});
socket.on('requested', updateElement);
