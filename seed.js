var dummyData = require('./dummyData.js');
var model = require('./db/model/model.js');

var seedDatabase = () => {
  for (let i = 0; i < dummyData.length; i++) {
    model.addListing(dummyData[i], i, err => {
      if (err) {
        throw err
      } else {
        console.log('successfully seeded record')
      }
    });
  }
}

seedDatabase()