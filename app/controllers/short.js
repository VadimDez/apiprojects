/**
 * Created by vadimdez on 31/12/15.
 */
"use strict";

var express = require('express');
var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Counter = mongoose.model('Counter');
var Link = mongoose.model('Link');
var router = express.Router();
var validUrl = require('valid-url');

function getNextSequence() {
  return new Promise((resolve, reject) => {
    Counter.findOneAndUpdate({_id: 'linkId'}, { $inc: { seq: 1 } }, (err, result) => {

      if (err) {
        reject(err);
        return;
      }

      resolve(result.seq);
    });
  });
}

module.exports = (app) => {
  app.use('/', router);
};

router.get('/short/:id', (req, res) => {
  Link.findOneAsync({_id: req.params.id})
    .then(link => {
      if (!link) {
        res.end();
        return
      }

      res.writeHead(301, {Location: link.uri});
      res.end();
    })
    .catch(handleError(res));
});

function handleError(res) {
  return (err) => {
    console.log(err);

    if (err) {
      res.status(400).end();
    }
  }
}

router.get('/api/short/:link*', (req, res) => {
  let uri = req.params.link + req.params['0'];

  if (!validUrl.isUri(uri)) {
    res
      .status(400)
      .json({
        errors: [
          {
            status: 400,
            title: 'Not valid uri'
          }
        ]
      })
      .end();
    return;
  }

  getNextSequence()
    .then(counter => {
      Link.createAsync({
        _id: counter,
        uri: uri
      }).then(link => {
        res.json({
          original_link: uri,
          short_link: `${process.env.DOMAIN}/short/${link._id}`
        }).end();
      });
    })
    .catch(handleError(res));
});