// Cart counter
const cartCount = document.getElementById("cart-count");
let count = 0;

// Get products — check localStorage first (farmer may have added products)
function getAllProducts() {
  const stored = localStorage.getItem("farmProducts");
  return stored ? JSON.parse(stored) : products;
}

// Build all product cards
function buildProductCards() {
  const grid = document.getElementById("product-grid");
  const allProducts = getAllProducts();
  grid.innerHTML = "";

  allProducts.forEach(function(product) {
    const stockBadge = product.stock === 0
      ? '<span class="out-of-stock-badge">Out of Stock</span>'
      : '';
    const btnDisabled = product.stock === 0 ? "disabled" : "";
    const btnText = product.stock === 0 ? "Out of Stock" : "Add to Cart";

    const card = document.createElement("div");
    card.className = "card-wrapper";
    card.innerHTML = `
      <a href="product.html?id=${product.id}" class="card-link">
        <div class="product-card ${product.stock === 0 ? 'out-of-stock' : ''}">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${stockBadge}
          </div>
          <div class="product-info">
            <h3>${product.name}</h3>
            <p class="category">${product.category}</p>
            <p class="price">&#8358;${product.price.toLocaleString()} / ${product.unit}</p>
            <button
              class="btn add-to-cart"
              ${btnDisabled}
              data-id="${product.id}"
              data-name="${product.name}"
            >${btnText}</button>
          </div>
        </div>
      </a>
    `;
    grid.appendChild(card);
  });

  // Cart button listeners
  document.querySelectorAll(".add-to-cart:not([disabled])").forEach(function(btn) {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      count++;
      cartCount.textContent = count;
      btn.textContent = "✅ Added";
      setTimeout(function() {
        btn.textContent = "Add to Cart";
      }, 1500);
    });
  });
}

buildProductCards();