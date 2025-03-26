import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing name or email" }),
        { status: 400 }
      );
    }

    console.log("Sending Email To:", email);

    // Validate Email Credentials
    if (!process.env.BREVO_EMAIL || !process.env.BREVO_PASSWORD) {
      console.error("Missing email credentials");
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email configuration error",
        }),
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"College Finder" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "🎉 Welcome to College Finder!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 500px; background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #007bff;">Welcome, ${name}! 🎉</h2>
            <p>Thank you for signing up for <strong>College Finder</strong>. We are excited to help you find the perfect college!</p>
            <a href="https://collegefinder.vercel.app/" style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">Explore Now</a>
            <p style="margin-top: 20px; color: #666;">If you have any questions, feel free to reply to this email.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent Successfully:", info.messageId);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Email API Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
