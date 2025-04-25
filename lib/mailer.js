import nodemailer from "nodemailer";

// Reusable transporter setup for sending emails
const getTransporter = () =>
  nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

// Send OTP Email
export const sendOtpEmail = async (email, otp) => {
  try {
    const transporter = getTransporter();

    const mailOptions = {
      from: `"College Finder" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 24px; max-width: 600px; margin: auto;">
          <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
            <div style="background-color: #0d6efd; color: white; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">Your One-Time Password</h2>
            </div>
            <div style="padding: 24px;">
              <p style="font-size: 16px; margin: 0 0 12px;">Hello,</p>
              <p style="font-size: 16px; margin: 0 0 16px;">Use the following OTP to log in to your College Finder account:</p>
              <div style="font-size: 28px; font-weight: bold; color: #0d6efd; margin: 20px 0; text-align: center;">${otp}</div>
              <p style="font-size: 14px; color: #6c757d;">⚠️ This OTP is valid for 5 minutes. Do not share it with anyone.</p>
            </div>
          </div>
          <div style="text-align: center; font-size: 13px; color: #6c757d; margin-top: 16px;">
            Sent by <a href="https://www.collegefinder.site" style="color: #0d6efd; text-decoration: none;">College Finder</a>
          </div>
        </div>
      `,
    };

    // Send the OTP email
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
      subject: "🎉 Welcome to College Finder!",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 24px; max-width: 600px; margin: auto;">
          <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
            <div style="background-color: #0d6efd; color: white; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">Welcome to College Finder!</h2>
            </div>
            <div style="padding: 24px;">
              <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
              <p style="font-size: 16px;">Thanks for joining us! We're excited to help you explore the best colleges and opportunities.</p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="https://www.collegefinder.site" style="background-color: #0d6efd; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-size: 16px;">Visit College Finder</a>
              </div>
              <p style="font-size: 14px; color: #6c757d;">If you have any questions, feel free to reach out to us anytime.</p>
              <p style="margin-top: 16px; font-size: 14px;">Best wishes,<br/>The College Finder Team</p>
            </div>
          </div>
          <div style="text-align: center; font-size: 13px; color: #6c757d; margin-top: 16px;">
            Sent by <a href="https://www.collegefinder.site" style="color: #0d6efd; text-decoration: none;">College Finder</a>
          </div>
        </div>
      `,
    };

    // Send the welcome email
    await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent to:", email);
  } catch (error) {
    console.error("❌ Error sending Welcome email:", error.message);
    throw new Error("Failed to send Welcome email");
  }
};

// Send Password Reset Email
export async function sendResetMail({ to, subject, html }) {
  const transporter = getTransporter();

  try {
    const mailOptions = {
      from: `"College Finder" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    // Send the reset email
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to:", to);
  } catch (error) {
    console.error("❌ Error sending reset email:", error.message);
    throw new Error("Failed to resend password email");
  }
}

// Send sponsors detail email
export async function sendSponsorDetailMail({ to, subject, html }) {
  const transporter = getTransporter();

  try {
    const mailOptions = {
      from: `"College Finder" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    // send sponsors detail email
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to:", to);
  } catch (error) {
    console.error("❌ Error sending sponsors detail email:", error.message);
    throw new Error("Failed to send sponsors detail email");
  }
}
