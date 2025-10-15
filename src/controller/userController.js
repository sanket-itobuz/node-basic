// import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../model/user.js';
import OTP from '../model/otp.js';
import TokenGenerator from '../utility/tokenGenerator.js';

export default class UserOperations {
  saveUser = async (req, res, next) => {
    try {
      const { username, email, password, role, otp } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User already exists',
        });
      }

      let isVerified = false;

      if (otp) {
        const response = await OTP.find({ email })
          .sort({ createdAt: -1 })
          .limit(1);

        if (response.length === 0) {
          return res.status(400).json({
            success: false,
            message: 'The OTP is not valid',
          });
        }

        const latestOtp = response[0].otp;

        if (otp !== latestOtp) {
          return res.status(400).json({
            success: true,
            message: 'Invalid OTP',
          });
        }

        isVerified = true;
      }

      const newUser = await User.create({
        username,
        email,
        password,
        role,
        isVerified,
      });

      return res.status(201).json({
        success: true,
        message: isVerified
          ? 'User Registered and Verified'
          : 'User Registered verification pending',
        user: newUser,
      });
    } catch (err) {
      next(err);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const user = await User.findOne({ email });

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

      const tokenGenerator = new TokenGenerator();

      const accessToken = tokenGenerator.accessTokenGenerator(user._id);
      const refreshToken = tokenGenerator.refreshTokenGenerator(user._id);

      res.status(200).json({ success: true, accessToken, refreshToken, user });
    } catch (err) {
      next(err);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
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

  refreshToken = async (req, res, next) => {
    try {
      const userId = req.userId;

      const tokenGenerator = new TokenGenerator();

      const accessToken = tokenGenerator.accessTokenGenerator(userId);
      const refreshToken = tokenGenerator.refreshTokenGenerator(userId);

      res.status(200).json({ success: true, accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  };

  getUser = async (req, res, next) => {
    try {
      const userId = req.userId;

      const user = await User.findById(userId);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };
}
