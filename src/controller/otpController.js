import User from '../model/User.js';
import OTP from '../model/Otp.js';
import mailSender from '../utility/mailSender.js';

export default async function sendOtp(req, res, next) {
  try {
    const email = req.body.email;
    const purpose = req.body.purpose;

    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.isVerified && purpose) {
      res.status(400);
      throw new Error('User already exists');
    }

    if (!existingUser && !purpose) {
      res.status(400);
      throw new Error('Invalid Email');
    }

    let otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp);

    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);

    const mailResponse = await mailSender(
      email,
      'Verification Email',
      `<h3>Please confirm your OTP</h3>
       <p>Here is your OTP: ${otp}</p>`
    );

    console.log(mailResponse);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otpBody,
    });

    next();
  } catch (err) {
    next(err);
  }
}
