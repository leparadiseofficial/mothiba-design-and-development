// MOTHIBA DESIGN AND DEVELOPMENT SERVICES
// Business WhatsApp contact number.
// Use country code without +, spaces, or punctuation. Example South Africa: 277XXXXXXXX.
const WHATSAPP_NUMBER = "27751090579";

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const select = document.getElementById("project-type");
    if (select) select.value = link.dataset.service;
  });
});

const form = document.getElementById("project-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.getElementById("form-status");
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const service = String(data.get("service") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !service || !message) {
      status.textContent = "Please complete all fields before continuing.";
      return;
    }

    const enquiry = [
      "Hello MOTHIBA DESIGN AND DEVELOPMENT SERVICES,",
      "",
      "I would like to enquire about a house or property project.",
      "Name: " + name,
      "Email: " + email,
      "Service: " + service,
      "Project details: " + message
    ].join("\n");

    if (/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
      const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(enquiry);
      window.open(url, "_blank", "noopener,noreferrer");
      status.textContent = "WhatsApp should open with your enquiry ready to send.";
    } else {
      const mailto = "mailto:mothibakagisho41@gmail.com?subject=" +
        encodeURIComponent("Project enquiry — " + service) +
        "&body=" + encodeURIComponent(enquiry);
      window.location.href = mailto;
      status.textContent = "Your email app should open with the enquiry prepared. If your email app does not open, email mothibakagisho41@gmail.com directly.";
    }
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
