import 'dotenv/config'
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

export const auth = (req, res, next) =>{
    const token =
    req.body.token || req.query.token || req.headers.authorization;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    // decoded info from jwt is now added to request 
    //it is now available to all the routes
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  next();
}

export const isAdmin = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id });
  console.log(user);
  if (req.user.admin !== true) {
    return false;
  }
  return true;
}