exports.debug = (title, obj) => {
  const colors = require('colors');
  const fs = require('fs');

  const seperator = '\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n';
  const time = new Date();
  colors.setTheme({
    create: 'green',
    read: 'yellow',
    update: 'magenta',
    delete: 'red',
    error: 'red',
  });
  const output = seperator + title + JSON.stringify(obj) + '\n' + time + seperator;

  if (process.env.DEBUG) {
    fs.appendFile('lib/logs/eLog.log', output, 'utf8', (err) => {
      if (err) throw err;
    });
    console.log(output);
  }
};

// Increment the Version passed, based off of pVersion and pType.
exports.incVersion = (pVersion, pType) => {
  const errMsg = "e.x. 'major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease'";

  // Ensure that pVersion and pType are of type String.
  if (pVersion !== String(pVersion)) {
    exports.debug('pVersion is not valid', "e.x. '1.0.0-alpha' > '1.0.0-alpha.1' > " +
    "'1.0.0-alpha.beta' > '1.0.0-beta' > '1.0.0' > '1.0.1' > '1.1.0' > '2.0.0'", 'error');

    return false;
  } else if (pType !== String(pType)) {
    exports.debug('pType is not valid', errMsg, 'error');

    return false;
  }

  // pVersion e.x. 1.0.0-prealpha.23

  // Store the first split value of pVersion.
  const ids = pVersion ? pVersion.split('-')[0] : undefined; // e.x. '1.0.0'

  // Store the further split values of each split value of pVersion.
  const aSplit = ids ? ids.split('.') : undefined; // e.x. ['1', '0', '0']
  let major = aSplit && aSplit[0] ? Number(aSplit[0]) : 1; // e.x. 1
  let minor = aSplit && aSplit[1] ? Number(aSplit[1]) : 0; // e.x. 0
  let patch = aSplit && aSplit[2] ? Number(aSplit[2]) : 0; // e.x. 0

  // Store the second split value of pVersion.
  const preRelIds = pVersion ? pVersion.split('-')[1] : undefined; // e.x. 'prealpha.23'

  // Store the further split values of each split value of pVersion.
  const bSplit = preRelIds ? preRelIds.split('.') : undefined; // e.x. ['prealpha', '23']
  let preRelType = bSplit && bSplit[0] ? String(bSplit[0]) : undefined; // e.x. 'prealpha'
  let preRelNumb = bSplit && bSplit[1] ? Number(bSplit[1]) : undefined; // e.x. 23

  // Convert pType to lower case.
  const type = pType.replace('-', '').toLowerCase();

  // If pType equals a case...
  switch (type) {
    case 'major':
      major++; // Increment major by one.

      minor = 0; // Reset minor to zero.

      patch = 0; // Reset patch to zero.

      break;

    case 'minor':
      minor++; // Increment minor by one.

      patch = 0; // Reset patch to zero.

      break;

    case 'patch':
      patch++; // Increment patch by one.

      break;

    case 'premajor':
    case 'preminor':
    case 'prepatch':
    case 'prerelease':
      major = 1; // Reset major to one.

      minor = 0; // Reset minor to zero.

      patch = 0; // Reset patch to zero.

      // Define preRelType, if it's not set.
      // This happens if pVersion has never been pre-versioned.
      if (!preRelType) {
        preRelType = type;

        preRelNumb = undefined;

        break;
      }

      // If preRelNumb is a number increment preRelNumb by one.
      if (preRelNumb && preRelNumb === Number(preRelNumb)) {
        preRelNumb++;

        break;
      }

      // Otherwise, make preRelNumb equal 1, for the second preRelNumb (the first has no number).
      preRelNumb = 1;

      break;

    default:
      exports.debug('pType is not valid', errMsg, 'error');

      return false;
  }

  // Join the split values of pVersion back together
  const newVersion = `${major}.${minor}.${patch}${preRelType || preRelNumb ? '-' : ''}` +
  `${preRelType ? `${preRelType}` : ''}${preRelType && preRelNumb ? '.' : ''}` +
  `${preRelNumb ? `${preRelNumb}` : ''}`;

  exports.debug(`Incremented ${pType} of version!`, `Version is now: v${newVersion}`, 'log');

  return newVersion;
};
