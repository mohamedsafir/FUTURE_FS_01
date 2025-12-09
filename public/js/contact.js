// public/js/contact.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const params = new URLSearchParams(formData);

        const btn = this.querySelector("button[type='submit']");
        if (btn) btn.textContent = "Sending...";

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                },
                body: params.toString(),
            });

            const data = await res.json().catch(() => ({}));
            console.log("API status:", res.status, data);

            if (res.ok) {
                alert("Message sent successfully!");
                this.reset();
            } else {
                alert(
                    data.message
                        ? `Server error: ${data.message}`
                        : "Server returned an error. Check logs."
                );
            }
        } catch (err) {
            console.error("Network error:", err);
            alert("Error connecting to server."); // only real network failure now
        } finally {
            if (btn) btn.textContent = "Send Message";
        }
    });
});
