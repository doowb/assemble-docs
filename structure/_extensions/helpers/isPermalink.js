/**
 * Handlebars Helpers: {{isPermalink}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */
'use strict';

module.exports = function (config) {
  return {
    isPermalink: function(value, fallback) {
      return config.options.permalinks ? value : fallback + '.html';
    }
  };
};