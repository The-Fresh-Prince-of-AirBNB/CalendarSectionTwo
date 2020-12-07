// eslint-disable-next-line no-unused-vars
const db = require('../mongo/db.js');
const ListingModel = require('../mongo/schema.js');

const months = [undefined, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
    const start = find.in.split('/');
    const end = find.out.split('/');
    const dataStart = [Number.parseInt(start[2]), Number.parseInt(start[0]) - 1, Number.parseInt(start[1])]
    console.log(dataStart, months[start[0]]);
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
