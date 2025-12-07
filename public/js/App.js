
/* ================= Typing Animation ====================== */
var typed = new Typed('.typing', {
    strings: ['Software Engineer','Web Developer', 'Front-End Developer', 'Full Stack Developer'],
    typeSpeed: 100,
    backSpeed: 80,
    loop: true,
});

const toggleButton = document.querySelector(".toggle");
const toggleIcon = toggleButton.querySelector("i");
const asideMenu = document.querySelector(".aside");
const navLinks = document.querySelectorAll(".nav-menu a"); // Select all links

// Toggle menu function
toggleButton.addEventListener("click", () => {
    asideMenu.classList.toggle("active");
    toggleButton.classList.toggle("active");

    // Change icon on toggle
    if (asideMenu.classList.contains("active")) {
        toggleIcon.classList.replace("fa-bars", "fa-times"); // Show 'X' icon
    } else {
        toggleIcon.classList.replace("fa-times", "fa-bars"); // Show '☰' icon
    }
});

// Close menu when clicking a navigation link
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        asideMenu.classList.remove("active");  // Close menu
        toggleButton.classList.remove("active"); // Reset button state
        toggleIcon.classList.replace("fa-times", "fa-bars"); // Switch back to ☰ icon
    });
});
// public/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stop page from reloading

            // 1. Get values using the IDs we just added
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value; // Added Subject
            const message = document.getElementById('message').value;
            const btn = contactForm.querySelector('button');

            // 2. Change button text to show loading
            const originalText = btn.innerText;
            btn.innerText = "Sending...";
            btn.disabled = true;

            try {
                // 3. Send data to your Node.js server
                const response = await fetch('http://localhost:3000/send-message', { // FORCE PORT 3000
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, subject, message })
                });

                if (response.ok) {
                    alert("Message Sent Successfully!");
                    contactForm.reset(); // Clear the inputs
                } else {
                    alert("Failed to send message.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error connecting to server.");
            } finally {
                // 4. Reset button text
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }
});

// Function to load projects from MongoDB
async function loadProjects() {
    const container = document.getElementById('portfolio-container');
    if (!container) return; // Stop if we are not on the portfolio page

    try {
        const response = await fetch('http://localhost:3000/api/projects');
        const projects = await response.json();

        // Clear "Loading..." text
        container.innerHTML = '';

        if (projects.length === 0) {
            container.innerHTML = '<p class="padd-15">No projects found in database.</p>';
            return;
        }

        // Loop through each project and create HTML
        projects.forEach(project => {
            const projectHTML = `
                <div class="portfolio-item padd-15" style="width: 33.33%; float: left; margin-bottom: 20px;">
                    <div class="portfolio-item-inner shadow-dark" style="border: 1px solid #ddd; padding: 15px; border-radius: 10px;">
                        <div class="portfolio-img">
                            <img src="${project.imageUrl || 'image/default.jpg'}" alt="${project.title}" style="width: 100%; border-radius: 5px;">
                        </div>
                        <div class="portfolio-info" style="margin-top: 15px;">
                            <h4 style="font-size: 18px; margin-bottom: 10px;">${project.title}</h4>
                            <p style="font-size: 14px; color: #666; margin-bottom: 10px;">${project.description}</p>
                            <a href="${project.projectLink}" target="_blank" class="btn" style="padding: 5px 15px; font-size: 12px;">View Project</a>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += projectHTML;
        });

    } catch (error) {
        console.error("Error loading projects:", error);
        container.innerHTML = '<p class="padd-15">Failed to load projects.</p>';
    }
}

// Run this when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    // ... your existing contact form code ...
});

// Project updation
// Function to load projects from MongoDB
async function loadProjects() {
    const container = document.getElementById('portfolio-container');
    if (!container) return; // Stop if we are not on the portfolio page

    try {
        const response = await fetch('http://localhost:3000/api/projects');
        const projects = await response.json();

        // Clear "Loading..." text
        container.innerHTML = '';

        if (projects.length === 0) {
            container.innerHTML = '<p class="padd-15">No projects found in database.</p>';
            return;
        }

        // Loop through each project and create HTML
        projects.forEach(project => {
            const projectHTML = `
                <div class="portfolio-item padd-15" style="width: 33.33%; float: left; margin-bottom: 20px;">
                    <div class="portfolio-item-inner shadow-dark" style="border: 1px solid #ddd; padding: 15px; border-radius: 10px;">
                        <div class="portfolio-img">
                            <img src="${project.imageUrl || 'image/default.jpg'}" alt="${project.title}" style="width: 100%; border-radius: 5px;">
                        </div>
                        <div class="portfolio-info" style="margin-top: 15px;">
                            <h4 style="font-size: 18px; margin-bottom: 10px;">${project.title}</h4>
                            <p style="font-size: 14px; color: #666; margin-bottom: 10px;">${project.description}</p>
                            <a href="${project.projectLink}" target="_blank" class="btn" style="padding: 5px 15px; font-size: 12px;">View Project</a>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += projectHTML;
        });

    } catch (error) {
        console.error("Error loading projects:", error);
        container.innerHTML = '<p class="padd-15">Failed to load projects.</p>';
    }
}

// Run this when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    // ... your existing contact form code ...
});