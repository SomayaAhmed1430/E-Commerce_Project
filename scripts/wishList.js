// Load the wish list from localStorage
function loadWishlist() {
    // جلب الـ Wish List من الـ localStorage
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // لو مفيش منتجات في الـ Wish List
    if (wishlist.length === 0) {
        document.getElementById('wishlist-container').innerHTML = '<p>Your wish list is empty!</p>';
        return;
    }

    // جلب المنتجات من الـ API علشان نعرضهم
    fetch('https://ecommerce.routemisr.com/api/v1/products')
        .then(response => response.json())
        .then(data => {
            const allProducts = data.data;

            // فلترة المنتجات اللي في الـ Wish List
            const wishlistProducts = allProducts.filter(product => wishlist.includes(product.id));

            // عرض المنتجات في الـ Wish List
            const container = document.getElementById('wishlist-container');
            container.innerHTML = ''; // مسح القديم
            wishlistProducts.forEach(product => {
                container.innerHTML += `
                    <div class="product-card">
                        <div class="cardImage">
                            <img src="${product.imageCover}" alt="${product.title}" class="product-image">
                        </div>
                        <div class="product-info">
                            <h3 class="product-title">${product.title}</h3>
                            <p class="product-price">Price: ${product.price}</p>
                            <button onclick="removeFromWishlist('${product.id}')">Remove</button>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching products for wishlist:', error);
            document.getElementById('wishlist-container').innerHTML = '<p>Sorry, unable to load your wishlist at this time.</p>';
        });
}

// remove from wish list
function removeFromWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist = wishlist.filter(id => id !== productId);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    loadWishlist();
}

// استدعاء دالة عرض الـ Wish List عند تحميل الصفحة
window.onload = loadWishlist;


