'use strict';

const gulp = require('gulp-async-tasks')(require('gulp'));
const git = require('gulp-git');
const argv = require('yargs').argv;
const packageJSON = require('./package.json');
const runSequence = require('run-sequence');
const bump = require('gulp-bump');
let version = {};

gulp.task('default', () => {
  runSequence('tag', 'pushTag');
});


gulp.task('tag', () => {
  // Major, Minor, patch
  version.version = packageJSON.version;
  let major;
  let minor;
  let patch;

  const indicies = [];
  for (let i = 0; i < version.length; i++) {
    if (version.version[i] === '.') {
      indicies.push(i);
    }
  }
  patch = version.version.substring(indicies[1] + 1, version.version.length);
  minor = version.version.substring(indicies[0] + 1, indicies[1]);
  major = version.version.substring(indicies[0], indicies[0] - version.version.length);

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
  version.version = major + '.' + minor + '.' + patch;
  git.tag('v' + version.version, argv.message, { args: '-a' }, (err) => {
    if (err) throw err;
  });
  return gulp
        .src(['./package.json'])
        .pipe(bump(version))
        .pipe(gulp.dest('./'));
});


gulp.task('pushTag', () => {
  git.push('github', [], { args: '--tags' }, (err) => {
    if (err) throw err;
  });
});
