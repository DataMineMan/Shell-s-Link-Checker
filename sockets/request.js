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
  if(request !== 'register' && request !== 'login' && !this.user) {
    request = 'login';
  }
  switch(request) {
    case 'page':
      html = getPageContent.apply(this, [this.user.page]);
      break;
    default:
      html = pug.compileFile(`view/pug/${request}.pug`)();
      break;
  }
  this.emit('requested', 'tag', 'page', html);
};

function getPageContent(page) {
  let data = {}, html = '';
  switch(page) {
    case 'home':
      data = this.user.data();
      break;
  }
  html = pug.compileFile(`view/pug/${page}.pug`)(data);
  return html;
}