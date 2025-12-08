// public/js/contact.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const params = new URLSearchParams(formData);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                },
                body: params.toString(),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Message sent successfully!");
                this.reset();
            } else {
                console.error("Backend error:", data);
                alert("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.error("Network error:", err);
            alert("Network error. Please try later.");
        }
    });
});
