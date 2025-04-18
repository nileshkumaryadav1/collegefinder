import nodemailer from "nodemailer";

// Reusable transporter
const getTransporter = () => {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send OTP Email
export const sendOtpEmail = async (email, otp) => {
  try {
    const transporter = getTransporter();

    const mailOptions = {
      from: `"College Finder" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 16px;">
          <h2>🔐 Your One-Time Password</h2>
          <p>Use the following OTP to log in:</p>
          <div style="font-size: 24px; font-weight: bold; color: #007bff; margin: 12px 0;">${otp}</div>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ OTP email sent to:", email);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error.message);
    throw new Error("Failed to send OTP email");
  }
};

// Send Welcome Email
export const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = getTransporter();

    const mailOptions = {
      from: `"College Finder" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to College Finder!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 16px;">
          <h2>🎉 Welcome to College Finder!</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thanks for joining our platform. We're excited to help you explore the best colleges and opportunities.</p>
          <a href="https://collegefinder.vercel.app" style="display: inline-block; background-color: #007bff; color: white; padding: 10px 16px; text-decoration: none; border-radius: 4px; margin-top: 12px;">
            Visit College Finder
          </a>
          <p style="margin-top: 16px;">If you have any questions, feel free to reach out to us anytime.</p>
          <p style="margin-top: 12px;">Best wishes,<br/>The College Finder Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent to:", email);
  } catch (error) {
    console.error("❌ Error sending Welcome email:", error.message);
    throw new Error("Failed to send Welcome email");
  }
};
