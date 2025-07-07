// Replace with your actual Supabase credentials
const supabaseUrl = 'https://zvgjvhoeuqeshvdpcsqx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Z2p2aG9ldXFlc2h2ZHBjc3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3ODk4MDQsImV4cCI6MjA2NzM2NTgwNH0.qEPQb7wvPnF6qWzuQFZBQo0a1Q9sTRxX0pwboVwPSrM';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// 🔁 Check user authentication and toggle sections
async function checkAuthAndToggleForm() {
  const { data: { user } } = await supabase.auth.getUser();

  const loginSection = document.getElementById('auth-section');
  const appointmentSection = document.getElementById('appointment');
  const logoutContainer = document.getElementById('logout-container');

  if (user) {
    loginSection.style.display = 'none';
    appointmentSection.style.display = 'block';
    logoutContainer.style.display = 'block';
  } else {
    loginSection.style.display = 'block';
    appointmentSection.style.display = 'none';
    logoutContainer.style.display = 'none';
  }
}

// 🔐 Handle login
async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  console.log("🔐 Attempting login for:", email);

  const { error, data } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("❌ Login failed:", error.message);
    showToast("❌ Login failed: " + error.message, "error");
    return;
  }

  console.log("✅ Login successful:", data);
  showToast("✅ Login successful!");
  checkAuthAndToggleForm();
}


// 📝 Handle registration
async function handleRegister(event) {
  event.preventDefault();

  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  console.log("📝 Attempting registration for:", email);

  const { error, data } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error("❌ Registration failed:", error.message);
    showToast("❌ Registration failed: " + error.message, "error");
    return;
  }

  console.log("✅ Registration successful:", data);
  showToast("✅ Registration successful! 📩 Check your email.");;
}

// 🔓 Handle logout
async function handleLogout() {
  console.log("🔓 Logging out...");
  await supabase.auth.signOut();

  // Reset views
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('register-email').value = '';
  document.getElementById('register-password').value = '';

  checkAuthAndToggleForm();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  showToast("You have been logged out.");
}

// 🔄 Switch between login/register forms
function toggleToRegister() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'flex';
}

function toggleToLogin() {
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'flex';
}

// ⚙️ Event bindings on page load
document.addEventListener('DOMContentLoaded', () => {
  checkAuthAndToggleForm();

  // Login
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.onsubmit = handleLogin;
  }

  // Register
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.onsubmit = handleRegister;
  }

  // Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.onclick = handleLogout;
  }
});

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.textContent = message;

  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "8px";
  toast.style.color = "#fff";
  toast.style.minWidth = "200px";
  toast.style.maxWidth = "300px";
  toast.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.15)";
  toast.style.fontSize = "14px";
  toast.style.opacity = "0.95";
  toast.style.transition = "transform 0.3s ease, opacity 0.3s ease";
  toast.style.transform = "translateY(0)";
  toast.style.backgroundColor = type === "error" ? "#b33427" : "#2ecc71";

  const container = document.getElementById("toast-container");
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}