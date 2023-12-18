import { logEvents } from '../../middleware/logger.js';
import User from './userModel.js';
import bcrypt from 'bcrypt';

const errRes = (err, res) => {
  logEvents(err?.message, 'errLog.log');
  res.status(400).json(err?.message);
};
export const createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      res.status(400).jsom({ message: 'email and password required' });
    }

    const hashedPwd = await bcrypt.hash(password, 6);
    const userObj = {
      email,
      password: hashedPwd,
      name,
    };
    const user = await User.create(userObj);
    if (user) {
      //created
      res.status(201).json({ message: `New user created` });
    } else {
      res.status(400).json({ message: 'Invalid user data received' });
    }
  } catch (error) {
    await logEvents(error.message, 'errlog.log');
    res.status(400).json(error?.message);
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const password = req.body.password;
    if (!id) return res.status(404).json({ message: 'invalid id params' });
    const user = await User.findById(id).exec();
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    const update = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (password) {
      const pwd = await bcrypt.hash(password, 10);
      await User.findByIdAndUpdate(id, { password: pwd }, { new: true });
    }
    res.status(200).json({ message: 'user details updated' });
  } catch (error) {
    res.status(400).json(error?.message);
  }
};
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'invalid id' });
    }
    const user = await User.findById(id).select('-password').exec();
    res.status(200).json(user);
  } catch (error) {
    errRes(error, res);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').lean().exec();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error?.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    // Confirm data
    if (!id) {
      return res.status(400).json({ message: 'User ID Required' });
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec();

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const result = await user.deleteOne();

    const reply = `User ${result.name} with ID ${result._id} deleted`;

    res.json(reply);
  } catch (error) {
    res.status(400).json(error?.message);
  }
};
