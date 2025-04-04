const logBtn = document.getElementById('logBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const searchInput = document.getElementById('searchInput');

let allProducts = [];
// Check if user is logged in and display welcome message
if (localStorage.getItem('userName') !== null) {
    welcomeMessage.innerHTML = `Welcome ${localStorage.getItem('userName')}`;
}

// Logout function
function logOut() {
    window.location.href = 'index.html';
    localStorage.removeItem('userName');
}

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Add event listener for logout button
logBtn.addEventListener('click', logOut);

// Fetch products from the API
async function fetchProducts() {
    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/products');
        const data = await response.json();
        allProducts = data.data; // Store products globally
        displayProducts(allProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        document.getElementById('productContainer').innerHTML =
            '<p>Sorry, unable to load products at this time.</p>';
    }
}

// Display products on the page
function displayProducts(products) {
    const container = document.getElementById('productContainer');
    container.innerHTML = ''; // Clear previous content

    let productsHTML = '';
    products.forEach(product => {
        productsHTML += `
            <div class="product-card">
                <div class="cardImage">
                    <img src="${product.imageCover}" alt="${product.title}" class="product-image">
                </div>
                <div class="allInfo">
                    <div class="product-info">
                        <div>
                        <h3 class="product-title">${product.title}</h3>
                        </div>
                    </div>
                    <div class="product-info2">
                        <div>
                            <p class="product-price">Price: ${product.price}</p>
                        </div>
                        <div>
                            <p class="product-ratingsAverage">Rating: ${product.ratingsAverage}</p>
                        </div>
                    </div>
                    <div class="cardButton">
                        <div class="star-rating">
                            ${getStarRating(product.ratingsAverage)}
                        </div>
                        <button class="btn-add-cart" onclick="addToCart('${product.id}')">
                            Add to Cart
                        </button>
                    </div>
                </div>
                <span class="wishlist-icon" onclick="toggleWishlist('${product.id}')">♥</span>
            </div>
        `;
    });

    container.innerHTML = productsHTML;
}
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? '★' : '';
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return '★'.repeat(fullStars) + halfStar + '☆'.repeat(emptyStars);
}

document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("product-image")) {
            openModal(event.target.src);
        }
    });
});

function openModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");

    modal.style.display = "block";
    modalImg.src = imageSrc;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}



// Search function
searchInput.addEventListener('input', function (event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
});

// Add to cart function (placeholder)
// function addToCart(productId) {
//     alert(`Product ${productId} added to cart!`);
// }
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Product "${product.name}" added to cart!`);
}

// Toggle wishlist function (placeholder)
function toggleWishlist(productId) {
    alert(`Product ${productId} toggled in wishlist!`);
}

// Fetch products when page loads
window.onload = function () {
    fetchProducts();
};
