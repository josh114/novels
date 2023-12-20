import { Chapter } from './novelModel.js';

export const createChapter = async (req, res) => {
  try {
    const { chapter, novel, content } = req.body;
    if (!chapter || !content || !novel) {
      res.status(400).json({
        message: 'chapter number and content as wel as novel id is required',
      });
      return;
    }
    const slug = `${novel.slug}-chapter-${chapter}`;
    const body = {
      chapter,
      novel: novel.id,
      content,
      slug,
    };
    const chap = await Chapter.create(body);
    res.status(201).json(chap);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};
