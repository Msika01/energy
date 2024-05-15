document.addEventListener("DOMContentLoaded", function () {
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
    addMarginToTotalPrice();
    // Update local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  // Function to update cart display in modal
  function updateCart() {
    // Clear previous cart content
    cartBody.innerHTML = "";

    // Iterate over cartItems array and display each item
    cartItems.forEach((item) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");
      cartItemElement.innerHTML = `
              <div class="item-name">${item.name}</div>
              <div class="item-price">$${item.price}</div>
            `;
      cartBody.appendChild(cartItemElement);
    });

    // Calculate total price
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
    document.getElementById("total-price").innerText = `$${totalPrice}`;
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
    // Remove margin from total price box
    totalPriceBox.classList.remove("mt-5");
  });

  // Function to add margin to total price box
  function addMarginToTotalPrice() {
    if (cartItems.length > 0) {
      totalPriceBox.classList.add("mt-5");
    }
  }

  // When page loads, populate cart with stored items
  updateCart();
  addMarginToTotalPrice();
});
