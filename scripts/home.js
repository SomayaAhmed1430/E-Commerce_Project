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
                    <div class="star-rating">
                            ${getStarRating(product.ratingsAverage)}
                        </div>
                    <div class="cardButton">
                        <button class="btn-add-cart" onclick="addToCart('${product.id}')">
                            Add to Cart
                        </button>
                        <button class="elsakka" onclick="detaile('${product.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-info-circle-fill " viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                        </svg>
                        </button>
                    </div>
                </div>
                <span class="wishlist-icon" onclick="toggleWishlist('${product.id}')"><i class="fa-solid fa-heart"></i></span>
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
function detaile(productId) {
    console.log("Selected product ID:", productId);
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        
        window.location.href = 'product-details.html';
    } else {
        console.error('Product not found!');
    }
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


// Toggle wishlist function (placeholder)
function toggleWishlist(productId) {
    alert(`Product ${productId} toggled in wishlist!`);
}
function toggleWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlist.includes(productId)) {
        // Remove if already added
        wishlist = wishlist.filter(id => id !== productId);
    } else {
        // Add if not exists
        wishlist.push(productId);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Wishlist updated!");
}

// Fetch products when page loads
window.onload = function () {
    fetchProducts();
};