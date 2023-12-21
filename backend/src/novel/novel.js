import { Novel, Chapter } from './novelModel.js';


export const createNovel = async (req, res) => {
  try {
    const body = {
      name: req.body.name,
      description: req.body.description || '',
      image: req.body.image
    };
    const novel = await Novel.create(body);
    res.status(201).json(novel);
  } catch (error) {
    res.status(400).json({ mesage: error?.message });
  }
};
export const getNovels = async (req, res) => {
  try {
    const novels = await Novel.find().populate('upload');
    res.status(200).json(novels);
  } catch (error) {
    res.status(404).json({ message: error?.message });
  }
};

export const getNovel = async (req, res) => {
  try {
    const { id } = req.params;
    const novel = await Novel.findById(id).populate(upload);
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
