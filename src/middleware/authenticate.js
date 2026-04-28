import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

export function authenticate(req, res, next) {
  const err = new Error('Not Authenticated, Please provide a valid token or login to get a token');
  err.status = 401;
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(err);
  }
  //This code was recycled from a previous project in class.
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = {id: payload.id, role: payload.role};
    next();
  } catch (error) {
    return next(err);
  }
}