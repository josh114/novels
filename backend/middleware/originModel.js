import mongoose from 'mongoose';

const originSchema = new mongoose.Schema({
  ip: {
    type: String,
  },
  country: {
    type: String,
  },
  countryCode: {
    type: String,
  },
  regionName: {
    type: String,
  },
  city: {
    type: String,
  },
  timeZone: {
    type: String,
  },
  lat: {
    type: Number,
  },
  lon: {
    type: Number,
  },
  isp: {
    type: String,
  },
  path: {
    type: String,
  },
  method: {
    type: String
  }
}, {
  timestamps: true
});

const Origin = mongoose.model('Origin', originSchema);

export default Origin;
