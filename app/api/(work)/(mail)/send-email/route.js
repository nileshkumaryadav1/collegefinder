import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Parse the incoming request
    const { email, name } = await req.json();

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_APP_PASSWORD,
      },
    });

    // Prepare the email content
    const mailOptions = {
      from: `"College Finder" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "🎓 Welcome to College Finder!",
      html: generateWelcomeEmailHTML(name),
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Return success response
    return Response.json({ success: true, info });
  } catch (error) {
    // Error handling with detailed message
    console.error("Error sending email:", error);
    return Response.json(
      { success: false, error: "Failed to send welcome email. Please try again later." },
      { status: 500 }
    );
  }
}

// Helper function to generate the HTML content of the welcome email
function generateWelcomeEmailHTML(name) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
      <div style="background-color: #0d6efd; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0;">Welcome, ${name}!</h2>
      </div>

      <div style="padding: 20px; background-color: #ffffff; border-radius: 0 0 8px 8px;">
        <p>Thank you for registering on <strong>College Finder</strong> – your one-stop solution to discover top colleges, entrance exams, scholarships, and more.</p>

        <p>Start exploring now:</p>

        <ul style="padding-left: 20px; line-height: 1.7;">
          <li><a href="https://collegefinder.vercel.app/find-colleges/iits" style="color: #0d6efd;">Browse IITs</a></li>
          <li><a href="https://collegefinder.vercel.app/find-colleges/nits" style="color: #0d6efd;">Browse NITs</a></li>
          <li><a href="https://collegefinder.vercel.app/exams" style="color: #0d6efd;">Explore Entrance Exams</a></li>
        </ul>

        <p style="margin-top: 20px;">
          <a href="https://collegefinder.vercel.app" style="display: inline-block; background-color: #0d6efd; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Visit College Finder
          </a>
        </p>

        <p style="margin-top: 30px; font-size: 14px; color: #666;">
          Need help or have questions? Just reply to this email or contact our support team.
        </p>
      </div>
    </div>
  `;
}
