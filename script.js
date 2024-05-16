document.addEventListener("DOMContentLoaded", function () {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let cartBody = document.getElementById("cart-items");
  let clearBtn = document.getElementById("clear-btn");
  let orderBtn = document.querySelectorAll(".add-to-cart");
  let totalPriceBox = document.getElementById("total-price-box");

  function addToCart(itemName, price) {
    cartItems.push({ name: itemName, price: price });
    updateCart();
    addMarginToTotalPrice();

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  function updateCart() {
    cartBody.innerHTML = "";

    cartItems.forEach((item) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");
      cartItemElement.innerHTML = `
              <div class="item-name">${item.name}</div>
              <div class="item-price">$${item.price}</div>
            `;
      cartBody.appendChild(cartItemElement);
    });

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
    document.getElementById("total-price").innerText = `$${totalPrice}`;
  }
  orderBtn.forEach((button) => {
    button.addEventListener("click", function () {
      const itemName = this.dataset.name;
      const itemPrice = parseFloat(this.dataset.price);
      addToCart(itemName, itemPrice);
    });
  });

  clearBtn.addEventListener("click", () => {
    cartItems = [];
    updateCart();

    localStorage.removeItem("cartItems");
    totalPriceBox.classList.remove("mt-5");
  });

  function addMarginToTotalPrice() {
    if (cartItems.length > 0) {
      totalPriceBox.classList.add("mt-5");
    }
  }

  updateCart();
  addMarginToTotalPrice();
});
