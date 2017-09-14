/**
 *
 * @title   Shell's Link Checker
 * @author  Jon Taylor
 * @since   0.1
 * @file    scripts/request.js
 * @description   This will take the request for updated html content.
 *
 */
'use strict';
const pug = require('pug');
module.exports = function(request) {
  let html = '';
  switch(request) {
    case 'body':
      html = pug.compileFile(`view/pug/${request}.pug`)();
      break;
  }
  this.emit('requested', 'tag', 'shell', html);
};