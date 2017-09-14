"use strict";
// Connecting to the Web Socket
let socket = {};
try {
  // Connecting to the Web Socket
  socket = io();
} catch(err) {
  // Failed and shows message.
  Helper.notify('Connection Error', 'danger', 'cloud-upload');
}

socket.on('connect', () => {
  let session = Cookies.get('session');
  if(!session) session = '';
  Helper.notify('Connection Successful', 'success', 'cloud-upload');
  socket.emit('requested user session', session);
  socket.emit('request', 'page');
});
socket.on('disconnect', () => {
  Helper.notify('Connection Error', 'danger', 'cloud-upload');
});
socket.on('request user session', function() {
});

socket.on('requested', updateElement);
