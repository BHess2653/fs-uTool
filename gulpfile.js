'use strict';

const gulp = require('gulp-async-tasks')(require('gulp'));
const git = require('gulp-git');
const argv = require('yargs').argv;
const packageJSON = require('./package.json');
const runSequence = require('run-sequence');
const bump = require('gulp-bump');
let version = packageJSON.version;

gulp.task('default', () => {
  runSequence('tag', 'pushTag');
});


gulp.task('tag', () => {
  // Major, Minor, patch
  let major;
  let minor;
  let patch;
  let packageBump = {};

  const indicies = [];
  for (let i = 0; i < version.length; i++) {
    if (version[i] === '.') {
      indicies.push(i);
    }
  }
  patch = version.substring(indicies[1] + 1, version.length);
  minor = version.substring(indicies[0] + 1, indicies[1]);
  major = version.substring(indicies[0], indicies[0] - version.length);
  console.log('patch: ' + patch);
  console.log('minor: ' + minor);
  console.log('major: ' + major);

  console.log('version number out of if: ' + major + '.' + minor + '.' + patch);

  if (argv.major && argv.minor || argv.minor && argv.patch || argv.patch && argv.major) {
    console.log('Please only select, major, minor, or patch');
  } else {
    if (argv.major) {
      major++;
      minor = 0;
      patch = 0;
      console.log('inner major: ' + major);
    } else if (argv.minor) {
      minor++;
      console.log('inner minor: ' + minor);
    } else if (argv.patch) {
      patch++;
      console.log('inner patch: ' + patch);
    } else {
      console.log('no update');
      git.checkout('karl', (err) => {
        if (err) throw err;
      });
      process.exit();
    }
  }
  version = major + '.' + minor + '.' + patch;
  packageBump.version = version;
  console.log(packageBump.version);
  git.tag('v' + version, argv.message, { args: '-a' }, (err) => {
    if (err) throw err;
  });

  return gulp
          .src(['./package.json'])
          .pipe(bump(packageBump.version))
          .pipe(gulp.dest('path to your root directory'));


});


gulp.task('pushTag', () => {
  git.push('github', [], { args: '--tags' }, (err) => {
    if (err) throw err;
  });
});
