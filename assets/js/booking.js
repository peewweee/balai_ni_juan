// ✅ Handle Form Submission
async function sendCredentials(event) {
  event.preventDefault(); // Prevent default form submit
  console.log("🔄 Submitting appointment form...");

  const form = document.getElementById("appointment-form");
  const status = document.getElementById("form-status");

  // Collect form data
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();
  const date = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Log values for debugging
  console.log("📦 Input Values:", { name, email, subject, message, date });

  // Disable the button during submission
  const submitBtn = document.getElementById("submit-btn");
  submitBtn.disabled = true;

  try {
    const { data, error } = await supabase
      .from("appointments")
      .insert([{ name, email, subject, message, date }]);

    if (error) {
      console.error("❌ Supabase Insert Error:", error);
      status.textContent = "❌ Failed to send. Check console for details.";
    } else {
      console.log("✅ Appointment saved:", data);
      status.textContent = "✅ Appointment booked successfully!";
      form.reset();
    }
  } catch (err) {
    console.error("🚨 Unexpected Error:", err);
    status.textContent = "⚠️ Something went wrong. Check console.";
  }

  submitBtn.disabled = false;
}

// ✅ Add event listener after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("appointment-form");
  if (form) {
    form.addEventListener("submit", sendCredentials);
    console.log("📎 Form listener attached.");
  } else {
    console.error("❌ Form not found.");
  }
});
