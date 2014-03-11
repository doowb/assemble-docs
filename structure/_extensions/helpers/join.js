/**
 * Handlebars Helpers: {{join}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */
'use strict';

module.exports = function () {
  return {
    join: function(arr, sep) {
      return arr.join(sep);
    }
  };
};