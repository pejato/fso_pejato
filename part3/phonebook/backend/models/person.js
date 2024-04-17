const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

// eslint-disable-next-line no-console
console.log('Connecting to Mongo DB...');
mongoose
  .connect(url)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

/* eslint-disable no-param-reassign, no-underscore-dangle */
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
/* eslint-enable */

module.exports = mongoose.model('Person', personSchema);
