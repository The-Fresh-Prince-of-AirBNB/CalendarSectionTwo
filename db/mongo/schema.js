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
    dec: reservationSchema,
    jan: reservationSchema,
    feb: reservationSchema,
    mar: reservationSchema,
    apr: reservationSchema,
    may: reservationSchema,
    jun: reservationSchema,
    jul: reservationSchema,
  },
});

module.exports = mongoose.model('ListingModel', listingSchema);
