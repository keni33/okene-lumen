// ── HELPERS ──

// Get all registered users
function getUsers() {
  const stored = localStorage.getItem("okeneLumenUsers");
  return stored ? JSON.parse(stored) : [];
}

// Save users
function saveUsers(users) {
  localStorage.setItem("okeneLumenUsers", JSON.stringify(users));
}

// Get logged in user
function getLoggedInUser() {
  const stored = localStorage.getItem("okeneLumenCurrentUser");
  return stored ? JSON.parse(stored) : null;
}

// Save logged in user
function saveLoggedInUser(user) {
  localStorage.setItem("okeneLumenCurrentUser", JSON.stringify(user));
}

// ── TOGGLE PASSWORD VISIBILITY ──
document.querySelectorAll(".toggle-password").forEach(function(btn) {
  btn.addEventListener("click", function() {
    const targetId = btn.getAttribute("data-target");
    const input = document.getElementById(targetId);
    if (input.type === "password") {
      input.type = "text";
      btn.textContent = "🙈";
    } else {
      input.type = "password";
      btn.textContent = "👁";
    }
  });
});

// ── SIGNUP LOGIC ──
const signupBtn = document.getElementById("signup-btn");
if (signupBtn) {
  signupBtn.addEventListener("click", function() {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const phone = document.getElementById("signup-phone").value.trim();
    const address = document.getElementById("signup-address").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirm = document.getElementById("signup-confirm").value;
    const errorEl = document.getElementById("signup-error");

    // Validation
    if (!name) {
      errorEl.textContent = "❌ Full name is required."; return;
    }
    if (!email || !email.includes("@")) {
      errorEl.textContent = "❌ Enter a valid email address."; return;
    }
    if (!phone || phone.length < 8) {
      errorEl.textContent = "❌ Enter a valid phone number."; return;
    }
    if (!address) {
      errorEl.textContent = "❌ Delivery address is required."; return;
    }
    if (password.length < 6) {
      errorEl.textContent = "❌ Password must be at least 6 characters."; return;
    }
    if (password !== confirm) {
      errorEl.textContent = "❌ Passwords do not match."; return;
    }

    // Check if email already exists
    const users = getUsers();
    const existing = users.find(function(u) {
      return u.email === email;
    });
    if (existing) {
      errorEl.textContent = "❌ An account with this email already exists.";
      return;
    }

    // Create new user
    const newUser = {
      id: "user-" + Date.now(),
      name: name,
      email: email,
      phone: phone,
      address: address,
      password: password,
      orders: []
    };

    users.push(newUser);
    saveUsers(users);
    saveLoggedInUser(newUser);

    errorEl.style.color = "green";
    errorEl.textContent = "✅ Account created! Redirecting...";

    setTimeout(function() {
      window.location.href = "orders.html";
    }, 1200);
  });
}

// ── LOGIN LOGIC ──
const loginBtn = document.getElementById("login-btn");
if (loginBtn) {
  loginBtn.addEventListener("click", function() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const errorEl = document.getElementById("login-error");

    if (!email || !email.includes("@")) {
      errorEl.textContent = "❌ Enter a valid email address."; return;
    }
    if (!password) {
      errorEl.textContent = "❌ Password is required."; return;
    }

    // Find user
    const users = getUsers();
    const user = users.find(function(u) {
      return u.email === email && u.password === password;
    });

    if (!user) {
      errorEl.textContent = "❌ Incorrect email or password.";
      return;
    }

    saveLoggedInUser(user);
    errorEl.style.color = "green";
    errorEl.textContent = "✅ Login successful! Redirecting...";

    setTimeout(function() {
      window.location.href = "orders.html";
    }, 1200);
  });
}