//English name: Walther
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const actionMessageElement = document.getElementById('registrationStatus');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('usernameInput').value;
        const password = document.getElementById('passwordInput').value;

        if(username === "" || password === "") {
            actionMessageElement.textContent = "Username and Password cannot be empty.";
            return;
        }

        // Store username and password in a cookie (note: passwords should not be treated as such)

        const userData = { username: username, password: password };
        const userDataJSON = JSON.stringify(userData);
        document.cookie = `userDetails=${encodeURIComponent(userDataJSON)}; expires=${getCookieExpirationDate()}; path=/;`;

        // Assuming successful storage (here is only an example, there should be more accurate confirmation logic in the actual application)

        alert('User created successfully!');
    });
});

function getCookieExpirationDate(days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    return date.toUTCString();
}