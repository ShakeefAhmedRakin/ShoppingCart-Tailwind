// GETTING REQUIRED HTML ELEMENTS
productCard = document.getElementsByClassName("product-card");
selectedItemContainer = document.getElementById("selected-items");

// SHOPPING CART ARRAY
const cartArray = [];

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
}

// ADDING CLICK FUNCTION TO PRODUCT CARDS
function handleCardClick(target) {
  productName = target.childNodes[5].innerText;
  productPrice = parseFloat(target.childNodes[7].innerText.split(" ")[0]);
  cartArray.push([productName, productPrice]);
  updateCart();
}
