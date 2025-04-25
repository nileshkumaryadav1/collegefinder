// app/api/contact-sponsor/route.js

import { sendSponsorDetailMail } from "@/lib/mailer";

export async function POST(req) {
  const { name, email, company, message } = await req.json();

  // Fetch API domain from environment variables
  const API_DOMAIN = process.env.NEXT_PUBLIC_BASE_URL;

  if (!API_DOMAIN) {
    console.error("API domain is not set in the environment variables.");
    return new Response(
      JSON.stringify({ success: false, error: "API domain not configured." }),
      { status: 500 }
    );
  }

  // Send sponsors detail email
  await sendSponsorDetailMail({
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
            <p>${message}</p>
          </td>
        </tr>
      </table>
    </div>
   `,
  });

  return new Response(
    JSON.stringify({ success: true, message: "POST request successful." }),
    { status: 200 }
  );
}

export async function GET(req) {
  return new Response(
    JSON.stringify({ success: true, message: "GET request successful." }),
    { status: 200 }
  );
}
