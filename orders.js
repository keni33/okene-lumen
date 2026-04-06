// ── CHECK IF USER IS LOGGED IN ──
function getLoggedInUser() {
  const stored = localStorage.getItem("okeneLumenCurrentUser");
  return stored ? JSON.parse(stored) : null;
}

const currentUser = getLoggedInUser();

// Redirect to login if not logged in
if (!currentUser) {
  window.location.href = "login.html";
}

// ── FILL USER INFO ──
document.getElementById("user-name-display").textContent = currentUser.name;
document.getElementById("user-email-display").textContent = currentUser.email;
document.getElementById("user-phone-display").textContent = currentUser.phone;
document.getElementById("user-address-display").textContent = currentUser.address;
document.getElementById("orders-greeting").textContent =
  "👋 Welcome, " + currentUser.name.split(" ")[0];

// ── GET THIS USER'S ORDERS ──
function getUserOrders() {
  const allOrders = localStorage.getItem("farmOrders");
  const orders = allOrders ? JSON.parse(allOrders) : [];
  return orders.filter(function(o) {
    return o.buyerId === currentUser.id;
  });
}

// ── BUILD ORDER CARD ──
function buildOrderCard(order) {
  const card = document.createElement("div");
  card.className = "user-order-card";
  card.innerHTML = `
    <div class="user-order-left">
      <h3>${order.product}</h3>
      <p>Quantity: ${order.quantity} ${order.unit}</p>
      <p>Total: ₦${order.total.toLocaleString()}</p>
      <p>Delivery to: ${currentUser.address}</p>
      <p class="order-date">📅 ${order.date || "Date not recorded"}</p>
    </div>
    <span class="order-badge ${order.status}">
      ${order.status === "pending" ? "⏳ Pending Farmer Approval" : ""}
      ${order.status === "approved" ? "✅ Approved" : ""}
      ${order.status === "declined" ? "❌ Declined" : ""}
    </span>
  `;
  return card;
}

// ── FILL ORDERS GRIDS ──
function buildOrdersPage() {
  const orders = getUserOrders();

  const allGrid = document.getElementById("all-orders-grid");
  const pendingGrid = document.getElementById("pending-orders-grid");
  const approvedGrid = document.getElementById("approved-orders-grid");
  const declinedGrid = document.getElementById("declined-orders-grid");

  allGrid.innerHTML = "";
  pendingGrid.innerHTML = "";
  approvedGrid.innerHTML = "";
  declinedGrid.innerHTML = "";

  if (orders.length === 0) {
    allGrid.innerHTML = '<p class="empty-state">You have no orders yet. <a href="index.html#products">Start shopping!</a></p>';
    pendingGrid.innerHTML = '<p class="empty-state">No pending orders.</p>';
    approvedGrid.innerHTML = '<p class="empty-state">No approved orders yet.</p>';
    declinedGrid.innerHTML = '<p class="empty-state">No declined orders.</p>';
    return;
  }

  orders.forEach(function(order) {
    allGrid.appendChild(buildOrderCard(order));

    if (order.status === "pending") {
      pendingGrid.appendChild(buildOrderCard(order));
    } else if (order.status === "approved") {
      approvedGrid.appendChild(buildOrderCard(order));
    } else if (order.status === "declined") {
      declinedGrid.appendChild(buildOrderCard(order));
    }
  });
}

// ── TABS ──
document.querySelectorAll(".tab").forEach(function(tab) {
  tab.addEventListener("click", function() {
    document.querySelectorAll(".tab").forEach(function(t) {
      t.classList.remove("active");
    });
    document.querySelectorAll(".orders-tab-content").forEach(function(c) {
      c.classList.remove("active");
    });
    tab.classList.add("active");
    document.getElementById(tab.getAttribute("data-tab")).classList.add("active");
  });
});

// ── LOGOUT ──
document.getElementById("logout-btn").addEventListener("click", function() {
  localStorage.removeItem("okeneLumenCurrentUser");
  window.location.href = "login.html";
});

// ── INIT ──
buildOrdersPage();