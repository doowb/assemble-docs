'use strict';

var assemble = require('assemble');
var app = assemble();


app.task('default', function (done) {
  console.log('default');
  done();
});

module.exports = app;
