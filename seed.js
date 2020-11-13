const dummyData = require('./dummyData.js');
const model = require('./db/model/model.js');

const seedDatabase = () => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < dummyData.length; i++) {
    model.addListing(dummyData[i], i, (err) => {
      if (err) {
        throw err;
      } else {
        console.log('successfully seeded record');
      }
    });
  }
};

seedDatabase();
