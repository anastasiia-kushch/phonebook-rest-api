import User from '../db/models/User.js';
import * as fs from 'node:fs/promises';
import path from 'node:path';

export const uploadAvatar = async (req, res, next) => {
  try {
    await fs.rename(
      req.file.path,
      path.resolve('public/avatars', req.file.filename)
    );

    const result = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: req.file.filename },
      { new: true }
    );

    res.status(200).json({ avatarURL: result.avatarURL });
  } catch (error) {
    next(error);
  }
};
