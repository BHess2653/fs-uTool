'use strict';
// Initializes gulp and sets it to an instance of gulp
const gulp = require('gulp');
// Initializes variable git and sets it to an instance of gulp-git
const git = require('gulp-git');
// Initializes variable argv and sets it to an instance of yargs
const argv = require('yargs').argv;
// Initializes packageJSON and sets it to an instance of the package.json file
const packageJSON = require('./package.json');
// Initializes runSequence and sets it to an instance of run-sequence
const runSequence = require('run-sequence');
// Initializes bump and sets it to an instance of gulp-bump
const bump = require('gulp-bump');
// Initializes version and sets it to the packageJSON.version
let version = packageJSON.version;

// Gulp default task that is our task runner.
gulp.task('default', () => {
  // runSequence lets you force one task to finish before starting the next
  runSequence('tag', 'pushTag');
});


gulp.task('tag', () => {
  // Initiqlizes major, minor, and patch
  let major;
  let minor;
  let patch;
  // Initializes packageBump as an object literal
  let packageBump = {};

  // Initializes indicies as an array literal
  const indicies = [];
  // Loop through version and get the index of every .
  for (let i = 0; i < version.length; i++) {
    if (version[i] === '.') {
      // Push the index's of the .'s into indicies
      indicies.push(i);
    }
  }
  // Initializes patch and sets it to anything that comes after the second .
  patch = version.substring(indicies[1] + 1, version.length);
  // Initializes minor and sets it to anything inbetween the .'s'
  minor = version.substring(indicies[0] + 1, indicies[1]);
  // Initializes major and sets it to anything before the first .
  major = version.substring(indicies[0], indicies[0] - version.length);

  // If more than one version bump type is chosen, don't do anything, end all
  if (argv.major && argv.minor || argv.minor && argv.patch || argv.patch && argv.major) {
    console.warn('Please only select, major, minor, or patch');
  } else {
    // If major is selected reset minor and patch, itterate major
    if (argv.major) {
      major++;
      minor = 0;
      patch = 0;
      // Else if minor is selected itterate minor
    } else if (argv.minor) {
      minor++;
      // Else if patch is seleceted itterate patch
    } else if (argv.patch) {
      patch++;
    } else {
      console.log('no update');
      git.checkout('bump', (err) => {
        if (err) throw err;
      });
      process.exit();
    }
  }
  // Builds a new string for the version
  version = major + '.' + minor + '.' + patch;
  // Sets the version property of packageBump to equal version
  // This is needed because of the way gulp-bump works
  packageBump.version = version;
  // This creates the tag
  git.tag('v' + version, argv.message, { args: '-a' }, (err) => {
    if (err) throw err;
  });
 // This puts the new version in package.json
  gulp.src('./*.json')
    .pipe(bump({version: packageBump.version}))
    .pipe(gulp.dest('./'));

});

// This pushes the tag(s) to github
gulp.task('pushTag', () => {
  git.push('github', [], { args: '--tags' }, (err) => {
    if (err) throw err;
  });
});
