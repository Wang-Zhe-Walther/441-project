//StUdEnt Name: Walther Wang Zhe
document.addEventListener('DOMContentLoaded', function() {
    // Initialization: Bind an event listener

    initializeEventListeners();
});

function initializeEventListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });

    document.getElementById('checkout').addEventListener('click', updateTotalDisplay);

    document.querySelectorAll('.cart-remove').forEach(removeButton => {
        removeButton.addEventListener('click', removeFromCart);
    });

    document.getElementById('clear-cart').addEventListener('click', clearCart);
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
    updateTotal(); //Make sure the total price is up to date

    alert("Checkout process would start here with total: $" + document.querySelector('#total-value').textContent);
}