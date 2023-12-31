import Updates from '../updates/updatesModel.js';
import { Chapter, Novel } from './novelModel.js';

export const createChapter = async (req, res) => {
  try {
    const { chapter, novel, content } = req.body;
    if (!chapter || !content || !novel) {
      res.status(400).json({
        message: 'chapter number and content as well as novel id is required',
      });
      return;
    }
    const nov = await Novel.findById(novel);
    if (!nov) {
      res.status(400).json({
        message: 'novel not found',
      });
      return;
    }
    let slug;
    if (!nov.slug) {
      slug = `${nov.name
        .toLowerCase()
        .split(' ')
        .join('-')}-chapter-${chapter}`;
    } else {
      slug = `${nov.slug}-chapter-${chapter}`;
    }
    const body = {
      chapter,
      novel: novel,
      content,
      slug,
    };
    const update = {
      slug,
      novel: nov.name,
      chapter: chapter
    };
    await Updates.create(update);
    const chap = await Chapter.create(body);
    res.status(201).json(chap);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

export const getChapters = async (req, res) => {
  try {
    const { novel } = req.params;
    const chaps = await Chapter.find({ novel }).populate('novel');
    res.status(200).json(chaps);
  } catch (error) {
    res.status(404).json({ message: error?.message });
  }
};

export const getChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const chap = await Chapter.findById(id).populate('novel');
    if (!chap) {
      res.status(404).json({ message: 'chapter not found' });
      return;
    } else {
      res.status(200).json(chap);
    }
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

export const updateChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const exist = await Chapter.findById(id);
    if (!exist) {
      res.status(404).json({ message: 'chapter not found' });
      return;
    }
    const chap = await Chapter.findByIdAndUpdate(id, req.body, { new: true });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

export const deleteChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const exist = await Chapter.findById(id);
    if (!exist) {
      res.status(404).json({ message: 'chapter not found' });
      return;
    }
    await Chapter.findByIdAndDelete(id);
    res.status(200);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};
