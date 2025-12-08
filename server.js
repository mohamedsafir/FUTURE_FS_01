require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

// --- 1. CONFIGURATION ---
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// --- 2. DATABASE CONNECTION ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// --- 3. DATABASE SCHEMA ---
const ContactSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  subject: String,
  message: String,
  date: { type: Date, default: Date.now },
});
const Contact = mongoose.model("Contact", ContactSchema);

// Project Schema (For Project Updates)
const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    imageUrl: String, // URL to the image
    projectLink: String, // URL to GitHub or Live Demo
    category: String   // e.g., "Web Design", "App Development"
});
const Project = mongoose.model('Project', ProjectSchema);

// --- 4. EMAIL SETUP (The System) ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- 5. THE ROUTE (Logic) ---
app.post("/send-message", async (req, res) => {
  // Get the different sender details from the form
  const { name, email, subject, message } = req.body;

  try {
    // A. Save to Database (Record Keeping)
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    // B. Send Email (Notification)
    const mailOptions = {
      // SENDER: Must be the System Email (Gmail rule)
      from: `"Portfolio Bot" <${process.env.EMAIL_USER}>`,

      // RECEIVER: Defaults to You (The Owner)
      to: process.env.EMAIL_USER,

      // REPLY-TO: The Visitor's Email (This makes "Reply" work correctly)
      replyTo: email,

      subject: `📢 New Portfolio Message: ${subject}`,
      html: `
                <h3>You received a new message!</h3>
                <p><strong>From:</strong> ${name} (${email})</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email Notification Sent");

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ success: false, message: "Server error occurred" });
  }
});

// B. GET Projects Route (Frontend calls this to display projects)
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find(); // Fetch all projects from DB
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects" });
    }
});

// C. POST Project Route (You use this to ADD projects to DB)
app.post('/api/add-project', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(200).json({ message: "Project Added Successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error adding project" });
    }
});

// --- 6. START SERVER ---
app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});
