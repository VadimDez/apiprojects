/**
 * Created by vadimdez on 01/01/16.
 */
"use strict";
var express = require('express');
var router = express.Router();
var https = require('https');
var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Search = mongoose.model('Search');

module.exports = (app) => {
  app.use('/api/search', router);
};

var options = {
  host: 'api.datamarket.azure.com',
  port: 443,
  headers: {
    Authorization: 'Basic ' + new Buffer('PcjKWVK6djte3Mxs9sQj6Vch3lDE3OEtGRTkXPQGI84:PcjKWVK6djte3Mxs9sQj6Vch3lDE3OEtGRTkXPQGI84').toString('base64')
  }
};

/**
 * Get options for https request, append term
 * @param term
 * @param offset
 * @param limit
 * @returns {{host: string, port: number, headers: {Authorization: string}}}
 */
function getOptions(term, offset, limit) {
  options.path = `/Bing/Search/v1/Image?$format=json&Query=%27${encodeURI(term)}%27&$top=${limit || 20}&$skip=${offset || 0}`;
  return options;
}

/**
 * Transform result
 * @param json
 * @returns {Array|*}
 */
function transformResults(json) {
  return json.d.results.map(function (object) {
    return {
      media_url: object.MediaUrl,
      title: object.Title,
      source_url: object.SourceUrl
    };
  });
}

function saveSearchString(URL) {
  Search.createAsync({
    url: URL,
    created_at: Date.now()
  });
}

router.get('/:term', (req, res) => {
  let options = getOptions(req.params.term, req.query.offset, req.query.limit);

  saveSearchString(`${req.protocol}://${req.get('host')}${req.originalUrl}`);

  https.get(options, (resp) => {
    var data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      res.json(transformResults(JSON.parse(data))).end();
    });
  }).on('error', (err) => {
    res.status(400).end();
  });
});

router.get('/', (req, res) => {
  Search.findAsync({}, {
    _id: 0,
    url: 1,
    created_at: 1
  }, {
    limit: 20,
    sort: {
      created_at: -1
    }
  })
    .then(data => {
      res.json(data).end();
    })
    .catch(err => {
      console.error(err);
      res.status(400).end();
    });
});