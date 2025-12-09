// api/contact.js
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        // read body
        let body = "";
        await new Promise((resolve, reject) => {
            req.on("data", (chunk) => (body += chunk.toString()));
            req.on("end", resolve);
            req.on("error", reject);
        });

        const params = new URLSearchParams(body);
        const name = params.get("name");
        const email = params.get("email");
        const subject = params.get("subject") || "New message from portfolio";
        const message = params.get("message");

        // send email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Portfolio" <${process.env.MAIL_USER}>`,
            to: process.env.MAIL_TO,
            subject,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        });

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error("Mail error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
