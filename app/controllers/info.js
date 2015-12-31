/**
 * Created by vadimdez on 31/12/15.
 */
var express = require('express');
var router = express.Router();
module.exports = (app) => {
  app.use('/api/info', router);
};

function getUserAgent(userAgent) {
  userAgent = /\([^\)]*/.exec(userAgent);
  return userAgent[0].substr(1);
}

router.get('/', (req, res) => {
  res.json({
    ipaddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress,
    language: req.headers['accept-language'].substr(0, 5).toLowerCase(),
    software: getUserAgent(req.headers['user-agent'])
  }).end();
});