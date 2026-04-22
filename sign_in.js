document.addEventListener('DOMContentLoaded', () => // Same as defer, preventing the crash of the browser
{
    const loginForm = document.getElementById('form-login');

    loginForm.addEventListener('submit', function(e) 
    {
        // Prevent the page from reloading
        e.preventDefault();

        // Get the values the user typed in
        const username = document.getElementById('admin-username').value.trim();
        const password = document.getElementById('admin-password').value.trim();

        // Check admin credentials
        if (username === 'admin' && password === '1234') 
        {
            // Optional: Save a flag in localStorage so the system knows you are logged in
            localStorage.setItem('adminLoggedIn', 'true');
            
            // Redirect to the dashboard
            window.location.href = 'dashboard.html';
        } 
        else 
        {
            // Show an error and clear the form if they get it wrong
            alert('Invalid credentials. Please try again.');
            loginForm.reset();
        }
    });
});