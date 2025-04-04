async function fetchCartItems(productId) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
        if (!response.ok) {
            throw new Error('Error fetching cart items');
        }
        const data = await response.json();
        displayCartItems(data.items); // Process and display cart items
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
}


function displayCartItems() {
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cartContainer");
const totalPriceContainer = document.getElementById("totalPrice");
cartContainer.innerHTML = ""; // Clear existing items
let totalPrice = 0; // Initialize total price

if (cart.length === 0) {
cartContainer.innerHTML = "<img class='empty-cart'>Your cart is empty ❌</img>";
totalPriceContainer.innerHTML = "Total: $0.00"; // Set total price to zero
return;
}

cart.forEach((item) => {
totalPrice += item.price * item.quantity; // Calculate total price

let div = document.createElement("div");
div.classList.add("cart-item");
div.innerHTML = `
<img src="${item.image}" class="cart-img">
<div class="cart-info">
    <h3>${item.name}</h3>
    <p>${item.description}</p>
    <h4>$${(item.price * item.quantity).toFixed(2)}</h4>
    
    <div class="quantity-control">
<button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
<span>${item.quantity}</span>
<button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
    </div>

    <button class="remove-btn" onclick="removeFromCart(${item.id})"><i class="fa fa-trash" aria-hidden="true"></i></button>
</div>
`;
cartContainer.appendChild(div);
});

// Update total price display
totalPriceContainer.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
}


// Function to update quantity
function updateQuantity(productId, change)
    {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}


// Function to remove an item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

// Function to clear cart
function clearCart() {
localStorage.removeItem("cart");
displayCartItems();
}

// Load cart on page load
window.onload = displayCartItems;