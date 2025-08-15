import { generateToken } from "../utils/libs.js";
import { sendEmail } from "../utils/email.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/user.model.js";

import bcrypt from "bcryptjs";
import crypto from "crypto";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: "fail",
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        status: "signup success",
        data: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic,
        },
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Invalid user data",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id, res);

    res.status(200).json({
      status: "success",
      data: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic, fullName } = req.body;
    const userId = req.user._id;

    const updateFields = {};

    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      updateFields.profilePic = uploadResponse.secure_url;
    }

    updateFields.fullName = fullName;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "Nothing to update",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "user not found",
    });
  }

  // Generate a password reset token
  const resetToken = user.generateResetToken();
  await user.save({ validateBeforeSave: false });
  const message = `Your password reset token is: ${resetToken}.\nIf you didn't forget your password, please ignore this email!`;

  const htmlMessage = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Password Reset Request</h2>
      <p>Hello,</p>
      <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
      <p>Your password reset token is:</p>
      <p style="word-break: break-all; color: #666; font-weight: bold;">${resetToken}</p>
      <p>This token will expire in 10 minutes.</p>
      <p>If you didn't request this password reset, please ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">This is an automated message, please do not reply to this email.</p>
    </div>
  `;
  // Send the reset token to the user's email
  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset token is valid for 10 minutes",
      message,
      text: `Your password reset token is: ${resetToken}`,
      html: htmlMessage,
    });

    res.status(200).json({
      status: "success",
      message: "Password reset token sent to email",
    });
  } catch (error) {
    console.log("Error sending password reset email", error.message);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide both token and new password",
      });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Token is invalid or has expired",
      });
    }

    // Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    const jwtToken = generateToken(user._id, res);

    res.status(200).json({
      status: "success",
      token: jwtToken,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: req.user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
