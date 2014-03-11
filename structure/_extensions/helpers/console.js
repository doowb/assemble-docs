/**
 * Handlebars Helper: {{logging}}
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */
'use strict';

// node_modules
var chalk = require('chalk');

module.exports = function () {
  return {
    success: function(msg, context) {
      console.log(chalk.green(msg), context);
    },

    warn: function(msg, context) {
      console.log(chalk.yellow(msg), context);
    }
  };
};
