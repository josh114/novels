import mongoose from 'mongoose';

const updatesSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
    },
    novel: {
      type: String,
    },
    chapter: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Updates = mongoose.model('Updates', updatesSchema);
export default Updates;
