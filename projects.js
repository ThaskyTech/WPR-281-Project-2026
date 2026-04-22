document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form-project");

    form.addEventListener("submit", function(e){
        e.preventDefault();

        const name = document.getElementById("project-name").value.trim();
        const projects = StorageService.getProjects();
        
        // Generate a new numeric ID
        const newId = projects.length > 0 ? Math.max(...projects.map(p => p.ID)) + 1 : 1;

        // Use the object from storage.js
        let newProject = new projectObj(newId, name);

        StorageService.saveProjects(newProject);

        alert("Project saved successfully!");
        form.reset();
        window.location.href = "dashboard.html";
    });
});