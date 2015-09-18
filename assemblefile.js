'use strict';

var assemble = require('assemble');

var app = assemble();
var manifest = require('./src/plugins/manifest')(app);

app.task('manifest', manifest('_gh_pages/**/*', 'versions', '0.6.0'));

app.task('default', ['manifest']);

module.exports = app;
