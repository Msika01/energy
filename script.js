// Variables
let cartItems = [];
let cartBody = document.getElementById("cart-items");
let clearBtn = document.getElementById("clear-btn");
let orderBtn = document.querySelectorAll(".add-to-cart");

// Function to add item to cart
function addToCart(itemName, price) {
  cartItems.push({ name: itemName, price: price });
  console.log(cartItems);
  updateCart();
  addMarginToTotalPrice();
}

// Function to update cart display in modal
function updateCart() {
  // Clear previous cart content
  cartBody.textContent = "";

  // Iterate over cartItems array and display each item
  cartItems.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.innerHTML = `
          <div class="cart-item">
            <div class="item-name">${item.name}</div>
            <div class="item-price">$${item.price}</div>
          </div>
        `;
    document.getElementById("cart-items").appendChild(cartItemElement);
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

clearBtn.addEventListener("click", () => {
  cartBody.textContent = "";
  if (cartBody !== "") {
    document.getElementById("total-price-box").classList.remove("mt-5");
  }
});

function addMarginToTotalPrice() {
  if (cartBody !== "") {
    document.getElementById("total-price-box").classList.add("mt-5");
  }
}
