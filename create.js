//StUdEnt Name: Walther Wang Zhe
document.getElementById('registerForm').addEventListener('submit', function(event) {  
  event.preventDefault(); // Prevent form submission  

  let username = document.getElementById('username').value;  
  let password = document.getElementById('password').value;  

  localStorage.setItem("username", username);
  localStorage.setItem("password", password);

  console.log("Stored user name:" + localStorage.getItem("username"));
  console.log("Stored password:" + localStorage.getItem("password"));
  
  alert('Registration successful! Please log in.');
  window.location.href = 'index.html'; // Redirect to login page after registration
});
