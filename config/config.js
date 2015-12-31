var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'apiprojects'
    },
    port: 9000,
    db: 'mongodb://localhost/apiprojects-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'apiprojects'
    },
    port: 3000,
    db: 'mongodb://localhost/apiprojects-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'apiprojects'
    },
    port: 80,
    db: process.env.MONGOLAB_URI || 'mongodb://localhost/apiprojects-production'
  }
};

module.exports = config[env];
