const mongoose = require('mongoose')
const config = require('../config/model.js');
config.increment.initialize(config.db);

const userSchema = new config.mongoose.Schema({
  name: String,
  mobile: {
    type: String,
    unique: true
  },
  email: String,
  address: {
    street: String,
    locality: String,
    city: String,
    state: String,
    pincode: String,
    location: {
      type: {type: String},
      coordinates: [Number]
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.plugin(config.paginate);
userSchema.index({"address.location.coordinates":"2dsphere"});
module.exports = config.mongoose.model('users',userSchema)