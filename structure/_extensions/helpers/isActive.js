/**
 * Handlebars Helpers: {{isActive}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */
'use strict';
var _ = require('lodash');
var Handlebars = require('handlebars');

module.exports = function (config) {
  /**
   * Add `active` class for current page.
   * Customize the class in the options hash.
   * @example: {{isActive class="current"}}
   *
   * @usage: {{isActive}}
   */
  return {
    isActive: function(current, options) {
      var context = _.extend(config.context(), this);
      options = options || {};

      var modifier = (options.hash && options.hash.class) ? options.hash.class : 'active';
      if(context.page.basename === current) {
        modifier = ' class="' + modifier + '"';
      }
      return new Handlebars.SafeString(modifier);
    }
  };
};

