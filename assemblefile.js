'use strict';

var loader = require('assemble-loader');
var extname = require('gulp-extname');
var assemble = require('assemble');
var Plasma = require('plasma');
var path = require('path');


var plasma = new Plasma();
var app = assemble()
  .use(loader())

app.option('archive.version', '0.6.0');
app.option('rethrow', false);
app.option('renameKey', function (fp) {
  return path.basename(fp, path.extname(fp));
});

// archive a _gh_pages folder to the specific version folder and build a manifest of archived files
var archive = require('./src/plugins/archive')(app);
app.task('archive', archive(['_gh_pages/**/*', '!_gh_pages/v/**/*', '!_gh_pages/v'], 'versions'));

// copy archived versions to the docs/v folder
app.task('versions', function () {
  return app.src('versions/**/*')
    .pipe(app.dest('_gh_pages/v'));
});

// load common resources
app.task('load', function (done) {
  app.data(plasma.load(['src/data/*.{json,yml}', 'package.json']))
  app.helpers(require('./src/extensions/helpers/helpers.js'));
  // app.helpers(['src/extensions/*.js', 'helper-prettify']);
  app.partials.load(['templates/includes/**/*.{hbs,md}']);
  app.layouts.load(['templates/layouts/**/*.hbs']);
  done();
});

app.task('docs', function () {
  return app.src('templates/pages/*.hbs')
    .pipe(app.renderFile())
    .pipe(extname())
    .pipe(app.dest('_gh_pages'));
});

app.task('default', ['versions', 'load', 'docs']);

module.exports = app;
