"use strict";
const Helper = {
  notify: function(msg, status = 'danger', icon = false) {
    if (icon) msg = `<span uk-icon="icon: ${icon}"></span> ${msg}`;
    UIkit.notification(msg, status);
  },
  session: function(key) {
    jQuery.cookie('id', key, {
      expires : 1,
      path : '/',
      domain : window.location.origin
    });
  }
};