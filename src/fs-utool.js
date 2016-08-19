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
