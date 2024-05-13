import User from '../db/models/User.js';
import { loginUserSchema, registerUserSchema } from '../schemas/usersSchema.js';
import HttpError from '../helpers/HttpError.js';
import bcrypt from 'bcrypt';

export const register = async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };

    const { error } = registerUserSchema.validate(user);

    if (error) {
      throw HttpError(400, error.message);
    }

    const existedUser = await User.findOne({ email: user.email });

    if (existedUser !== null) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const passwordHash = await bcrypt.hash(user.password, 10);

    await User.create({ email: user.email, password: passwordHash });

    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };

    const { error } = loginUserSchema.validate(user);

    if (error) {
      throw HttpError(400, error.message);
    }

    const existedUser = await User.findOne({ email: user.email });

    if (existedUser === null) {
      throw HttpError(401, 'Email or password is wrong');
    }

    const isMatch = await bcrypt.compare(user.password, existedUser.password);

    if (!isMatch) {
      throw HttpError(401, 'Email or password is wrong');
    }


    //здесь нужен ТОКЕН перед объектом юзера
    res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};
