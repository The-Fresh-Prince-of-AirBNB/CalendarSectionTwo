// eslint-disable-next-line no-unused-vars
const db = require('../mongo/db.js');
const ListingModel = require('../mongo/schema.js');

module.exports = {
  getOne: (id, callback) => {
    ListingModel.findOne({ id }, (err, results) => {
      if (err) {
        console.log('error retrieving data at that id');
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  makeReservation: (find, callback) => {
    console.log(find, callback);
  },

  addListing: (listing, i, callback) => {
    const post = new ListingModel({
      id: listing.id,
      nightlyFee: listing.nightlyFee,
      cleaningFee: listing.cleaningFee,
      serviceFee: listing.serviceFee,
      taxes: listing.taxes,
      minNights: listing.minNights,
      rareFind: listing.rareFind,
      reservations: listing.reservations,
    });
    post.save((err) => {
      if (err) {
        console.log('failed to add to database');
      } else {
        console.log(`added id ${i} to db`);
      }
    });
    callback(null);
  },
};
