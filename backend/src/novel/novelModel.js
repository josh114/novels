import mongoose from 'mongoose';

const novelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const chapterSchema = new mongoose.Schema(
  {
    chapter: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    novel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Novel',
    },
<<<<<<< HEAD
=======
    slug: {
      type: String,
      required: true
    }
>>>>>>> 06436c678661729e7cad6b36f5afab7d746348e4
  },
  {
    timestamps: true,
  }
);

export const Novel = mongoose.model('Novel', novelSchema);
export const Chapter = mongoose.model('Chapter', chapterSchema);
