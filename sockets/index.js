/**
 *
 * @title   Shell's Link Checker
 * @author  Jon Taylor
 * @since   0.1
 * @file    scripts/index.js
 * @description   This file will connect allow of the socket events together.
 *
 */
'use strict';

module.exports = function(socket) {
  socket.on('request', require('./request'));
};