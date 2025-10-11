interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailParams) {
  // Here you would integrate with your email service provider
  // For example: SendGrid, Amazon SES, etc.
  
  if (!process.env.EMAIL_API_KEY) {
    throw new Error("EMAIL_API_KEY is not configured");
  }

  // This is a placeholder implementation
  // Replace with your actual email service integration
  const response = await fetch("https://api.emailprovider.com/v1/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.EMAIL_API_KEY}`,
    },
    body: JSON.stringify({
      to,
      subject,
      html,
      from: process.env.EMAIL_FROM || "noreply@yourdomain.com",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }

  return response.json();
}