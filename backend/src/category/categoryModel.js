import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

const subCategorySchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
});

export const Category = mongoose.model('Category', categorySchema);
export const SubCategory = mongoose.model('SubCategory', subCategorySchema);
