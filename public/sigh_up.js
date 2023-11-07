// Add this code to your client-side JavaScript file (e.g., signup_page_js.js)
document.getElementById('sigh_up-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Make an AJAX request to your server's sign-up endpoint
    fetch('/sighup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'User signed up successfully') {
          // Redirect to the specified URL on successful sign-up
          window.location.href = data.redirectUrl;
        } else {
          // Handle sign-up failure here (e.g., display an error message)
          console.error('Sign-up failed:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
  