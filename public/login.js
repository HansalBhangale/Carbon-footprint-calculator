// Add this code to your client-side JavaScript file (e.g., login_page_js.js)
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Make an AJAX request to your server's login endpoint
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Login successful') {
          // Redirect to the specified URL on successful login
          window.location.href = data.redirectUrl;
        } else {
          // Handle login failure here (e.g., display an error message)
          console.error('Login failed:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
  