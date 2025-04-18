import nodemailer from "nodemailer";

// Send OTP Email
export const sendOtpEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"College Finder" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family:sans-serif; padding:10px;">
          <h2>🔐 Your Login OTP</h2>
          <p>Your One-Time Password is:</p>
          <h1>${otp}</h1>
          <p>This code is valid for 5 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ OTP email sent successfully");
  } catch (error) {
    console.error("❌ Failed to send OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

// Send Welcome Email
export const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"College Finder" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to College finder!",
      html: `
        <div style="font-family:sans-serif; padding:10px;">
          <h2>🎉 Welcome to College finder!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for signing up and verifying your email. We're thrilled to have you with us!</p>
          <a href="https://collegefinder.vercel.app" style="background-color:#007bff;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;">Visit College Finder</a>
          <p>Feel free to explore and enjoy our service. If you have any questions, do not hesitate to reach out.</p>
          <br />
          <p>Best regards,<br />College Finder Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent successfully");
  } catch (error) {
    console.error("❌ Failed to send Welcome email:", error);
    throw new Error("Failed to send Welcome email");
  }
};
