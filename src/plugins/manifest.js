'use strict';

var path = require('path');
var pkg = require('get-pkgs');
var semver = require('semver');
var through = require('through2');

module.exports = function (app, version, dest) {
  return function (done) {
    pkg(['assemble'], function (err, pkgs) {
      if (err) return done(err);
      var old = semver(pkgs[0].version);
      var current = semver(version);
      var major = semver.compareIdentifiers(old.major, current.major);
      var minor = semver.compareIdentifiers(old.minor, current.minor);

      if (major > 0 || (major === 0 && minor >= 0)) {
        return done();
      }

      app.src('_gh_pages/**/*', {dotfiles: true})
        .pipe(manifest(app, old))
        .pipe(app.dest(dest))
        .on('error', done)
        .on('end', done);
    });
  };
};

function manifest (app, version) {
  var files = [];
  return through.obj(function (file, enc, cb) {
      files.push(file.relative);
      cb();
    }, function (cb) {
      var v = version.major + '.' + version.minor + '.0';
      var file = app.view({path: path.join(v, 'manifest.json'), content: JSON.stringify(files, null, 2) });
      this.push(file);
      cb();
    });
}
