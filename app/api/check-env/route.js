export async function GET(req) {
    return Response.json({
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_USER: process.env.SMTP_USER ? "Loaded" : "Not Set",
      SMTP_PASS: process.env.SMTP_PASS ? "Loaded" : "Not Set",
    });
  }
  