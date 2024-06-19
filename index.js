document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const actionMessageElement = document.createElement('p');
    loginForm.appendChild(actionMessageElement);

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Read user data from cookie
        const cookies = document.cookie.split(';');
        let userDetails = null;
        cookies.forEach(cookie => {
            const cookiePair = cookie.trim().split('=');
            if (cookiePair[0] === 'userDetails') {
                try {
                    userDetails = JSON.parse(decodeURIComponent(cookiePair[1]));
                } catch(e) {
                    console.error("Error parsing cookie:", e);
                }
            }
        });

        // Validate against cookie data if available
        if (userDetails && userDetails.username === username && userDetails.password === password) {
            alert('Login successful!');
            window.location.href = 'home.html';
        } else {
            actionMessageElement.textContent = "Invalid username or password.";
            actionMessageElement.style.color = 'red';
        }
    });
});
