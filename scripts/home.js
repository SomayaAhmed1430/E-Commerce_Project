// DOM Elements
const logBtn = document.getElementById('logBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

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
        displayProducts(data.data);
    } catch (error) {
        console.error('Error fetching products:', error);
        document.getElementById('productContainer').innerHTML =
            '<p>Sorry, unable to load products at this time.</p>';
    }
}

// Display products on the page without creating new divs
function displayProducts(products) {
    const container = document.getElementById('productContainer');
    container.innerHTML = ''; // مسح المحتوى السابق

    // إنشاء السلسلة HTML لجميع المنتجات مرة واحدة
    let productsHTML = '';
    products.forEach(product => {
        productsHTML += `
            <div class="product-card">
                <img src="${product.imageCover}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">${product.price}</p>
                    <p class="product-title">${product.slug}</p>
                 <p class="product-title">${product.ratingsAverage}</p>
                    <button class="btn-add-cart" onclick="addToCart('${product.id}')">
                        Add to Cart
                    </button>
                </div>
                <span class="wishlist-icon" onclick="toggleWishlist('${product.id}')">♥</span>
            </div>
        `;
    });

    // إضافة كل الـ HTML إلى الحاوية مرة واحدة
    container.innerHTML = productsHTML;
}

// Add to cart function (placeholder)
function addToCart(productId) {
    alert(`Product ${productId} added to cart!`);
}

// Toggle wishlist function (placeholder)
function toggleWishlist(productId) {
    alert(`Product ${productId} toggled in wishlist!`);
}

// Fetch products when page loads
window.onload = function () {
    fetchProducts();
};