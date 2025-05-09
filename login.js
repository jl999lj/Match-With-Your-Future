document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm) {
    // Login form validation and submission
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      let isValid = true;
      
      // Validate email
      if (!email) {
        markInvalid(document.getElementById('loginEmail'), 'Email është i detyrueshëm.');
        isValid = false;
      } else if (!isValidEmail(email)) {
        markInvalid(document.getElementById('loginEmail'), 'Ju lutem vendosni një email të vlefshëm.');
        isValid = false;
      } else {
        removeInvalid(document.getElementById('loginEmail'));
      }
      
      // Validate password
      if (!password) {
        markInvalid(document.getElementById('loginPassword'), 'Fjalëkalimi është i detyrueshëm.');
        isValid = false;
      } else {
        removeInvalid(document.getElementById('loginPassword'));
      }
      
      if (isValid) {
        // Simulate successful login (in a real app, this would send credentials to server)
        simulateLogin();
      }
    });
    
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    function markInvalid(element, message) {
      element.classList.add('invalid');
      
      // Add validation styles
      if (!document.getElementById('validation-styles')) {
        const style = document.createElement('style');
        style.id = 'validation-styles';
        style.textContent = `
          .form-control.invalid {
            border-color: var(--color-error);
            box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
          }
          
          .form-control.invalid:focus {
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.25);
          }
          
          .invalid-feedback {
            display: block;
            color: var(--color-error);
            font-size: var(--font-size-sm);
            margin-top: var(--space-1);
            animation: fadeIn 0.3s ease;
          }
        `;
        document.head.appendChild(style);
      }
      
      // Check if error message already exists
      let errorMsg = element.nextElementSibling;
      while (errorMsg && !errorMsg.classList.contains('invalid-feedback')) {
        errorMsg = errorMsg.nextElementSibling;
      }
      
      if (!errorMsg) {
        // Create new error message
        errorMsg = document.createElement('div');
        errorMsg.classList.add('invalid-feedback');
        
        // Special handling for password field to place error message after "forgot password" link
        if (element.id === 'loginPassword') {
          const forgotPasswordEl = element.parentNode.querySelector('.forgot-password');
          element.parentNode.insertBefore(errorMsg, forgotPasswordEl.nextSibling);
        } else {
          element.parentNode.insertBefore(errorMsg, element.nextSibling);
        }
      }
      
      errorMsg.textContent = message;
    }
    
    function removeInvalid(element) {
      element.classList.remove('invalid');
      
      // Find and remove error message
      let errorMsg = element.nextElementSibling;
      while (errorMsg && !errorMsg.classList.contains('invalid-feedback')) {
        errorMsg = errorMsg.nextElementSibling;
      }
      
      if (errorMsg && errorMsg.classList.contains('invalid-feedback')) {
        errorMsg.remove();
      }
    }
    
    function simulateLogin() {
      // Show loading state on button
      const submitButton = loginForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="loading-spinner"></span> Duke hyrë...';
      
      // Add spinner style
      const style = document.createElement('style');
      style.textContent = `
        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
          margin-right: 8px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
      
      // Simulate API call delay
      setTimeout(() => {
        // Redirect to dashboard (in a real app)
        window.location.href = '/';
      }, 1500);
    }
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
      button.addEventListener('click', () => {
        const provider = button.classList.contains('google') ? 'Google' : 'Facebook';
        
        // Add loading state
        button.disabled = true;
        const originalText = button.textContent;
        button.innerHTML = `<span class="loading-spinner"></span> Duke hyrë me ${provider}...`;
        
        // Simulate redirect to auth provider
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      });
    });
  }
  
  // Auth tabs (login/register switch)
  const authTabs = document.querySelectorAll('.auth-tab');
  
  if (authTabs.length > 0) {
    authTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        authTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Handle tab switching logic
        const tabName = tab.dataset.tab;
        if (tabName === 'register') {
          window.location.href = '/register.html';
        } else if (tabName === 'login') {
          window.location.href = '/login.html';
        }
      });
    });
  }
});