/**
 * Created by vadimdez on 31/12/15.
 */
"use strict";

var express = require('express');
var router = express.Router();

module.exports = function (app) {
  app.use('/api/timestamp', router);
};

router.get('/', (req, res) => {
  res
    .json({
      unix: null,
      natural: null
    })
    .end();
});

router.get('/:date', (req, res) => {
  var response = {
    unix: null,
    natural: null
  };

  if (req.params.date) {
    try {
      if (!isNaN(req.params.date)) {
        req.params.date = parseInt(req.params.date);
      }
      let date = new Date(req.params.date);

      response.unix = date.getTime();
      response.natural = date.toLocaleTimeString("en-us", {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour12: false
      });
      // remove last 10 chars (, hh-mm-ss) including comma and space
      response.natural = response.natural.substr(0, response.natural.length - 10);
    } catch (e) {
      // do nothing
    }
  }

  res
    .json(response)
    .end();
});