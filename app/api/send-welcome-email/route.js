import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing email or name" }),
        { status: 400 }
      );
    }

    console.log("Sending Email To:", email);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"College Finder" <${process.env.EMAIL_USER}>`,
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
    console.log("Email Sent:", info.response);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Email API Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
