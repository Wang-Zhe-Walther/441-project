document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const actionMessageElement = document.createElement('p'); // Create a new element to show messages

    // Append the message element to the form for displaying login status
    loginForm.appendChild(actionMessageElement);

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // For demonstration purposes, let's assume correct credentials
        const correctUsername = 'exampleUser';
        const correctPassword = 'examplePass';

        if (username === correctUsername && password === correctPassword) {
            alert('Login successful!');
            window.location.href = 'home.html'; // Change to home.html upon success
        } else {
            actionMessageElement.textContent = "Invalid username or password.";
            actionMessageElement.style.color = 'red'; // Style for error message
        }
    });
});