/**
 * Handlebars Helpers: {{expand}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

'use strict';

var file = require('fs-utils');

module.exports = function () {
  return {
    expand: function(patterns) {
      return file.expand(patterns);
    }
  };
};