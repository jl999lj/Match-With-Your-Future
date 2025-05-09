document.addEventListener('DOMContentLoaded', () => {
    // Form submission handler
    const personalInfoForm = document.getElementById('personalInfoForm');
    if (personalInfoForm) {
        personalInfoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Changes saved successfully!');
        });
    }

    // Add badge click handler
    const addBadges = document.querySelectorAll('.badge.add');
    addBadges.forEach(badge => {
        badge.addEventListener('click', () => {
            const newInterest = prompt('Enter new interest:');
            if (newInterest) {
                const newBadge = document.createElement('span');
                newBadge.className = 'badge';
                newBadge.textContent = newInterest;
                badge.parentElement.insertBefore(newBadge, badge);
            }
        });
    });

    // Reset button handler
    const resetBtn = document.querySelector('.reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset your profile?')) {
                alert('Profile has been reset!');
            }
        });
    }

    // Continue tests button handler
    const continueBtn = document.querySelector('.continue-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            window.location.href = 'challenges.html';
        });
    }

    // Ensure the navbar is consistent with challenges page
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
        });
    });

    // Set the active link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Apply styling to profile header to match challenges page
    const profileHeader = document.querySelector('.profile-header');
    if (profileHeader) {
        // Ensure the dark blue background color is applied
        profileHeader.style.backgroundColor = '#1a1e3b';
    }

    // Apply styling to profile navigation
    const profileNav = document.querySelector('.profile-nav');
    if (profileNav) {
        profileNav.style.backgroundColor = '#ffffff';
    }

    // Make sure the profile avatar has the correct gradient
    const profileAvatar = document.querySelector('.profile-avatar');
    if (profileAvatar) {
        profileAvatar.style.background = 'linear-gradient(45deg, #4b40db, #32d1c2)';
    }

    // Apply styling to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.style.backgroundColor = '#3b365f';
        card.style.border = '2px solid #2b2c6c';
    });
});
