document.addEventListener('DOMContentLoaded', () => 
{

    // 1. Populate the assignee filter
    function populateAssigneeFilter() 
    {
        const assigneeFilter = document.getElementById('filter-assignee');
        const people = StorageService.getPeople();
        
        // Reset to default first
        assigneeFilter.innerHTML = '<option value="all">All People</option>'; 
        
        // Add real people from storage
        people.forEach(person => 
        {
            assigneeFilter.innerHTML += `<option value="${person.ID}">${person.Username}</option>`;
        });
    }

    // 2. THE MAIN RENDER FUNCTION (Draws the board and handles filters)
    function renderBoard() 
    {
        const colOpen = document.getElementById('col-open');
        const colOverdue = document.getElementById('col-overdue');
        const colResolved = document.getElementById('col-resolved');

        // Clear the columns (but keep the headers)
        colOpen.innerHTML = '<h3>Open</h3>';
        colOverdue.innerHTML = '<h3>Overdue</h3>';
        colResolved.innerHTML = '<h3>Resolved</h3>';

        // Get all bugs from storage
        let bugs = StorageService.getBugs();

        // Filters 
        const textSearch = document.getElementById('filter-text').value.toLowerCase();
        const assigneeSearch = document.getElementById('filter-assignee').value;
        const prioritySearch = document.getElementById('filter-priority').value;

        bugs = bugs.filter(bug => 
        {
            const matchesText = bug.Summary.toLowerCase().includes(textSearch) || bug.Description.toLowerCase().includes(textSearch);
            const matchesAssignee = assigneeSearch === 'all' || bug.PersonID === assigneeSearch;
            const matchesPriority = prioritySearch === 'all' || bug.Priority.toLowerCase() === prioritySearch;
            
            return matchesText && matchesAssignee && matchesPriority;
        });

        // Building and sorting cards
        bugs.forEach(bug => 
        {
            // Figure out which column it belongs in
            const status = StorageService.getDisplayStatus(bug).toLowerCase();
            
            // Get the person's name (or show Unassigned)
            const person = StorageService.getPersonByID(bug.PersonID);
            const assigneeName = person ? person.Username : 'Unassigned';

            // Build the exact HTML for the card
            const cardHTML = `
                <article class="ticket-card priority-${bug.Priority.toLowerCase()}">
                    <header>
                        <h4>${bug.Summary}</h4>
                        <span class="badge">${bug.Priority}</span>
                    </header>
                    <p>Project: ${bug.ProjectID}</p>
                    <footer>
                        <small>Assigned to: ${assigneeName}</small>
                        <button class="btn-view-details" data-id="${bug.ID}">View Details</button>
                    </footer>
                </article>
            `;

            // Append it to the correct column
            if (status === 'resolved') 
            {
                colResolved.innerHTML += cardHTML;
            } 
            else if (status === 'overdue') 
            {
                colOverdue.innerHTML += cardHTML;
            } 
            else 
            {
                colOpen.innerHTML += cardHTML;
            }
        });

        // Add "Empty State" messages if a column has no cards
        if (colOpen.children.length === 1) colOpen.innerHTML += '<p style="color: #666; font-size: 0.9rem; text-align: center;">No open issues</p>';
        if (colOverdue.children.length === 1) colOverdue.innerHTML += '<p style="color: #666; font-size: 0.9rem; text-align: center;">No overdue issues</p>';
        if (colResolved.children.length === 1) colResolved.innerHTML += '<p style="color: #666; font-size: 0.9rem; text-align: center;">No resolved issues</p>';

        // Attach clicks to the new "View Details" buttons
        attachModalListeners();
    }

    // 3. MODAL LOGIC (View Details)
    function attachModalListeners() 
    {
        const modal = document.getElementById('modal-issue-details');
        const modalContent = document.getElementById('modal-content');
        const btnEditIssue = document.getElementById('btn-edit-issue');

        document.querySelectorAll('.btn-view-details').forEach(button => 
        {
            button.addEventListener('click', (e) => 
            {
                const bugID = e.target.getAttribute('data-id');
                const bug = StorageService.getBugByID(bugID);
                const person = StorageService.getPersonByID(bug.PersonID);
                
                // Inject the specific ticket's details into the modal
                modalContent.innerHTML = `
                    <p><strong>Description:</strong> ${bug.Description}</p>
                    <p><strong>Status:</strong> ${bug.Status} | <strong>Priority:</strong> ${bug.Priority}</p>
                    <p><strong>Assigned To:</strong> ${person ? person.Name + ' ' + person.Surname : 'Unassigned'}</p>
                    <p><strong>Date Identified:</strong> ${bug.DateCreated}</p>
                    <p><strong>Target Resolution:</strong> ${bug.TargetResolutionDate || 'Not set'}</p>
                    <hr style="margin: 1rem 0; border: 0; border-top: 1px solid #eee;">
                    <p><strong>Resolution Summary:</strong> ${bug.ResolutionSummary || 'Not resolved yet.'}</p>
                `;
                
                // Set the link on the Edit button to pass the ID to the ticket page
                btnEditIssue.href = `ticket.html?id=${bug.ID}`;
                
                modal.showModal();
            });
        });

        // Close modal button
        document.getElementById('btn-close-modal').onclick = () => modal.close();
    }

    // 4. WIRE UP THE FILTERS TO TRIGGER RE-RENDERS
    document.getElementById('filter-text').addEventListener('input', renderBoard);
    document.getElementById('filter-assignee').addEventListener('change', renderBoard);
    document.getElementById('filter-priority').addEventListener('change', renderBoard);
    
    document.getElementById('btn-clear-filters').addEventListener('click', () => 
    {
        document.getElementById('filter-text').value = '';
        document.getElementById('filter-assignee').value = 'all';
        document.getElementById('filter-priority').value = 'all';
        renderBoard(); // Re-draw board without filters
    });

    // 5. INITIALIZE THE PAGE
    populateAssigneeFilter();
    renderBoard();
});