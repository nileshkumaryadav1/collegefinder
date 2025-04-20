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
      subject: "📩 New Sponsor Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f1f3f5; padding: 20px;">
          <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
            <tr>
              <td style="background-color: #0d6efd; color: white; padding: 20px 30px;">
                <h2 style="margin: 0; font-size: 22px;">🤝 Sponsor Form Submitted</h2>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 30px;">
                <p style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
                <p style="margin-bottom: 10px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0d6efd; text-decoration: none;">${email}</a></p>
                <p style="margin-bottom: 10px;"><strong>Company:</strong> ${company}</p>
                <p style="margin-bottom: 10px;"><strong>Message:</strong></p>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; font-size: 15px; line-height: 1.6;">
                  ${message}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 30px; font-size: 13px; color: #6c757d;">
                <p>This message was sent via the sponsor form on <a href="https://collegefinder.vercel.app" style="color: #0d6efd; text-decoration: none;">College Finder</a>.</p>
              </td>
            </tr>
          </table>
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
