document.getElementById('loginForm').addEventListener('submit', function(event) {
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
});