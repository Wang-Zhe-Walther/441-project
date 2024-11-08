//StUdEnt Name: Walther Wang Zhe
document.addEventListener('DOMContentLoaded', function() {
    // 初始化：绑定事件监听器
    initializeEventListeners();

    // 检查用户是否已登录
    checkLoginStatus();
});

function initializeEventListeners() {
    // 绑定购物车相关事件
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

    // 绑定登录和注册相关事件
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
    updateTotal(); // 确保总价是最新的

    alert("Checkout process would start here with total: $" + document.querySelector('#total-value').textContent);
}

// 登录和注册功能
function handleLogin(event) {
    event.preventDefault();

    // 获取输入的用户名和密码
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Username:', username);
    console.log('Password:', password);

    // 从 localStorage 中获取注册的用户名和密码
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    console.log('Stored Username:', storedUsername);
    console.log('Stored Password:', storedPassword);

    // 模拟登录验证
    if (username === storedUsername && password === storedPassword) {
        console.log('Login successful');
        // 登录成功
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'index.html';
    } else {
        console.log('Login failed');
        // 登录失败
        alert('Invalid credentials');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // 保存用户名和密码到 localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        alert('Registration successful!');
        window.location.href = 'login.html'; // 注册成功后跳转到 login.html
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
        // 用户已登录，显示登出按钮并隐藏登录按钮
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
        }
        if (loginBtn) {
            loginBtn.style.display = 'none';
        }
    } else {
        // 用户未登录，显示登录按钮并隐藏登出按钮
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
        }
        if (loginBtn) {
            loginBtn.style.display = 'block';
        }

        // 如果在购物车页面且未登录，显示提示并重定向到登录页面
        const currentPage = window.location.pathname;
        if (currentPage.endsWith('Shopping_Cart.html')) {
            alert('Please login first');
            window.location.href = 'login.html';
        }
    }
}