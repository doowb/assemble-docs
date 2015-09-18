'use strict';

var assemble = require('assemble');

var app = assemble();
app.option('manifest.version', '0.6.0');
app.option('manifest.app-name', 'assemble');

var manifest = require('./src/plugins/manifest')(app);
app.task('manifest', manifest('_gh_pages/**/*', 'versions'));

app.task('default', ['manifest']);

module.exports = app;
