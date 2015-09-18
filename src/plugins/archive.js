'use strict';

var path = require('path');
var semver = require('semver');
var through = require('through2');

module.exports = function (app) {
  return function (src, dest, version) {
    return function () {
      version = semver(version);
      dest = path.join(dest, versionPath(version));

      return app.src(src, {dotfiles: true})
        .pipe(manifest(app))
        .pipe(app.dest(dest));
    };
  };
};

function versionPath (version) {
  return version.major + '.' + version.minor + '.0';
}

function manifest (app) {
  var files = [];
  return through.obj(function (file, enc, cb) {
      files.push(file.relative);
      cb(null, file);
    }, function (cb) {
      var file = app.view({path: 'manifest.json', content: JSON.stringify(files, null, 2) });
      this.push(file);
      cb();
    });
}
