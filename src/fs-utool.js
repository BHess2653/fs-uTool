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
  const output = seperator + title + JSON.stringify(obj) + '\n' + time + seperator;

    console.log(output);

};
