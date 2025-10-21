import User from '../model/user.js';
import OTP from '../model/otp.js';
import mailSender from '../utility/mailSender.js';

export default async function sendOTP(req, res, next) {
  try {
    const email = req.body.email;
    const purpose = req.body.purpose;

    const existingUser = await User.findOne({ email });

    if (existingUser && purpose) {
      res.status(400);
      throw new Error('User already exists');
    }

    if (!existingUser && !purpose) {
      res.status(400);
      throw new Error('Invalid Email');
    }

    let otp = Math.floor(Math.random() * 10000);
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
