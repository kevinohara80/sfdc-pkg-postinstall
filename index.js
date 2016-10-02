var path = require('path');
var fs = require('fs');
var PACKAGE_SRC_DIR = process.cwd() + '/src';
var PROJECT_SRC_DIR = path.resolve(__dirname, '../../src');
var PACKAGE_JSON = require(process.cwd() + '/package.json');

function log(msg) { console.log('  -> ' + msg); }
function blank() { console.log(''); }

function mkdirp(dir) {
  var dirStat;
  try {
    dirStat = fs.statSync(dir);
  } catch (e) {
    fs.mkdirSync(dir);
    return;
  }
  if(!dirStat.isDirectory()) {
    throw new Error(dir + ' exists but is not a directory');
  }
}

function mergeDir(src, target, dirsOnly) {
  log('merging dir: ' + src);
  
  mkdirp(target);
  
  var dirs = fs.readdirSync(src);

  if(dirs && dirs.length) {
    dirs.forEach(function(d) {
      
      var newSrc = src + '/' + d;
      var newTarget = target + '/' + d;
      var stat = fs.statSync(newSrc);

      if(stat.isDirectory()) {
        mkdirp(newTarget);
        mergeDir(newSrc, newTarget);
      } else if(stat.isFile() && !dirsOnly) {
        mergeFile(newSrc, newTarget)
      } else {
        log('ignoring file: ' + newSrc);
      }

    });
  }
}

function mergeFile(src, target) {
  log('merging file: ' + src);
  
  var contents = fs.readFileSync(src);
  fs.writeFileSync(target, contents, { encoding: 'utf8' });
}

module.exports.install = function() {

  blank();

  console.log('SFDC PACKAGE POST INSTALL => ' + PACKAGE_JSON.name + '@' + PACKAGE_JSON.version);

  log('package src dir: ' + PACKAGE_SRC_DIR);
  log('project src dir: ' + PROJECT_SRC_DIR);

  log('merging files');
  
  blank();

  mergeDir(PACKAGE_SRC_DIR, PROJECT_SRC_DIR, true);

  blank();

  log('merge complete!');

  blank();
  
}
