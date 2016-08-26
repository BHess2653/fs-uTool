exports.debug = (title, obj, level = undefined) => {
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
    switch (level) {
      case 2:
        console.error(output);
        break;
      case 1:
        console.warn(output);
        break;
      default:
        console.log(output);
    }
  }
};
