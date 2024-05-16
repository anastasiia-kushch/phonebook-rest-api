import User from '../db/models/User.js';
import HttpError from '../helpers/HttpError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    const existedUser = await User.findOne({ email: req.body.email });
    if (existedUser) throw HttpError(409, 'Email in use');

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    await User.create({ email: req.body.email, password: passwordHash });

    res.status(201).json(req.body);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const existedUser = await User.findOne({ email: req.body.email });
    if (!existedUser) throw HttpError(401, 'Email or password is wrong');

    const isMatch = await bcrypt.compare(
      req.body.password,
      existedUser.password
    );

    if (!isMatch) throw HttpError(401, 'Email or password is wrong');

    console.log(existedUser._id);

    const token = jwt.sign({ id: existedUser._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    await User.findByIdAndUpdate(existedUser._id, { token });

    res.status(200).json({ token, user: req.body });
  } catch (error) {
    next(error);
  }
};
