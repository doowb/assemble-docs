'use strict';

var assemble = require('assemble');

var app = assemble();

// archive a _gh_pages folder to the specific version folder and build a manifest of archived files
var archive = require('./src/plugins/archive')(app);
app.task('archive', archive('_gh_pages/**/*', 'versions', '0.4.0'));

app.task('default', ['archive']);

module.exports = app;
