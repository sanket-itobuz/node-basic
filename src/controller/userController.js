// import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../model/user.js';

export default class UserOperations {
  saveUser = async (req, res, next) => {
    try {
      const username = req.body.username;
      const useremail = req.body.email;
      const userpassword = req.body.password;
      const userrole = req.body.role;

      const hashedPassword = await bcrypt.hash(userpassword, 20);
      const newUser = {
        username: username,
        email: useremail,
        password: hashedPassword,
        role: userrole,
      };
      const user = await User.create(newUser);
      console.log(user);
      res.status(201).json({ message: 'User Registered', success: true });
    } catch (err) {
      next(err);
    }
  };
}
