// MOTHIBA DESIGN AND DEVELOPMENT SERVICES
// South African WhatsApp number in international format without + or spaces.
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

function chooseService(value) {
  const select = document.getElementById("project-type");
  if (select) {
    const matchingOption = Array.from(select.options).find((option) => option.value === value || option.textContent.trim() === value);
    if (matchingOption) select.value = matchingOption.value;
  }
  const quote = document.getElementById("quote");
  if (quote) quote.scrollIntoView({ behavior: "smooth", block: "start" });
  const status = document.getElementById("form-status");
  if (status) status.textContent = value ? "Selected: " + value + ". Complete the remaining fields to prepare your enquiry." : "";
}

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => chooseService(link.dataset.service));
});
document.querySelectorAll("[data-plan]").forEach((button) => {
  button.addEventListener("click", () => chooseService(button.dataset.plan));
});
document.querySelectorAll("[data-style]").forEach((button) => {
  button.addEventListener("click", () => chooseService(button.dataset.style));
});

const form = document.getElementById("project-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.getElementById("form-status");
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const fields = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      service: String(data.get("service") || "").trim(),
      location: String(data.get("location") || "").trim(),
      budget: String(data.get("budget") || "").trim(),
      message: String(data.get("message") || "").trim()
    };
    if (!fields.name || !fields.email || !fields.service || !fields.location || !fields.message) {
      status.textContent = "Please complete all required fields before continuing.";
      return;
    }
    const enquiry = [
      "Hello MOTHIBA DESIGN AND DEVELOPMENT SERVICES,",
      "",
      "I would like to discuss a house/property project and request a quotation.",
      "Name: " + fields.name,
      "Email: " + fields.email,
      "Phone: " + (fields.phone || "Not provided"),
      "Service / concept: " + fields.service,
      "Project area: " + fields.location,
      "Indicative budget: " + (fields.budget || "Prefer to discuss"),
      "Project details: " + fields.message,
      "",
      "Please let me know the next steps."
    ].join("\n");
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(enquiry);
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (opened) {
      status.textContent = "WhatsApp opened with your enquiry. Review the message and press Send in WhatsApp.";
    } else {
      status.textContent = "If WhatsApp did not open, use the WhatsApp contact below and copy your project details into a message.";
      window.location.href = url;
    }
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
