// Variables
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let cartBody = document.getElementById("cart-items");
let clearBtn = document.getElementById("clear-btn");
let orderBtn = document.querySelectorAll(".add-to-cart");
let totalPriceBox = document.getElementById("total-price-box");

// Function to add item to cart
function addToCart(itemName, price) {
  cartItems.push({ name: itemName, price: price });
  updateCart();
  // Update local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  alert(`Added "${itemName}" to cart.`);
}

// Function to remove item from cart
function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCart();
  // Update local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Function to update cart display in modal
function updateCart() {
  // Clear previous cart content
  cartBody.innerHTML = "";

  // Iterate over cartItems array and display each item
  cartItems.forEach((item, index) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");
    cartItemElement.innerHTML = `
    <div class="cart-item d-flex justify-content-between">
      <div class="item-details">
        <div class="item-name">${item.name}</div>
        <div class="item-price fw-medium ">$${item.price}</div>
      </div>
      <div class="quantity-button" role="button" tabindex="0" onclick="removeFromCart(${index})">
        <span class="text-danger"><i class="bi bi-x-lg"></i></span>
      </div>
  </div>`;
    cartBody.appendChild(cartItemElement);
  });

  // Calculate total price and round it to 2 decimal places
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price, 0)
    .toFixed(2);
  document.getElementById("total-price").textContent = `$${totalPrice}`;

  // Add margin-top to total price box if cart is not empty
  if (cartItems.length > 0) {
    totalPriceBox.classList.add("mt-4");
  } else {
    totalPriceBox.classList.remove("mt-4");
  }
}

// Event listener for "Add to cart" buttons
orderBtn.forEach((button) => {
  button.addEventListener("click", function () {
    const itemName = this.dataset.name;
    const itemPrice = parseFloat(this.dataset.price);
    addToCart(itemName, itemPrice);
  });
});

// Event listener for clear button
clearBtn.addEventListener("click", () => {
  cartItems = [];
  updateCart();
  // Remove from local storage
  localStorage.removeItem("cartItems");
});

// When page loads, populate cart with stored items
updateCart();
