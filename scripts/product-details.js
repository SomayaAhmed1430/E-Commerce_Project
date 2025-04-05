document.addEventListener("DOMContentLoaded", function () {
    // استرجاع بيانات المنتج من localStorage
    const productData = localStorage.getItem('selectedProduct');
    if (productData) {
        const product = JSON.parse(productData);

        // تحديث عنوان المنتج
        const productTitle = document.querySelector('.name-contenet-detail');
        if (productTitle) {
            productTitle.textContent = product.title;
        }

        // تحديث السعر
        const productPrice = document.querySelector('.price');
        if (productPrice) {
            productPrice.textContent = `Price: ${product.price}`;
        }

        // تحديث الوصف
        const productDescription = document.querySelector('.description-detail');
        if (productDescription) {
            productDescription.textContent = product.description || "No description available.";
        }

        // تحديث صورة المنتج
        const productImage = document.querySelector('.detail-iamge img');
        if (productImage) {
            productImage.src = product.imageCover;
            productImage.alt = product.title;
        }
    } else {
        console.error('No product data found in localStorage.');
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const sizeButtons = document.querySelectorAll('.size-btn');

    sizeButtons.forEach(button => {
        button.addEventListener('click', function () {
            sizeButtons.forEach(btn => btn.classList.remove('selected')); // إزالة التحديد عن كل الأزرار
            button.classList.add('selected'); // إضافة التحديد للزر اللي تم النقر عليه
        });
    });
});