/**
 * Handlebars Helper: {{read}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

'use strict';

var path = require('path');
var matter = require('gray-matter');
var file = require('fs-utils');
var Handlebars = require('handlebars');

module.exports = function () {

  return {
    read: function(filepath) {
      var str = file.readFileSync(path.resolve(filepath));

      // Use gray-matter to parse content in case YAML front matter
      // exists and needs to be stripped.
      return new Handlebars.SafeString(matter(str).content + '\n');
    }
  }
};