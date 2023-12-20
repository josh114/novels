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
    slug: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Novel = mongoose.model('Novel', novelSchema);
export const Chapter = mongoose.model('Chapter', chapterSchema);
