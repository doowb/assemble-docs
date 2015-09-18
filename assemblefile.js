'use strict';

var assemble = require('assemble');

var app = assemble();
app.option('archive.version', '0.4.0');

// archive a _gh_pages folder to the specific version folder and build a manifest of archived files
var archive = require('./src/plugins/archive')(app);
app.task('archive', archive('_gh_pages/**/*', 'versions'));

app.task('default');

module.exports = app;
