// navbar.js — runs on every page to update navbar
function updateNavbar() {
  const currentUser = localStorage.getItem("okeneLumenCurrentUser");
  const navLinks = document.querySelector(".nav-links");

  // Add farmer dashboard link
  const farmerLi = document.createElement("li");
  farmerLi.innerHTML = `<a href="farmer.html">🌾 Farmer</a>`;
  navLinks.appendChild(farmerLi);

  // Add login/user link
  const authLi = document.createElement("li");
  if (currentUser) {
    const user = JSON.parse(currentUser);
    authLi.innerHTML = `<a href="orders.html">👤 ${user.name.split(" ")[0]}</a>`;
  } else {
    authLi.innerHTML = `<a href="login.html">Login</a>`;
  }
  navLinks.appendChild(authLi);
}

updateNavbar();