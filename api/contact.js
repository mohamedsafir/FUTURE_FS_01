// api/contact.js
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
    // Only allow POST
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        // ---- Read body (works with normal HTML forms) ----
        let body = "";
        await new Promise((resolve, reject) => {
            req.on("data", (chunk) => (body += chunk.toString()));
            req.on("end", resolve);
            req.on("error", reject);
        });

        const contentType = req.headers["content-type"] || "";
        let data;

        if (contentType.includes("application/json")) {
            data = JSON.parse(body || "{}");
        } else {
            const params = new URLSearchParams(body);
            data = Object.fromEntries(params);
        }

        const { name, email, subject, message } = data;

        // ---- Nodemailer transport ----
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
            to: process.env.MAIL_TO,
            subject: subject || `New message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        return res.status(200).json({ success: true, message: "Mail sent" });
    } catch (err) {
        console.error("Mail error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
