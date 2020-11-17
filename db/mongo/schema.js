const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
  start: [Number],
  end: [Number],
});

const listingSchema = mongoose.Schema({
  id: Number,
  nightlyFee: Number,
  cleaningFee: Number,
  serviceFee: Number,
  taxes: Number,
  minNights: Number,
  rareFind: Boolean,
  reservations: {
    December: reservationSchema,
    January: reservationSchema,
    February: reservationSchema,
    March: reservationSchema,
    April: reservationSchema,
    May: reservationSchema,
    June: reservationSchema,
    July: reservationSchema,
  },
});

module.exports = mongoose.model('ListingModel', listingSchema);
