// import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../model/user.js';
import OTP from '../model/otp.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class UserOperations {
  secretKey = process.env.JWT_SECRET_KEY;
  refreshToken = process.env.JWT_REFRESH_TOKEN;

  saveUser = async (req, res, next) => {
    try {
      const { username, email, password, role, otp, isVerified } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser || isVerified) {
        return res.status(400).json({
          success: false,
          message: 'User already exists',
        });
      }

      // Find the most recent OTP for the email
      const response = await OTP.find({ email })
        .sort({ createdAt: -1 })
        .limit(1);

      if (response.length === 0 || otp !== response[0].otp) {
        return res.status(400).json({
          success: false,
          message: 'The OTP is not valid',
        });
      }

      const newUser = await User.create({
        username,
        email,
        password,
        role,
        isVerified: true,
      });

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: newUser,
      });
    } catch (err) {
      next(err);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const user = await User.findOne({ username });

      if (!user) {
        return res
          .status(401)
          .json({ message: 'Authentication failed', success: false });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: 'Authentication failed', success: false });
      }

      const token = jwt.sign({ userId: user._id }, this.secretKey, {
        expiresIn: process.env.JWT_TOKEN_EXPIRY,
      });
      res.status(200).json({ success: true, token: token, user: user });
    } catch (err) {
      next(err);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      console.log('reset-password');
      const otp = req.body.otp;
      const email = req.body.email;

      // Find the most recent OTP for the email
      const response = await OTP.find({ email })
        .sort({ createdAt: -1 })
        .limit(1);

      if (response.length === 0 || otp !== response[0].otp) {
        return res.status(400).json({
          success: false,
          message: 'The OTP is not valid',
        });
      }

      const filter = { email: email };

      const updatedUser = await User.findOneAndUpdate(filter, req.body, {
        new: true,
      });

      console.log(updatedUser);
      res.status(201).json({
        message: 'Password successfully updated',
        success: true,
        updatedUser,
      });
    } catch (err) {
      next(err);
    }
  };
}
