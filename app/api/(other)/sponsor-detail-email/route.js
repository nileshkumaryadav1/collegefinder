import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, company, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"College Finder" <${process.env.SENDER_EMAIL}>`,
      to: "kumarnileshayan@gmail.com",
      subject: "Form submitted by a sponsor",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
          <div style="background-color: #0d6efd; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Sponsor Name: ${name}!</h2>
          </div>

          <div style="padding: 20px; background-color: #ffffff; border-radius: 0 0 8px 8px;">
            <p>Email: ${email}</p>
            <p>Company: ${company}</p>
            <p>Message: ${message}</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    return Response.json({ success: true, info });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
