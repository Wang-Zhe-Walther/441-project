document.getElementById('loginForm').addEventListener('submit', function(event) {  
  event.preventDefault(); // Prevent form submission  

  let username = document.getElementById('username').value;  
  let password = document.getElementById('password').value;  

  let storedUsername = localStorage.getItem("username");
  let storedPassword = localStorage.getItem("password");

  if (username === storedUsername && password === storedPassword) {  
      // Login successful, redirect to cart page  
      window.location.href = 'home.html'; // Redirect to cart page
  } else {  
      // Login failed, show an alert  
      alert('Invalid username or password. Please try again.');  
  }  
});
