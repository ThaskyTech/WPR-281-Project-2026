document.addEventListener('DOMContentLoaded', () => // This page is linked to all the other HTML pages
{
    // 1. Check the local storage to see if the user successfully logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    
    // 2. Figure out if we are currently looking at the sign_in.html page
    const isSignInPage = window.location.href.includes('sign_in.html');

    // BOUNCER LOGIC:
    // If they are NOT logged in, and they try to look at the dashboard/tickets/people, kick them to login
    if (!isLoggedIn && !isSignInPage) 
    {
        window.location.href = 'sign_in.html';
        return; // Stop running any more code
    }

    // If they ARE logged in, push them to the dashboard
    if (isLoggedIn && isSignInPage) 
    {
        window.location.href = 'dashboard.html';
        return;
    }

    // UI LOGIC:
    // If they are logged in and looking at the main page, change the top right corner
    if (isLoggedIn && !isSignInPage) 
    {
        const profileDiv = document.querySelector('.admin-profile');
        
        if (profileDiv) 
        {
            // Replace the "Sign-In" link with a Log Out button
            profileDiv.innerHTML = `
                <span style="color: white; margin-right: 15px; font-weight: 500;">Admin User</span>
                <a href="#" id="btn-logout" class="nav-link" style="display: inline-block; background-color: #e74c3c; border-color: #e74c3c;">Log Out</a>
            `;

            // Make the Log Out button actually work
            document.getElementById('btn-logout').addEventListener('click', (e) => 
            {
                e.preventDefault(); /* Stop the link from jumping to the top of the page 
                (since href === #, it would act as the user being directed to the top of the current page, this default stops it)*/ 
                
                // Delete the login key from memory
                localStorage.removeItem('adminLoggedIn'); 
                
                // Send them back to the login screen
                window.location.href = 'sign_in.html';
            });
        }
    }
});