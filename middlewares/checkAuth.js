import jwt from 'jsonwebtoken';
import User from '../db/models/User.js';
import HttpError from '../helpers/HttpError.js';

export const checkAuth = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) throw HttpError(401, 'Not authorized');

  const [bearer, token] = authorizationHeader.split(' ', 2);

  if (bearer !== 'Bearer') throw HttpError(401, 'Not authorized');

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) throw HttpError(401, err.message);
    try {
      const user = await User.findById(decode.id);
      if (!user || user.token !== token) throw HttpError(401, 'Not authorized');

      req.user = {
        id: decode.id,
        email: user.email,
        subscription: user.subscription,
      };

      next();
    } catch (error) {
      next(error);
    }
  });
};
