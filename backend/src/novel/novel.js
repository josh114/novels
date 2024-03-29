import { Novel, Chapter } from './novelModel.js';
import mongoose from 'mongoose';

export const createNovel = async (req, res) => {
  try {
    // console.log(req.body);
    const slug = req.body.name.toLowerCase().split(' ').join('-');
    const body = {
      name: req.body.name,
      description: req.body.description || '',
      image: req.body.image,
      slug,
    };

    const novel = await Novel.create(body);
    res.status(201).json(novel);
  } catch (error) {
    res.status(400).json({ mesage: error?.message });
  }
};
export const getNovels = async (req, res) => {
  try {
    const novels = await Novel.find().populate('image');
    res.status(200).json(novels);
  } catch (error) {
    res.status(404).json({ message: error?.message });
  }
};

export const getNovel = async (req, res) => {
  try {
    let novel;
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      novel = await Novel.findById(id).populate('image').exec();
    } else {
      novel = await Novel.findOne({ slug: id }).populate('image').exec();
    }
    res.status(200).json(novel);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

export const updateNovel = async (req, res) => {
  try {
    const { id } = req.params;
    const novel = await Novel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(204).json(novel);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

export const deleteNovel = async (req, res) => {
  try {
    const { id } = req.params;
    await Novel.findByIdAndDelete(id);
    res.status(200);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};
