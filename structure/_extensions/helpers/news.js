/**
 * Handlebars Helper: {{news}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */
'use strict';
var Handlebars = require('handlebars');

module.exports = function() {
  return {
    news: function (context, options) {
      var result = '<ul class="list-group">';
      var data;

      for (var i = 0; i < context.length; i++) {
        if (options.data) {
          data = Handlebars.createFrame(options.data || {});
          data.index = i;
        }

        result += '<li class="list-group-item">' + options.fn(context[i], {
          data: data
        }) + '</li>';
      }

      result += '</ul>';
      return result;
    }
  }
};
