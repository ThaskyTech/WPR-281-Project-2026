Sign In JavaScript:

----

document.addEventListener('DOMContentLoaded', () => { ... });

Wrapping the code in a DOMContentLoaded via an EventListener enables the JavaScript to wait for the HTML to finish loading before executing the code.

----

const loginForm = document.getElementById('form-login');

We're making a new variable called loginForm that gets the content it needs from the ID in the HTML

----

loginForm.addEventListener('submit', function(e)) 

With the variable we created we make a event listener method that allows input of 'submit'; the submit button on the sign in, then it calls the anonymos function (e "event")

---- 

e.preventDefault();

Inside the function, this code prevents the page from reloading; allowing us to get it directly from the clients side

----

const username = document.getElementById('admin-username').value.trim();
const password = document.getElementById('admin-password').value.trim();

We're making variables called username and password which we get by the element id from the admin password and username. The value.trim() is that we extract the users input.

----

if (username === 'admin' && password === '1234') 
{
  localStorage.setItem('adminLoggedIn', 'true');
            
  window.location.href = 'dashboard.html';
} 

IF the username is admin and password is 1234, we set the value of the storageitem to true, allowing us to see that the user is logged in across all pages, the window.location allows us to set the page link to dashboard html, meaning that after sign in we directly goes to the dashboard html

else 
{
  alert('Invalid credentials. Please use "admin" for both username and password.');
  loginForm.reset();
}

ELSE we give an alert that its wrong and then it does a form reset allowing use.

----

dashboard.js

----

document.addEventListener('DOMContentLoaded', () => )

Prevents the javascript to run before the HTML as an Event function

----

function populateAssigneeFilter() 
    {
        const assigneeFilter = document.getElementById('filter-assignee');
        const people = StorageService.getPeople();
    }

This function is the filter function, we start by making const variables that we get the user input from the HTML as an ID. And the people const variable from the storage.

----

assigneeFilter.innerHTML = '<option value="all">All People</option>'; 

It resets the filter to All People with the .innerHTML

----

people.forEach(person => 
        {
            assigneeFilter.innerHTML += `<option value="${person.ID}">${person.Username}</option>`;
        });

With the forEach loop, we go through all the users in people

----

function renderBoard() 
    {
        const colOpen = document.getElementById('col-open');
        const colOverdue = document.getElementById('col-overdue');
        const colResolved = document.getElementById('col-resolved');
    }

With this function we make variables for the columns we're getting from the ID's in the HTML

----

colOpen.innerHTML = '<h3>Open</h3>';
colOverdue.innerHTML = '<h3>Overdue</h3>';
colResolved.innerHTML = '<h3>Resolved</h3>';

This clears the columns but keeps the headers

----

let bugs = StorageService.getBugs();

We're making a variable called bugs that gets all the bugs from the storage

----

const textSearch = document.getElementById('filter-text').value.toLowerCase();
const assigneeSearch = document.getElementById('filter-assignee').value;
const prioritySearch = document.getElementById('filter-priority').value;

We're making the variables of the search filer, which we're getting from the HTML by their IDs as the user Inputs

----

bugs = bugs.filter(bug => 
        {
            const matchesText = bug.Summary.toLowerCase().includes(textSearch) || bug.Description.toLowerCase().includes(textSearch);
            const matchesAssignee = assigneeSearch === 'all' || bug.PersonID === assigneeSearch;
            const matchesPriority = prioritySearch === 'all' || bug.Priority.toLowerCase() === prioritySearch;
            
            return matchesText && matchesAssignee && matchesPriority;
        });

For the bugs we're making a filter function; in the filter function we're making variables. matchesText is the variable that 
checks the search bar for the literal matching, which puts everything to a lowerCase

The matchesAssignee and matchesPriority checks if the filter system is in ALL or if the dropdown is on a certain filter

The return in the function is when all the varialbes are true.

----

bugs.forEach(bug => 
        {
            const status = StorageService.getDisplayStatus(bug).toLowerCase();
            
            const person = StorageService.getPersonByID(bug.PersonID);
            const assigneeName = person ? person.Username : 'Unassigned';

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

