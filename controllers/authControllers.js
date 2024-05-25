import User from '../db/models/User.js';
import HttpError from '../helpers/HttpError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import { sendEmail } from '../helpers/sendEmail.js';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';

const { BASE_URL } = process.env;

export const register = async (req, res, next) => {
  try {
    const existedUser = await User.findOne({ email: req.body.email });
    if (existedUser) throw HttpError(409, 'Email in use');

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const avatar = gravatar.url(req.body.email);

    const verificationToken = uuidv4();

    const newUser = await User.create({
      email: req.body.email,
      password: passwordHash,
      avatarURL: avatar,
      verificationToken,
    });

    const verifyEmail = {
      to: req.body.email,
      subject: 'Verify your email',
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}"> Click here to verify email</a>`,
      text: `Click here to verify email http://localhost:8558/api/users/verify/${verificationToken}`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
      email: req.body.email,
      subscription: newUser.subscription,
      avatarURL: avatar,
      message: 'User registered successfully!',
    });
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

    if (!existedUser.verify) {
      throw HttpError(
        401,
        'User not verified. Please check your email to verify your account.'
      );
    }

    const token = jwt.sign({ id: existedUser._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    const result = await User.findOneAndUpdate(
      { _id: existedUser._id },
      { token }
    );

    const { email, subscription } = result;
    res.status(200).json({ token, email, subscription });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await User.findOneAndUpdate({ _id: req.user.id }, { token: null });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const currentUser = async (req, res, next) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.query;
    const { id } = req.user;

    const result = await User.findOneAndUpdate(
      { _id: id },
      { subscription },
      {
        new: true,
      }
    );
    if (!result) throw HttpError(404, 'User not found');
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const existedUser = await User.findOne({
      verificationToken,
    });

    if (!existedUser) throw HttpError(404, 'User not found');

    await User.findOneAndUpdate(
      { _id: existedUser._id },
      { verify: true, verificationToken: null }
    );

    res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    next(error);
  }
};

export const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (user.verify)
      throw HttpError(400, 'Verification has already been passed');

    console.log(user);
    const verifyEmail = {
      to: email,
      subject: 'Verify your email',
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}"> Click here to verify email</a>`,
      text: `Click here to verify email http://localhost:8558/api/users/verify/${user.verificationToken}`,
    };

    await sendEmail(verifyEmail);

    res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    next(error);
  }
};
