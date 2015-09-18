'use strict';

var assemble = require('assemble');

var app = assemble();

// manifest plugin configuration
app.option('manifest.version', '0.6.0');
app.option('manifest.app-name', 'assemble');

// manifest plugin that will generate a new manifest file if version minor bump
var manifest = require('./src/plugins/manifest')(app);
app.task('manifest', manifest('_gh_pages/**/*', 'versions'));

app.task('default', ['manifest']);

module.exports = app;
