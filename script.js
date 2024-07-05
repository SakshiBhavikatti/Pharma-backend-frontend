const medicineData = [
    {
        name: "Paracetamol",
        category: "painkiller",
        description: "Relieves pain and fever",
        price: 10.99,
    },
    {
        name: "Dolo 650", 
        category: "painkiller",
        description: "Relieves pain and fever",
        price: 11.3,
    },
    {
        name: "Ibuprofen", 
        category: "painkiller", 
        description: "Reduces inflammation and pain",
        price:11.0,
    },
    {
        name: "Vitamin C", 
        category: "antiviral",
        price:5.0,
    },
    {
        name: "Lopromide",
        category:"painkiller",
        price: 9.0,
    },
    {
        name:"Halothane",
        category:"anesthetics",
        price:12.0,
    },
    {
        name:"Dexamethasone",
        category:"anti-allergics",
        price:12.0,

    },
    {
        name:"Diazepam",
        category:"anticonvulsants",
        price:8.9,
    },
    
    {
        name: "Amoxicillin",
        category: "antibacterial", 
        description: "Treats bacterial infections",
        price: 9.0,
    },
    {
        name: "Benzylpenicillin",
        category: "antibacterial",
        description:"treats tinea corporis, tinea cruris and tinea pedis",
        price: 7.99,
    },
    {
        name:"Clotrimazole",
        category:"antifungal",
        price:10.11,

    },
    {
        name:"Nystatin",
        category:"antifungal",
        price:12.11,
    },
    {
        name:"Didanosine",
        category:"antiviral",
        price:12.34
    },
    {
        name:"Lamivudine",
        category:"antiviral",
        price:11.74,
    },
    {
        name: "Didanosine",
        category: "antiviral",
        price: 12.49,
    },
    // Add more medicine items as needed
];

const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const medicineList = document.getElementById("medicineList");
const cartItems = document.getElementById("cartItems");
const cartTotalSpan = document.getElementById("cartTotal");
const cart = [];

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
            <span>${medicine.name}</span>
            <span>$${medicine.price.toFixed(2)}</span>
            <button class="remove-button" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        cartTotal += medicine.price;
    });

    cartTotalSpan.textContent = cartTotal.toFixed(2);

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
            (searchTerm === "" || medicine.name.toLowerCase().includes(searchTerm)) &&
            (selectedCategory === "" || medicine.category.toLowerCase() === selectedCategory)
        ) {
            const medicineItem = document.createElement("div");
            medicineItem.classList.add("medicine-item");
            medicineItem.innerHTML = `
                <h3>${medicine.name}</h3>
                <p>Category: ${medicine.category}</p>
                <p>Price: $${medicine.price.toFixed(2)}</p>
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

// Initial display of medicine items
displayMedicineItems();
