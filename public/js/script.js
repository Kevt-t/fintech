document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded successfully!');
    
    // Navigate to signup page
    const signupButton = document.querySelector('.signup-button');
    if (signupButton) {
      signupButton.addEventListener('click', () => {
        window.location.href = '/signup'; // Redirect to /signup
      });
    }
  
    // Navigate to login page
    const loginButton = document.querySelector('.login-button');
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        window.location.href = '/login'; // Redirect to /login
      });
    }
  });
  