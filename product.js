// ── READ PRODUCT FROM URL ──
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Check localStorage first so farmer edits show up
function getAllProducts() {
  const stored = localStorage.getItem("farmProducts");
  return stored ? JSON.parse(stored) : products;
}

const product = getAllProducts().find(function(p) {
  return p.id === productId;
});

// If no product found go home
if (!product) {
  window.location.href = "index.html";
}

// ── FILL PAGE ──
document.title = product.name + " - Okene Lumen";
document.getElementById("main-product-image").src = product.image;
document.getElementById("main-product-image").alt = product.name;
document.getElementById("detail-category").textContent = product.category;
document.getElementById("detail-name").textContent = product.name;
document.getElementById("detail-description").textContent = product.description;
document.getElementById("product-price").textContent = "₦" + product.price.toLocaleString();
document.getElementById("per-unit").textContent = "per " + product.unit;
document.getElementById("stock-info").innerHTML = product.stock === 0
  ? "❌ Out of Stock"
  : "✅ In Stock — <span>" + product.stock + " " + product.unit + " available</span>";

// ── BUILD SIZE BUTTONS ──
const sizeContainer = document.getElementById("size-options");
sizeContainer.innerHTML = "";
let selectedQuantity = product.sizes[0];

product.sizes.forEach(function(size, index) {
  const btn = document.createElement("button");
  btn.className = "size-btn" + (index === 0 ? " active" : "");
  btn.setAttribute("data-size", size);
  btn.textContent = size + " " + product.unit;
  sizeContainer.appendChild(btn);
});

// ── TOTAL PRICE ──
function updateTotal(quantity) {
  document.getElementById("total-price").textContent =
    "₦" + (product.price * quantity).toLocaleString();
}
updateTotal(selectedQuantity);

// Set unit dropdown to match product
const unitSelect = document.getElementById("custom-unit");
for (let i = 0; i < unitSelect.options.length; i++) {
  if (unitSelect.options[i].value === product.unit) {
    unitSelect.selectedIndex = i;
    break;
  }
}

// ── SIZE BUTTON CLICKS ──
document.querySelectorAll(".size-btn").forEach(function(btn) {
  btn.addEventListener("click", function() {
    document.querySelectorAll(".size-btn").forEach(function(b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
    selectedQuantity = parseFloat(btn.getAttribute("data-size"));
    document.getElementById("custom-quantity").value = "";
    document.getElementById("input-error").textContent = "";
    updateTotal(selectedQuantity);
  });
});

// ── CUSTOM INPUT VALIDATION ──
const customInput = document.getElementById("custom-quantity");
const errorMsg = document.getElementById("input-error");

customInput.addEventListener("input", function() {
  const value = parseFloat(customInput.value);
  document.querySelectorAll(".size-btn").forEach(function(b) {
    b.classList.remove("active");
  });

  if (customInput.value === "") {
    errorMsg.textContent = "";
    updateTotal(product.sizes[0]);
    return;
  }
  if (isNaN(value)) {
    errorMsg.textContent = "❌ Please enter a valid number.";
    return;
  }
  if (value <= 0) {
    errorMsg.textContent = "❌ Quantity must be greater than zero.";
    return;
  }
  if (product.stock > 0 && value > product.stock) {
    errorMsg.textContent = "❌ Only " + product.stock + " " + product.unit + " available.";
    return;
  }
  errorMsg.textContent = "✅ Valid quantity.";
  selectedQuantity = value;
  updateTotal(selectedQuantity);
});

// ── ADD TO CART ──
document.getElementById("add-to-cart-btn").addEventListener("click", function() {
  if (product.stock === 0) {
    alert("Sorry, this product is currently out of stock.");
    return;
  }
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = parseInt(cartCount.textContent) + 1;
  alert("🛒 " + selectedQuantity + " " + product.unit + " of " + product.name + " added to cart!");
});

// ── WHATSAPP REQUEST ──
document.getElementById("send-request-btn").addEventListener("click", function() {
  if (product.stock === 0) {
    alert("This product is out of stock.");
    return;
  }
  if (errorMsg.textContent.startsWith("❌")) {
    alert("Please fix the errors before sending.");
    return;
  }

  const unit = document.getElementById("custom-unit").value;
  const total = product.price * selectedQuantity;

  // ════════════════════════════════════
  // 👇 PUT THE FARMER'S WHATSAPP NUMBER HERE
  const farmerPhone = "2348023452470";
  // ════════════════════════════════════

  const message =
    "🌾 *New Order Request — Okene Lumen FarmShop*\n\n" +
    "🛒 *Product:* " + product.name + "\n" +
    "📦 *Quantity:* " + selectedQuantity + " " + unit + "\n" +
    "💰 *Total Price:* ₦" + total.toLocaleString() + "\n" +
    "📍 *Category:* " + product.category + "\n\n" +
    "Please confirm if this order is available. Thank you!";

  // Save order for logged in user
  const storedUser = localStorage.getItem("okeneLumenCurrentUser");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    const allOrders = localStorage.getItem("farmOrders");
    const orders = allOrders ? JSON.parse(allOrders) : [];
    orders.push({
      id: Date.now(),
      product: product.name,
      quantity: selectedQuantity,
      unit: unit,
      total: total,
      status: "pending",
      buyerId: user.id,
      buyer: user.name,
      date: new Date().toLocaleDateString()
    });
    localStorage.setItem("farmOrders", JSON.stringify(orders));
  }

  window.open(
    "https://wa.me/" + farmerPhone + "?text=" + encodeURIComponent(message),
    "_blank"
  );
});