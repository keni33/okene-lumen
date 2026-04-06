// Load products from localStorage or fall back to products.js data
function getProducts() {
  const stored = localStorage.getItem("farmProducts");
  return stored ? JSON.parse(stored) : products;
}

// Save products to localStorage
function saveProducts(data) {
  localStorage.setItem("farmProducts", JSON.stringify(data));
}

// Load orders from localStorage
function getOrders() {
  const stored = localStorage.getItem("farmOrders");
  return stored ? JSON.parse(stored) : [
    {
      id: 1,
      product: "Tomatoes",
      quantity: 3.5,
      unit: "kg",
      total: 28000,
      status: "pending",
      buyer: "Buyer A"
    },
    {
      id: 2,
      product: "Fresh Milk",
      quantity: 2,
      unit: "litre",
      total: 10000,
      status: "pending",
      buyer: "Buyer B"
    }
  ];
}

// Save orders
function saveOrders(data) {
  localStorage.setItem("farmOrders", JSON.stringify(data));
}

// Track which product is being edited
let editingProductId = null;

// ── BUILD PRODUCT CARDS ──
function buildFarmerCards() {
  const grid = document.getElementById("farmer-product-grid");
  const data = getProducts();
  grid.innerHTML = "";

  if (data.length === 0) {
    grid.innerHTML = '<p class="empty-state">No products yet. Click "Add New Product" to get started.</p>';
    return;
  }

  data.forEach(function(product) {
    const card = document.createElement("div");
    card.className = "farmer-card";
    card.innerHTML = `
      <div class="farmer-card-image">
        <img src="${product.image}" alt="${product.name}">
        ${product.stock === 0
          ? '<span class="out-of-stock-badge">Out of Stock</span>'
          : ''}
      </div>
      <div class="farmer-card-body">
        <p class="category">${product.category}</p>
        <h3>${product.name}</h3>
        <p class="price">₦${product.price.toLocaleString()} / ${product.unit}</p>
        <span class="stock-status ${product.stock === 0 ? 'out-of-stock' : 'in-stock'}">
          ${product.stock === 0 ? '❌ Out of Stock' : '✅ ' + product.stock + ' ' + product.unit + ' in stock'}
        </span>
      </div>
      <div class="farmer-card-actions">
        <button class="btn-edit" data-id="${product.id}">✏️ Edit</button>
        <button class="btn-toggle-stock" data-id="${product.id}">
          ${product.stock === 0 ? '📦 Restock' : '🚫 Mark Out of Stock'}
        </button>
        <button class="btn-delete" data-id="${product.id}">🗑</button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Edit button
  document.querySelectorAll(".btn-edit").forEach(function(btn) {
    btn.addEventListener("click", function() {
      openEditModal(btn.getAttribute("data-id"));
    });
  });

  // Toggle stock button
  document.querySelectorAll(".btn-toggle-stock").forEach(function(btn) {
    btn.addEventListener("click", function() {
      toggleStock(btn.getAttribute("data-id"));
    });
  });

  // Delete button
  document.querySelectorAll(".btn-delete").forEach(function(btn) {
    btn.addEventListener("click", function() {
      deleteProduct(btn.getAttribute("data-id"));
    });
  });
}

// ── BUILD ORDERS LIST ──
function buildOrdersList() {
  const list = document.getElementById("orders-list");
  const orders = getOrders();
  list.innerHTML = "";

  if (orders.length === 0) {
    list.innerHTML = '<p class="empty-state">No incoming orders yet.</p>';
    return;
  }

  orders.forEach(function(order) {
    const card = document.createElement("div");
    card.className = "order-card";
    card.innerHTML = `
      <div class="order-info">
        <h3>${order.product}</h3>
        <p>Quantity: ${order.quantity} ${order.unit}</p>
        <p>Total: ₦${order.total.toLocaleString()}</p>
        <p>Buyer: ${order.buyer}</p>
      </div>
      <div style="display:flex; flex-direction:column; align-items:flex-end; gap:10px;">
        <span class="order-status ${order.status}">${order.status.toUpperCase()}</span>
        ${order.status === "pending" ? `
          <div class="order-actions">
            <button class="btn-approve" data-id="${order.id}">✅ Approve</button>
            <button class="btn-decline" data-id="${order.id}">❌ Decline</button>
          </div>` : ""}
      </div>
    `;
    list.appendChild(card);
  });

  // Approve buttons
  document.querySelectorAll(".btn-approve").forEach(function(btn) {
    btn.addEventListener("click", function() {
      updateOrderStatus(parseInt(btn.getAttribute("data-id")), "approved");
    });
  });

  // Decline buttons
  document.querySelectorAll(".btn-decline").forEach(function(btn) {
    btn.addEventListener("click", function() {
      updateOrderStatus(parseInt(btn.getAttribute("data-id")), "declined");
    });
  });
}

// ── UPDATE ORDER STATUS ──
function updateOrderStatus(orderId, status) {
  const orders = getOrders();
  const order = orders.find(function(o) { return o.id === orderId; });
  if (order) {
    order.status = status;
    saveOrders(orders);
    buildOrdersList();
  }
}

// ── TOGGLE STOCK ──
function toggleStock(productId) {
  const data = getProducts();
  const product = data.find(function(p) { return p.id === productId; });
  if (product) {
    if (product.stock === 0) {
      // Restock — ask how many
      const amount = prompt("How many " + product.unit + " are you restocking?");
      const parsed = parseFloat(amount);
      if (!isNaN(parsed) && parsed > 0) {
        product.stock = parsed;
      } else {
        alert("Invalid amount entered.");
        return;
      }
    } else {
      product.stock = 0;
    }
    saveProducts(data);
    buildFarmerCards();
  }
}

// ── DELETE PRODUCT ──
function deleteProduct(productId) {
  const confirmed = confirm("Are you sure you want to delete this product?");
  if (!confirmed) return;
  let data = getProducts();
  data = data.filter(function(p) { return p.id !== productId; });
  saveProducts(data);
  buildFarmerCards();
}

// ── OPEN ADD MODAL ──
document.getElementById("open-add-modal").addEventListener("click", function() {
  editingProductId = null;
  document.getElementById("modal-title").textContent = "Add New Product";
  document.getElementById("form-name").value = "";
  document.getElementById("form-price").value = "";
  document.getElementById("form-stock").value = "";
  document.getElementById("form-description").value = "";
  document.getElementById("form-image").value = "";
  document.getElementById("form-error").textContent = "";
  document.getElementById("modal-overlay").classList.add("open");
});

// ── OPEN EDIT MODAL ──
function openEditModal(productId) {
  const data = getProducts();
  const product = data.find(function(p) { return p.id === productId; });
  if (!product) return;

  editingProductId = productId;
  document.getElementById("modal-title").textContent = "Edit Product";
  document.getElementById("form-name").value = product.name;
  document.getElementById("form-category").value = product.category;
  document.getElementById("form-price").value = product.price;
  document.getElementById("form-unit").value = product.unit;
  document.getElementById("form-stock").value = product.stock;
  document.getElementById("form-description").value = product.description;
  document.getElementById("form-image").value = product.image;
  document.getElementById("form-error").textContent = "";
  document.getElementById("modal-overlay").classList.add("open");
}

// ── CLOSE MODAL ──
function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
}

document.getElementById("close-modal").addEventListener("click", closeModal);
document.getElementById("cancel-modal-btn").addEventListener("click", closeModal);

// Close modal when clicking outside
document.getElementById("modal-overlay").addEventListener("click", function(e) {
  if (e.target === document.getElementById("modal-overlay")) {
    closeModal();
  }
});

// ── SAVE PRODUCT ──
document.getElementById("save-product-btn").addEventListener("click", function() {
  const name = document.getElementById("form-name").value.trim();
  const category = document.getElementById("form-category").value;
  const price = parseFloat(document.getElementById("form-price").value);
  const unit = document.getElementById("form-unit").value;
  const stock = parseFloat(document.getElementById("form-stock").value);
  const description = document.getElementById("form-description").value.trim();
  const image = document.getElementById("form-image").value.trim();
  const errorEl = document.getElementById("form-error");

  // Validation
  if (!name) { errorEl.textContent = "❌ Product name is required."; return; }
  if (isNaN(price) || price <= 0) { errorEl.textContent = "❌ Enter a valid price."; return; }
  if (isNaN(stock) || stock < 0) { errorEl.textContent = "❌ Enter a valid stock amount."; return; }
  if (!description) { errorEl.textContent = "❌ Description is required."; return; }
  if (!image) { errorEl.textContent = "❌ Image filename is required."; return; }

  errorEl.textContent = "";
  const data = getProducts();

  if (editingProductId) {
    // Update existing product
    const product = data.find(function(p) { return p.id === editingProductId; });
    if (product) {
      product.name = name;
      product.category = category;
      product.price = price;
      product.unit = unit;
      product.stock = stock;
      product.description = description;
      product.image = image;
    }
  } else {
    // Add new product
    const newProduct = {
      id: name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
      name: name,
      category: category,
      price: price,
      unit: unit,
      stock: stock,
      image: image,
      description: description,
      sizes: [1, 2, 5, 10]
    };
    data.push(newProduct);
  }

  saveProducts(data);
  closeModal();
  buildFarmerCards();
  alert("✅ Product saved successfully!");
});

// ── TABS ──
document.querySelectorAll(".tab").forEach(function(tab) {
  tab.addEventListener("click", function() {
    document.querySelectorAll(".tab").forEach(function(t) {
      t.classList.remove("active");
    });
    document.querySelectorAll(".tab-content").forEach(function(c) {
      c.classList.remove("active");
    });
    tab.classList.add("active");
    document.getElementById(tab.getAttribute("data-tab")).classList.add("active");
  });
});

// ── INIT ──
buildFarmerCards();
buildOrdersList();
