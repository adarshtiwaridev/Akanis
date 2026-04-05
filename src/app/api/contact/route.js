import { NextResponse } from "next/server";
import { sendMail } from "../../../lib/email";
import dbConnect from "../../../lib/dbConnect";
import Contact from "../../../models/Contact";
import { contactRateLimit } from "../../../lib/rateLimit";
import { z } from "zod";
import jwt from "jsonwebtoken";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.enum([
    "ad-shoot",
    "photo-shoot",
    "videography",
    "video-production",
    "branding",
    "social-media",
    "marketing",
    "website-design",
    "web-dev",
    "app-dev",
    "ui-ux",
    "custom-software",
  ]),
  budget: z.string().optional(),
  location: z.string().optional(),
  message: z.string().min(10).max(2000),
});

// Helper function to escape HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Auth middleware for GET
function authenticate(req) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export async function GET(req) {
  const user = authenticate(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error("GET /api/contact error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  // Apply rate limiting
  await new Promise((resolve, reject) => {
    contactRateLimit(req, {}, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  try {
    const body = await req.json();

    // Validate input
    const validatedData = contactSchema.parse(body);

    const {
      name,
      email,
      phone,
      service,
      budget,
      location,
      message,
    } = validatedData;

    await dbConnect();

    const contact = await Contact.create({
      name,
      email,
      phone,
      service,
      budget,
      location,
      message,
    });

    /* ===============================
       OWNER EMAIL
    =============================== */
    await sendMail({
      to: process.env.SMTP_USER || process.env.MAIL_USER,
      subject: `📩 New Inquiry – ${service}`,
      html: `
        <h3>New Contact Submission</h3>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Phone:</b> ${escapeHtml(phone || "-")}</p>
        <p><b>Service:</b> ${escapeHtml(service)}</p>
        <p><b>Budget:</b> ${escapeHtml(budget || "-")}</p>
        <p><b>Location:</b> ${escapeHtml(location || "-")}</p>
        <p><b>Message:</b></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

  
    await sendMail({
  to: email,
  subject: "We've received your inquiry – voritemedia",
  html: `
  <div style="margin:0;padding:0;background-color:#f4f6f8;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 16px;">
          
          <!-- Main Container -->
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">
            
            <!-- Header -->
            <tr>
              <td style="background:#0f172a;padding:20px 24px;">
                <h2 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">
                  voritemedia
                </h2>
                <p style="margin:4px 0 0;color:#cbd5e1;font-size:13px;">
                  Creative • Digital • Development
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px 24px;color:#111827;">
                <p style="margin:0 0 12px;font-size:15px;">
                  Hi <b>${escapeHtml(name)}</b>,
                </p>

                <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#374151;">
                  Thank you for reaching out to <b>voritemedia</b>.
                  We've successfully received your inquiry regarding
                  <b>${escapeHtml(service)}</b>.
                </p>

                <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#374151;">
                  Our team is currently reviewing your request and will get
                  back to you shortly with the next steps.
                </p>

                <!-- Info Box -->
                <div style="background:#f8fafc;border-left:4px solid #0f172a;padding:12px 14px;margin:20px 0;">
                  <p style="margin:0;font-size:13px;color:#374151;">
                    <b>Service:</b> ${escapeHtml(service)}<br/>
                    ${budget ? `<b>Budget:</b> ${escapeHtml(budget)}<br/>` : ``}
                    ${location ? `<b>Location:</b> ${escapeHtml(location)}` : ``}
                  </p>
                </div>

                <p style="margin:0;font-size:14px;color:#374151;">
                  If you have any additional details to share, feel free to
                  While we connect you .
                </p>

                <p style="margin:24px 0 0;font-size:14px;">
                  Best regards,<br/>
                  <b>Team voritemedia</b>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f1f5f9;padding:14px 24px;text-align:center;">
                <p style="margin:0;font-size:12px;color:#6b7280;">
                  © ${new Date().getFullYear()} voritemedia. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
  `,
});

    return NextResponse.json(
      {
        message: "Contact submitted successfully",
        id: contact._id,
      },
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.errors },
        { status: 400 }
      );
    }
    console.error("Contact API error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
