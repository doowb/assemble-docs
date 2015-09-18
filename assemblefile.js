'use strict';

var assemble = require('assemble');
var manifest = require('./src/plugins/manifest');

var app = assemble();

app.task('manifest', manifest(app, '0.6.0', 'versions'));

app.task('default', ['manifest']);

module.exports = app;
