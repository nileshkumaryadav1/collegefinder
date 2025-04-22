// app/api/contact-sponsor/route.js

export async function POST(req) {
  const { name, email, company, message } = await req.json();

  // console.log("Name:", name);
  // console.log("Email:", email);
  // console.log("Company:", company);
  // console.log("Message:", message);

  // Fetch API domain from environment variables
  const API_DOMAIN =
    process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await fetch(`${API_DOMAIN}/api/sponsor-detail-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        company,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Email Sending API failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Email Sent Successfully to:", data.info.accepted);
  } catch (error) {
    console.error("Failed to send email from API:", error.message);
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}

export async function GET(req) {
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
