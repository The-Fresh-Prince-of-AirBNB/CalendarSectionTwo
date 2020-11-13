var mongoose = require('mongoose');

var reservationSchema = mongoose.Schema({
  booked: [String],
  adults: Number,
  children: Number,
  infants: Number,
  totalCost: Number
});

var listingSchema = mongoose.Schema({
  id: Number,
  nightlyFee: Number,
  cleaningFee: Number,
  serviceFee: Number,
  taxes: Number,
  minNights: Number,
  rareFind: Boolean,
  reservations: [reservationSchema]
});

module.exports = mongoose.model('ListingModel', listingSchema);