document.addEventListener('DOMContentLoaded', () => {
  // Multi-step form handling
  const registrationForm = document.getElementById('registrationForm');
  
  if (registrationForm) {
    const formSteps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step');
    
    // Setup next buttons
    const nextButtons = document.querySelectorAll('.btn-next');
    nextButtons.forEach(button => {
      button.addEventListener('click', () => {
        const currentStep = parseInt(button.closest('.form-step').dataset.step);
        const nextStep = parseInt(button.dataset.nextStep);
        
        if (validateStep(currentStep)) {
          goToStep(nextStep);
        }
      });
    });
    
    // Setup back buttons
    const backButtons = document.querySelectorAll('.btn-back');
    backButtons.forEach(button => {
      button.addEventListener('click', () => {
        const prevStep = parseInt(button.dataset.prevStep);
        goToStep(prevStep);
      });
    });
    
    // Step validation function
    function validateStep(stepNumber) {
      const step = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
      const requiredFields = step.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        // Reset previous validation state
        field.classList.remove('invalid');
        
        if (!field.value) {
          field.classList.add('invalid');
          isValid = false;
          
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
          
          // Add error message if it doesn't exist
          const errorMsgExists = field.nextElementSibling && field.nextElementSibling.classList.contains('invalid-feedback');
          if (!errorMsgExists) {
            const errorMsg = document.createElement('div');
            errorMsg.classList.add('invalid-feedback');
            errorMsg.textContent = 'Ky fushë është e detyrueshme.';
            field.parentNode.insertBefore(errorMsg, field.nextSibling);
          }
        }
      });
      
      // For password confirmation validation in step 1
      if (stepNumber === 1) {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
          confirmPassword.classList.add('invalid');
          isValid = false;
          
          const errorMsgExists = confirmPassword.nextElementSibling && confirmPassword.nextElementSibling.classList.contains('invalid-feedback');
          if (!errorMsgExists) {
            const errorMsg = document.createElement('div');
            errorMsg.classList.add('invalid-feedback');
            errorMsg.textContent = 'Fjalëkalimet nuk përputhen.';
            confirmPassword.parentNode.insertBefore(errorMsg, confirmPassword.nextSibling);
          } else {
            confirmPassword.nextElementSibling.textContent = 'Fjalëkalimet nuk përputhen.';
          }
        }
      }
      
      return isValid;
    }
    
    // Function to change steps
    function goToStep(stepNumber) {
      // Hide all steps
      formSteps.forEach(step => {
        step.style.display = 'none';
      });
      
      // Show the target step
      const targetStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
      if (targetStep) {
        targetStep.style.display = 'block';
      }
      
      // Update step indicators
      stepIndicators.forEach(indicator => {
        const indicatorStep = parseInt(indicator.dataset.step);
        if (indicatorStep < stepNumber) {
          indicator.classList.add('completed');
          indicator.classList.remove('active');
        } else if (indicatorStep === stepNumber) {
          indicator.classList.add('active');
          indicator.classList.remove('completed');
        } else {
          indicator.classList.remove('active', 'completed');
        }
      });
      
      // Scroll to top of form
      targetStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Form submission
    registrationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (validateStep(3)) {
        // Simple registration success message (in real app, this would submit to server)
        const authContent = document.querySelector('.auth-content');
        authContent.innerHTML = `
          <div class="success-message" style="text-align: center; padding: var(--space-6) 0;">
            <div style="font-size: 48px; color: var(--color-success); margin-bottom: var(--space-4);">✓</div>
            <h2 style="color: var(--color-success); margin-bottom: var(--space-4);">Regjistrimi me sukses!</h2>
            <p style="margin-bottom: var(--space-6);">Faleminderit për regjistrimin në platformën tonë. Ju keni krijuar një llogari të re dhe mund të filloni menjëherë eksplorimin e mundësive akademike.</p>
            <a href="profil.html" class="btn btn-primary">Vazhdo në profil</a>
          </div>
        `;
      }
    });
    
    // Add completed style for step indicators
    const style = document.createElement('style');
    style.textContent = `
      .step.completed .step-number {
        background-color: var(--color-success);
        color: white;
      }
      
      .step.completed .step-text {
        color: var(--color-success);
      }
    `;
    document.head.appendChild(style);
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