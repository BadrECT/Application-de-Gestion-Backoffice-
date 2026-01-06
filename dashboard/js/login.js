/* ==========================================
   USER DATA (Non-Persistent / No Database)
   ========================================== */
const users = [
    {
        id: 1,
        name: "Admin User",
        email: "admin@bibliotech.com",
        password: "admin", // In a real app, hash this!
        role: "admin"
    }
];

/* ==========================================
   LOGIN LOGIC
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('error-msg');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Validate against JSON array
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Success
                errorMsg.classList.remove('visible');

                // Save user session (simple approach)
                localStorage.setItem('currentUser', JSON.stringify(user));

                // Animation delay for effect
                const btn = loginForm.querySelector('.btn-login');
                btn.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon> Succès !';
                btn.style.background = 'var(--success)';

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 300);

            } else {
                // Error
                errorMsg.textContent = "Email ou mot de passe incorrect.";
                errorMsg.classList.add('visible');

                // Shake animation for visual feedback
                loginForm.parentElement.animate([
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(-10px)' },
                    { transform: 'translateX(10px)' },
                    { transform: 'translateX(0)' }
                ], {
                    duration: 300
                });
            }
        });
    }
});
