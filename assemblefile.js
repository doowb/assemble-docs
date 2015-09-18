'use strict';

var assemble = require('assemble');

var app = assemble();
app.option('archive.version', '0.4.0');

// archive a _gh_pages folder to the specific version folder and build a manifest of archived files
var archive = require('./src/plugins/archive')(app);
app.task('archive', archive(['_gh_pages/**/*', '!_gh_pages/v/**/*', '!_gh_pages/v'], 'versions'));


// copy archived versions to the docs/v folder
app.task('versions', function () {
  return app.src('versions/**/*')
    .pipe(app.dest('_gh_pages/v'));
});

app.task('default', ['versions']);

module.exports = app;
