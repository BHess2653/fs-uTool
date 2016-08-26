exports.debug = (title, obj) => {
  const colors = require('colors');
  const seperator = '\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n';
  const time = new Date();
  colors.setTheme({
    create: 'green',
    read: 'yellow',
    update: 'magenta',
    delete: 'red',
    error: 'red',
  });
  const output = seperator + title + '\n' + JSON.stringify(obj) + '\n' + time + seperator;
    console.log(output);
};

exports.bump = (version, bumpType) => {
  let patch;
  let minor;
  let major;

  console.log(version);
  console.log(bumpType);

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


    // If major is selected reset minor and patch, itterate major
    if (bumpType === 'major') {
      major++;
      minor = 0;
      patch = 0;
      // Else if minor is selected itterate minor
    } else if (bumpType === 'minor') {
      minor++;
      patch = 0;
      // Else if patch is seleceted itterate patch
    } else if (bumpType === 'patch') {
      patch++;
    } else {
      console.log('no update');
    }
    version = major + '.' + minor + '.' + patch;
    console.log('New Version: ' + version);


};
