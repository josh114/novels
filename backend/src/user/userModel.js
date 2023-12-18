import mongoose from 'mongoose';
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);
export default User;
