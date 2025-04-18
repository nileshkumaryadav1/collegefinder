import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, name } = await req.json();

    // ✅ Set up transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_APP_PASSWORD,
      },
    });

    // ✅ Email options
    const mailOptions = {
      from: `"College Finder" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Welcome to College Finder!",
      html: `
        <h2>Welcome, ${name}!</h2>
        <p>Thank you for registering on <strong>College Finder</strong>.</p>
        <p>Explore the best colleges and opportunities now!</p>
        <a href="https://collegefinder.vercel.app" style="background-color:#007bff;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;">
          Visit College Finder
        </a>
      `,
    };

    // ✅ Send the email
    const info = await transporter.sendMail(mailOptions);

    return Response.json({ success: true, info });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
