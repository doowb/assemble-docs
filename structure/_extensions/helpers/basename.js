/**
 * Handlebars Helper: {{basename}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

'use strict';

// node_modules
var file = require('fs-utils');

module.exports = function () {
  return {
    basename: function (filepath) {
      return file.name(filepath);
    }
  };
};
