//StUdEnt Name: Walther Wang Zhe
document.addEventListener('DOMContentLoaded', function() {
    // Initialization: Binding event listener
    initializeEventListeners();

    // Check if the user has logged in
    checkLoginStatus();
});

function initializeEventListeners() {
    // Binding shopping cart related events
    if (document.querySelectorAll('.add-to-cart').length > 0) {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', handleAddToCart);
        });

        const checkoutButton = document.getElementById('checkout');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', updateTotalDisplay);
        }

        document.querySelectorAll('.cart-remove').forEach(removeButton => {
            removeButton.addEventListener('click', removeFromCart);
        });

        const clearCartButton = document.getElementById('clear-cart');
        if (clearCartButton) {
            clearCartButton.addEventListener('click', clearCart);
        }
    }

    // Binding login and registration related events
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
}

function handleAddToCart(event) {
    const product = event.target.parentElement;
    const productName = product.querySelector('.product-name').textContent;
    const productPrice = parseFloat(product.querySelector('.product-price').textContent.replace('$', ''));
    const quantity = parseInt(product.querySelector('.quantity-input').value);

    if (quantity > 0) {
        let cartItem = document.querySelector(`#cart-items .cart-item[data-product="${productName}"]`);
        if (cartItem) {
            updateCartItemQuantity(cartItem, quantity, productPrice);
        } else {
            addNewItemToCart(productName, quantity, productPrice);
        }
        updateTotal();
    }
}

function addNewItemToCart(name, qty, price) {
    const newItem = `
        <li class="cart-item" data-product="${name}">
            <span class="cart-item-name">${name} x ${qty}</span>
            <span class="cart-item-price">$${(price * qty).toFixed(2)}</span>
            <span class="cart-remove">Remove</span>
        </li>
    `;
    document.querySelector('#cart-items').insertAdjacentHTML('beforeend', newItem);
    document.querySelector('#cart-items .cart-item:last-child .cart-remove').addEventListener('click', removeFromCart);
}

function updateCartItemQuantity(item, newQuantity, price) {
    const currentItemQuantity = parseInt(item.querySelector('.cart-item-name').textContent.split('x')[1]);
    const newTotalQuantity = currentItemQuantity + newQuantity;
    item.querySelector('.cart-item-name').textContent = `${item.dataset.product} x ${newTotalQuantity}`;
    item.querySelector('.cart-item-price').textContent = `$${(price * newTotalQuantity).toFixed(2)}`;
}

function removeFromCart(event) {
    event.target.parentElement.remove();
    updateTotal();
}

function clearCart() {
    document.getElementById('cart-items').innerHTML = '';
    updateTotal();
}

function updateTotal() {
    let totalAmount = 0;
    document.querySelectorAll('#cart-items .cart-item').forEach(item => {
        const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('$', ''));
        const quantity = parseInt(item.querySelector('.cart-item-name').textContent.split('x')[1]);
        totalAmount += price * quantity;
    });
    document.querySelector('#total-value').textContent = totalAmount.toFixed(2);
}

function updateTotalDisplay() {
    updateTotal(); // Ensure that the total price is up-to-date

    alert("Checkout process would start here with total: $" + document.querySelector('#total-value').textContent);
}

// Login and registration functions
function handleLogin(event) {
    event.preventDefault();

    // Retrieve the input username and password
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Username:', username);
    console.log('Password:', password);

    // Retrieve the registered username and password from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    console.log('Stored Username:', storedUsername);
    console.log('Stored Password:', storedPassword);

    // Simulate login verification
    if (username === storedUsername && password === storedPassword) {
        console.log('Login successful');
        // Login succeeded
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'index.html';
    } else {
        console.log('Login failed');
        // Login failed
        alert('Invalid credentials');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // Save username and password to local storage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        alert('Registration successful!');
        window.location.href = 'login.html'; // After successful registration, jump to login.html
    } else {
        alert('Please enter both username and password.');
    }
}

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const logoutBtn = document.getElementById('logout-btn');
    const loginBtn = document.getElementById('login-btn');

    if (isLoggedIn) {
        // The user has logged in, display the logout button and hide the login button
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
        }
        if (loginBtn) {
            loginBtn.style.display = 'none';
        }
    } else {
        // User not logged in, display login button and hide logout button
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
        }
        if (loginBtn) {
            loginBtn.style.display = 'block';
        }

        // If not logged in on the shopping cart page, display a prompt and redirect to the login page
        const currentPage = window.location.pathname;
        if (currentPage.endsWith('Shopping_Cart.html')) {
            alert('Please login first');
            window.location.href = 'login.html';
        }
    }
}
