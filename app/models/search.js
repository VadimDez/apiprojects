/**
 * Created by vadimdez on 01/01/16.
 */
"use strict";
var mongoose = require('mongoose');
var SearchSchema = new mongoose.Schema({
  url: 'String',
  created_at: 'Date'
});

mongoose.model('Search', SearchSchema);