import bcrypt from 'bcrypt';
import User from '../model/User.js';
import OTP from '../model/Otp.js';
import TokenGenerator from '../utility/TokenGenerator.js';

export default class AuthController {
  saveUser = async (req, res, next) => {
    try {
      const { username, email, password, role, otp } = req.body;

      console.log(otp);

      if (!otp) {
        const newUser = await User.create({
          username,
          email,
          password,
          role,
          isVerified: false,
        });

        return res.status(201).json({
          success: true,
          message: 'User Registered but not verified',
          user: newUser,
        });
      } else {
        const existingUser = await User.findOne({ email });

        if (existingUser && existingUser.isVerified) {
          res.status(404);
          throw new Error('User already exists');
        } else if (existingUser && !existingUser.isVerified) {
          const response = await OTP.find({ email })
            .sort({ createdAt: -1 })
            .limit(1);

          if (response.length === 0) {
            res.status(400);
            throw new Error('The OTP is not valid');
          }

          const latestOtp = response[0].otp;

          if (otp !== latestOtp) {
            res.status(400);
            throw new Error('Invalid OTP');
          }

          const update = { isVerified: true };

          const updatedUser = await User.findOneAndUpdate({ email }, update, {
            new: true,
          });

          console.log(updatedUser);

          return res.status(201).json({
            success: true,
            message: 'User Successfully Registered',
          });
        }
      }
    } catch (err) {
      next(err);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      console.log(email + '   ' + password);

      const user = await User.findOne({ email });

      if (!user) {
        res.status(401);
        console.log('Invalid User');
        throw new Error(`User doesn't Exists`);
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.status(401);
        throw new Error('Invalid Password');
      }

      const tokenGenerator = new TokenGenerator();

      const accessToken = tokenGenerator.accessTokenGenerator(user._id);
      const refreshToken = tokenGenerator.refreshTokenGenerator(user._id);

      res.status(200).json({
        message: 'Login Successful',
        success: true,
        accessToken,
        refreshToken,
        user,
      });
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
        res.status(400);
        throw new Error('The OTP is not valid');
      }

      const filter = { email };

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

      res.status(200).json({
        message: 'New Token Generated',
        success: true,
        accessToken,
        refreshToken,
      });
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
      res.status(401);
      next(err);
    }
  };
}
