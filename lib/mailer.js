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
      from: `"Centre Auth" <${process.env.EMAIL_USER}>`,
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
      from: `"Centre Auth" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Centre!",
      html: `
        <div style="font-family:sans-serif; padding:10px;">
          <h2>🎉 Welcome to Centre!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for signing up and verifying your email. We're thrilled to have you with us!</p>
          <p>Feel free to explore and enjoy our service. If you have any questions, don’t hesitate to reach out.</p>
          <br />
          <p>Best regards,<br />Centre Team</p>
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
