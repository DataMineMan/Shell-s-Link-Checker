"use strict";
function sel(selector, cb) {
  let ele = null;
  try {
    ele = jQuery(selector);
    if(!ele[0]) throw new Error('Unable to locate item');
    return cb(null, ele)
  } catch(err) {
    return cb(err);
  }
}
function selAttr(attr, cb) {
  let
    ele = null;
  try {
    ele = jQuery(`*[${attr}]`);
    if(!ele[0]) throw new Error('Unable to locate item');
    return cb(null, ele)
  } catch(err) {
    return cb(err);
  }
}

function updateElement(type, search, content) {
  if(type === 'tag') {
    sel(search, (err, element) => {
      if(err) return Helper.notify('App Error.', 'danger', 'cloud-download');
      element.html(content);
    });
  }
}