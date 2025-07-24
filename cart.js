// --- Cart Logic ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.querySelector(".cart-count");

function updateCartCount() {
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) cartCount.textContent = totalQty;
}

function addToCart(product) {
  const existingItem = cart.find((item) => item.name === product.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast();
}

function loadCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  let total = 0;

  if (!cartItemsContainer || !cartTotalElement) return;

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalElement.textContent = "$0.00";
    return;
  }

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item row align-items-center";

    cartItem.innerHTML = `
      <div class="col-md-2">
        <img src="${item.image}" alt="${item.name}" class="img-fluid">
      </div>
      <div class="col-md-3">
        <h6>${item.name}</h6>
        <p>$${item.price.toFixed(2)}</p>
      </div>
      <div class="col-md-4">
        <button onclick="updateQuantity(${index}, -1)" class="btn btn-sm btn-danger">-</button>
        <span class="mx-2">${item.quantity}</span>
        <button onclick="updateQuantity(${index}, 1)" class="btn btn-sm btn-success">+</button>
      </div>
      <div class="col-md-3 text-end fw-bold">
        $${itemTotal.toFixed(2)}
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  cartTotalElement.textContent = "$" + total.toFixed(2);
}

function updateQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCartItems();
}

function checkout() {
  alert("Order processed successfully!");
  localStorage.removeItem("cart");
  window.location.href = "home.html";
}

function showToast() {
  const toastEl = document.getElementById("cartToast");
  if (toastEl) {
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
}
