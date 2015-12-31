/**
 * Created by vadimdez on 31/12/15.
 */
var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Counter = mongoose.model('Counter');

console.log('Strtings seeding');
Counter.findAsync({_id: 'linkId'})
  .then(counters => {
    if (counters.length) {
      console.log('Counter is already set.');
      return;
    }

    Counter.createAsync({
      _id: 'linkId',
      seq: 0
    }).then(() => {
      console.log('Created counter.');
    });

  });

