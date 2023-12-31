import Updates from './updatesModel.js';

/**
 * Gets the latest 100 updates from the database, sorted by descending ID.
 * Responds with the updates on success, or an error message on failure.
 */
export const getUpdates = async (req, res) => {
  try {
    const updates = await Updates.find().sort({ _id: -1 }).limit(100);
    res.status(200).json(updates);
  } catch (error) {
    res.status(404).json({ message: error?.message });
  }
};
