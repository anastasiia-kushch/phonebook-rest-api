import jwt from 'jsonwebtoken';
import User from '../db/models/User.js';
import HttpError from '../helpers/HttpError.js';

export const checkAuth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) throw HttpError(401, 'Not authorized');

  const [bearer, token] = authorizationHeader.split(' ', 2);

  if (bearer !== 'Bearer') throw HttpError(401, 'Not authorized');

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) throw HttpError(401, err.message);

    console.log({decode});

//     req.user = {
//         id
//     }

  });

  next();
};
