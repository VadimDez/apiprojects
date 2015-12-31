/**
 * Created by vadimdez on 31/12/15.
 */

var mongoose = require('mongoose');

var CounterSchema = new mongoose.Schema({
  _id: 'String',
  seq: {
    type: 'Number',
    defaultValue: 0
  }
});

mongoose.model('Counter', CounterSchema);