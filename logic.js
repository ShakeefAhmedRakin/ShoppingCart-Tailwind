// GETTING REQUIRED HTML ELEMENTS
productCard = document.getElementsByClassName("product-card");
selectedItemContainer = document.getElementById("selected-items");
totalPriceDisplay = document.getElementById("total-price");
discountDisplay = document.getElementById("discount-amount");
grandTotalDisplay = document.getElementById("grand-total");
purchaseButton = document.getElementById("btn-purchase");
couponButton = document.getElementById("btn-cpn");
couponInput = document.getElementById("input-cpn");
discountTag = document.getElementById("discount-tag");

// SHOPPING CART VARIABLES
const cartArray = [];
let totalPrice = 0.0;
let discount = 0.0;
let grandTotal = 0.0;
let canApplyDiscount = false;

// SHOPPING CART FUNCTIONS
function updateCart() {
  // CLEARING EXISTING ITEMS IN DISPLAY
  while (selectedItemContainer.firstChild) {
    selectedItemContainer.removeChild(selectedItemContainer.firstChild);
  }

  // UPDATING THE DISPLAYED CART
  for (i in cartArray) {
    itemName = cartArray[i][0];
    let li = document.createElement("li");
    li.innerText = (parseInt(i) + 1).toString() + ". " + itemName;
    selectedItemContainer.appendChild(li);
  }

  // UPDATING TOTAL PRICE
  totalPrice = 0;
  for (i in cartArray) {
    totalPrice += cartArray[i][1];
  }
  totalPriceDisplay.innerText = totalPrice.toFixed(2);

  checkButtons();

  // APPLYING DISCOUNT IF APPLICABLE AND UPDATING GRAND TOTAL
  grandTotal = 0;
  discount = 0;
  if (canApplyDiscount) {
    discount = totalPrice * 0.2;
    grandTotal = totalPrice - discount;
  } else {
    grandTotal = totalPrice;
  }
  grandTotalDisplay.innerText = grandTotal.toFixed(2);
  discountDisplay.innerText = discount.toFixed(2);
}

// BUTTON ENABLE/DISABLE FUNCTION
function checkButtons() {
  // FOR PURCHASE BUTTON
  if (totalPrice > 0) {
    purchaseButton.removeAttribute("disabled");
  } else {
    purchaseButton.setAttribute("disabled");
  }

  if (totalPrice >= 200) {
    couponButton.removeAttribute("disabled");
  } else {
    couponButton.setAttribute("disabled", "disabled");
  }
  // FOR COUPON BUTTON
}

// ADDING CLICK FUNCTION TO PRODUCT CARDS
function handleCardClick(target) {
  productName = target.childNodes[5].innerText;
  productPrice = parseFloat(target.childNodes[7].innerText.split(" ")[0]);
  cartArray.push([productName, productPrice]);
  updateCart();
}

couponButton.addEventListener("click", function () {
  if (couponInput.value === "SELL200") {
    canApplyDiscount = true;
    discountTag.classList.remove("invisible");
  } else {
    canApplyDiscount = false;
    discountTag.classList.add("invisible");
  }
  couponInput.value = "";
  updateCart();
});
