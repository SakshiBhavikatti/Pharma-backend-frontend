const getMedicine = async () => {
  const response = await fetch("http://localhost:3000/api/medicine");
  const medicineData = await response.json();
  return medicineData;
};

const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const medicineList = document.getElementById("medicineList");
const cartItems = document.getElementById("cartItems");
const cartTotalSpan = document.getElementById("cartTotal");
let cart = [];
let medicineData = [];

// Function to add medicine items to the cart
function addToCart(index) {
  const medicine = medicineData[index];
  cart.push(medicine);
  updateCartUI();
}

// Function to update the cart UI
function updateCartUI() {
  cartItems.innerHTML = "";
  let cartTotal = 0;

  cart.forEach((medicine, index) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `
      <span>${medicine.Name}</span><br />
      <span>$${medicine.Price}</span><br />
      <span>${medicine.Description}</span><br />
      <p>Pharma Store: ${medicine.PName}</p>

      <button class="remove-button" data-index="${index}">Remove</button>
    `;
    cartItems.appendChild(cartItem);
    cartTotal += parseInt(medicine.Price);
  });

  cartTotalSpan.textContent = cartTotal;

  // Add event listeners to remove items from the cart
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      cart.splice(index, 1);
      updateCartUI();
    });
  });
}

// Function to display medicine items based on user selections
function displayMedicineItems() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = filterSelect.value.toLowerCase();

  medicineList.innerHTML = "";

  medicineData.forEach((medicine, index) => {
    if (
      (searchTerm === "" || medicine.Name.toLowerCase().includes(searchTerm)) &&
      (selectedCategory === "" || medicine.Category.toLowerCase() === selectedCategory)
    ) {
      const medicineItem = document.createElement("div");
      medicineItem.classList.add("medicine-item");
      medicineItem.innerHTML = `
        <h3>${medicine.Name}</h3>
        <p>Category: ${medicine.Category}</p>
        <p>Price: $${medicine.Price}</p>
        <p>Description: ${medicine.Description}</p>
        <p>Pharma Store: ${medicine.PName}</p>
        <p>Quantity: ${medicine.Quantity}</p>
        <button class="add-to-cart-button" data-index="${index}">Add to Cart</button>
      `;
      medicineList.appendChild(medicineItem);
    }
  });

  // Add event listeners to add items to the cart
  const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      addToCart(index);
    });
  });
}

// Event listeners for user interactions
searchInput.addEventListener("input", displayMedicineItems);
filterSelect.addEventListener("change", displayMedicineItems);

// Fetch and display medicine items on page load
const initialize = async () => {
  medicineData = await getMedicine();
  displayMedicineItems();
};

initialize();
