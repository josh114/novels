import { Novel, Chapter } from './novelModel.js';
import multer from 'multer';
import { v4 } from 'uuid';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const uuid = v4();
    // console.log(file);
    let origin = file.originalname.split(`.${ext}`)[0];
    let name = origin.replace(/ /g, '_');
    cb(null, `${name}_${uuid}.${ext}`);
  },
});

const upload = multer({ storage: multerStorage });
export const uploads = upload.single('file');

export const createNovel = async (req, res) => {
  try {
    const body = {
      name: req.body.name,
      description: req.body.description || '',
    };
    const novel = await Novel.create(body);
    res.status(201).json(novel);
  } catch (error) {
    res.status(400).json({ mesage: error?.message });
  }
};
export const getNovels = async (req, res) => {
  try {
    const novels = await Novel.find();
    res.status(200).json(novels);
  } catch (error) {
    res.status(404).json({ message: error?.message });
  }
};

export const getNovel = async (req, res) => {
  try {
    const { id } = req.params;
    const novel = await Novel.findById(id);
    res.status(200).json(novel);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};
export const updateNovelImage = async (req, res) => {
  try {
    let file;
    const { id } = req.params;
    if (req.file) {
      file = req.file.filename;
    } else {
      res.status(400).json({ message: 'no file found' });
      return;
    }
    const body = {
      image: file,
    };
    const image = await Novel.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json(image);
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
