import User from '../user/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    if (!email || !password) {
      // console.log('incorrect email and password');
      return res.status(400).json({ message: 'email and password required' });
    }

    const foundUser = await User.findOne({ email }).exec();
    // console.log(foundUser);
    if (!foundUser) {
      // console.log('not foundUser');
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    // console.log(match);
    if (!match) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // console.log(foundUser);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '7d' }
    );
    const user = {
      _id: foundUser._id,
      email: foundUser.email,
      name: foundUser.name,
      createdAt: foundUser.createdAt,
      updatedAt: foundUser.updatedAt,
    };
    // Send accessToken containing username and roles
    res.json({ accessToken, user });
  } catch (err) {
    res.status(400).json({ message: err?.message });
  }
};
