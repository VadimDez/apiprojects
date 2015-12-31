/**
 * Created by vadimdez on 31/12/15.
 */
var mongoose = require('mongoose');
var LinkSchema = new mongoose.Schema({
  _id: 'Number',
  uri: 'String'
});

mongoose.model('Link', LinkSchema);