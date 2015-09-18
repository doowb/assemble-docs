// These are some really brittle experimental helpers. I'm just having some fun
// playing around for our docs, but I strongly recommend you not use these on
// your own projects. - Jon

var Handlebars = require('handlebars');
var glob = require('globby');
var fs = require('fs');

var helpers = module.exports = {};

var urlNormalize = function(filepath) {
  return filepath.replace(/\\/g, "/");
};

var toString = function(val) {
  if (val == null) {
    return "";
  } else {
    return val.toString();
  }
};

var isUndefined = function(value) {
  return value === 'undefined' || toString.call(value) === '[object Function]' || (value.hash != null);
};

var read = function (fp) {
  return fs.readFileSync(fp, 'utf8');
}

var globFiles = function(src) {
  var content = glob.sync(src)
    .map(read)
    .join('\n');
  return content;
};

helpers['default'] = function (a, b) {
  return a || b;
};

helpers['isnt'] = function (a, b, options) {
  if (a === b) {
    return options.inverse(this.context);
  }
  return options.fn(this.context);
};

helpers['is'] = function (a, b, options) {
  if (a === b) {
    return options.fn(this.context);
  }
  return options.inverse(this.context);
};

helpers['relative'] = function (from, to) {
  return '';
};

helpers['uppercase'] = function(str) {
  return (typeof str === 'string' ? str.toUpperCase() : str);
};

helpers['lowercase'] = function(str) {
  return (typeof str === 'string' ? str.toLowerCase() : str);
};

helpers['truncate'] = function(str, num, end, options) {
  if (typeof end === 'object') {
    options = end;
    end = '';
  }
  if (str.length > num) {
    return str.substr(0, num) + end;
  }
  return str;
}

helpers['gt'] = function (a, b, options) {
  if (a > b) {
    return options.fn(this.context);
  }
  return options.inverse(this.context);
};


// helpers['readYFM'] = function(src) {
//   var props = assemble.data.readYFM(src, {fromFile: true});
//   var str = "\n```json\n" + (util.inspect(props, true, null)) + "\n```\n";
//   return new Handlebars.SafeString(str);
// };

/*
 * This helper is used to generate links for Assemble's documentation
 * The helper simply builds a list of pages in the given directory.
 */
helpers['generate-links'] = function(str, dir) {
  if(isUndefined(dir)) {
    dir = '';
  } else {
    dir = dir;
  }
  var content = glob.sync(str).map(function(link) {
    var page = path.basename(link).replace(/\.md\.hbs/g, '');
    return '[' + page.toLowerCase().replace(/\s/g, '-').replace(/\./g, '-') + ']: ' + dir + page + '.html' ;
  });
  return new Handlebars.SafeString(content.join('\n'));
};

helpers['links-docs'] = function(str) {
  var content = glob.sync(str).map(function(link) {
    var page = path.basename(link).replace(/\.hbs/g, '');
    var docs = '';
    if(options.docs) {
      var docs = 'http://assemble.io/docs/';
    }
    return '[' + page + ']: ' + docs + page + '.html' ;
  });
  return new Handlebars.SafeString(content.join('\n'));
};

// helpers['links-gh-json'] = function(str, dir) {
//   var links = {};
//   var content = glob.sync(str).map(function(link) {
//     var page = path.basename(link).replace(/\.hbs/g, '');
//     return '"' + page.toLowerCase() + '": "[' + page + ']: ' + page + '.html"' ;
//   });
//   result = '{' + content + '}';
//   if(isUndefined(dir)) {
//     dir = 'src/data/gh-pages-links.json';
//   } else {
//     dir = dir;
//   }
//   // result = ;
//   result = JSON.stringify(JSON.parse(result), null, 2);
//   grunt.file.write(dir, result);
// };

helpers['links-docs'] = function(str) {
  var content = glob.sync(str).map(function(link) {
    var file = path.basename(link).replace(/\.hbs/g, '');
    return '[' + file + ']: http://assemble.io/docs/' + file + '.html' ;
  });
  return new Handlebars.SafeString(content.join('\n'));
};

// helpers['links-docs-json'] = function(str, dir) {
//   var links = {};
//   var content = glob.sync(str).map(function(link) {
//     var page = path.basename(link).replace(/\.hbs/g, '');
//     return '"' + page.toLowerCase().replace(/\s/g, '').replace(/\./g, '') + '": "[' + page + ']: http://assemble.io/docs/' + page + '.html"' ;
//   });
//   result = '{' + content + '}';
//   if(isUndefined(dir)) {
//     dir = 'src/data/docs-links.json';
//   } else {
//     dir = dir;
//   }
//   grunt.file.write(dir, JSON.stringify(JSON.parse(result), null, 2));
// };
