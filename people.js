document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form-person");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const username = document.getElementById("person-username").value.trim();
        const name = document.getElementById("person-name").value.trim();
        const surname = document.getElementById("person-surname").value.trim();
        const email = document.getElementById("person-email").value.trim();
        let profilePic = document.getElementById("person-pic") ? document.getElementById("person-pic").value.trim() : "";
        
        const people = StorageService.getPeople();

        // Prevent duplicate usernames
        if(people.some(p => p.Username === username)){
            alert(`The username ${username} is already taken. Please choose another!`);
            return;
        }

        // Generate a new numeric ID so it matches the dashboard data
        const newId = people.length > 0 ? Math.max(...people.map(p => p.ID)) + 1 : 1;

        // Use the object from storage.js
        let newPerson = new personObj(
            newId, 
            name, 
            surname, 
            email, 
            username, 
            profilePic || `https://api.dicebear.com/7.x/thumbs/svg?seed=${username}`
        );

        StorageService.savePerson(newPerson);
        
        alert("Person saved successfully!");
        form.reset();
        window.location.href = "dashboard.html";
    });
});