document.addEventListener('DOMContentLoaded', () => {

    let form = document.getElementById("form-issue");

    form.addEventListener("submit", function(event){ // on clicking the submit we start this function
        event.preventDefault(); // Stop the silent page reload!

        let summary = document.getElementById("issue-summary").value;
        let detailedDescription = document.getElementById("issue-desc").value; // .value goes through every input and extracts it

        // IDs parsed as numbers to match the database
        let relatedProject = parseInt(document.getElementById("issue-project").value); // Parsing the input texts (strings) to a int for the database
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
        } // if the user left projects empty, it would try to parse it to a number. Return stops the ticket from being saved.

        let ticket = new bugObj( // takes all the inputs and places it into an objects
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

        StorageService.saveBug(ticket); // takes the ticket object, gives it to the storageService and saves it.

        alert("Ticket saved successfully!");
        form.reset();

        // Redirect to dashboard
        window.location.href = "dashboard.html";
    });

});