import User from '../db/models/User.js';
import { registerUserSchema } from '../schemas/usersSchema.js';
import bcrypt from 'bcrypt';

export const register = async (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { error } = registerUserSchema.validate(user);

  if (typeof error !== 'undefined') {
    return res.status(400).json({ message: error.message });
  }

  try {
    const existedUser = await User.findOne({ email: user.email });

    if (existedUser !== null) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const passwordHash = await bcrypt.hash(user.password, 10);

    await User.create({ email: user.email, password: passwordHash });
    return res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};
