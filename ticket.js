document.addEventListener('DOMContentLoaded', () => {

    let form = document.getElementById("form-issue");

    form.addEventListener("submit", function(event){
        event.preventDefault(); // Stop the silent page reload!

        let summary = document.getElementById("issue-summary").value;
        let detailedDescription = document.getElementById("issue-desc").value;

        // IDs parsed as numbers to match the database
        let relatedProject = parseInt(document.getElementById("issue-project").value);
        let assignee = parseInt(document.getElementById("issue-assignee").value);

        let priority = document.getElementById("issue-priority").value;
        let status = document.getElementById("issue-status").value;
        let reporter = document.getElementById("issue-reporter").value;
        let dateIdentified = document.getElementById("issue-date-identified").value;
        let targetResolutionDate = document.getElementById("issue-date-target").value;
        let resolutionDate = document.getElementById("issue-date-actual").value;
        let resolutionSummary = document.getElementById("issue-resolution-summary").value;

        // Validation
        if (summary ===  "" || detailedDescription === "" || isNaN(relatedProject) || reporter === "" || dateIdentified === "") {
            alert("Please complete all required fields. Ensure a valid Project is selected.");
            return;
        }

        let ticket = new bugObj(
            null,
            summary,
            detailedDescription,
            priority,
            status,
            relatedProject,
            assignee,
            dateIdentified,
            targetResolutionDate,
            resolutionDate,
            resolutionSummary
        );

        StorageService.saveBug(ticket);

        alert("Ticket saved successfully!");
        form.reset();

        // Redirect to dashboard
        window.location.href = "dashboard.html";
    });

});