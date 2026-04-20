function projectObj(id, name) {
    this.ID = id;
    this.Name = name;
}

function personObj(id, name, surname, email, username, avatar) {
    this.ID = id;
    this.Name = name;
    this.Surname = surname;
    this.Email = email;
    this.Username = username;
    this.Avatar = avatar;
}

function bugObj(id, summary, description, priority, status, projectID, personID, dateCreated, targetResolutionDate, resolutionDate, resolutionSummary) {
    this.ID = id;
    this.Summary = summary;
    this.Description = description;
    this.Priority = priority;
    this.Status = status;
    this.ProjectID = projectID;
    this.PersonID = personID;
    this.DateCreated = dateCreated;
    this.TargetResolutionDate = targetResolutionDate;
    this.resolutionDate = resolutionDate;
    this.ResolutionSummary = resolutionSummary;
}

const STORAGE_KEYS = {
    PROJECTS: 'bug_tracker_projects',
    PEOPLE: 'bug_tracker_people',
    BUGS: 'bug_tracker_bugs'
}

const StorageService = {
    _save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Error saving to ${key}:`, error);
            return false;
        }
    },

    _load(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error(`Error loading from ${key}:`, error);
            return [];
        }
    },

    getProjects: () => StorageService._load(STORAGE_KEYS.PROJECTS),

    saveProjects: (project) => {
        let projects = StorageService.getProjects();
        const index = projects.findIndex(p => p.ID === project.ID);
        if (index === -1) {
            project.ID = project.ID || projects.length;
            projects.push(project);// Add new project
        } else {
            projects[index] = project;// Update exisiting object
        }
        return StorageService._save(STORAGE_KEYS.PROJECTS, projects);
    },

    deleteProject(projectId) {
        const projects = StorageService.getProjects().filter(p => p.ID !== projectId);
        return StorageService._save(STORAGE_KEYS.PROJECTS, projects);
    },

    getPeople: () => StorageService._load(STORAGE_KEYS.PEOPLE),

    savePerson: (person) => {
        let people = StorageService.getPeople();
        const index = people.findIndex(p => p.ID === person.ID);
        if (index === -1) {
            person.ID = person.ID || people.length;
            people.push(person);
        } else {
            people[index] = person;
        }
        return StorageService._save(STORAGE_KEYS.PEOPLE, people);
    },

    getPersonByID(personID) {
        const people = StorageService.getPeople();
        return people.find(p => p.ID === personID);
    },

    getBugs: () => StorageService._load(STORAGE_KEYS.BUGS),

    saveBug: (bug) => {
        let bugs = StorageService.getBugs();
        const index = bugs.findIndex(b => b.ID === bug.ID);
        if (index === -1) {
            bug.ID = bug.ID || bugs.length;
            bug.DateCreated = bug.DateCreated || new Date().toISOString();
            bugs.push(bug);
        } else {
            bugs[index] = bug;
        }
        return StorageService._save(STORAGE_KEYS.BUGS, bugs);
    },

    deleteBug(bugID) {
        const bugs = StorageService.getBugs().filter(b => b.ID !== bugID);
        return StorageService._save(STORAGE_KEYS.BUGS, bugs);
    },

    getBugByID(bugID) {
        const bugs = StorageService.getBugs();
        return bugs.find(b => b.ID === bugID) || null;
    },

    getBugsByProject(projectId) {
        const bugs = StorageService.getBugs();
        return bugs.filter(b => b.ProjectID === projectId);
    },

    getBugsByPerson(personId) {
        const bugs = StorageService.getBugs();
        return bugs.filter(b => b.PersonID === personId);
    },

    getDisplayStatus: (bug) => {
        if (bug.Status === 'resolved') {
            return 'Resolved';
        }
        const now = new Date();
        const target = new Date(bug.TargetResolutionDate);
        if (now > target) {
            return 'Overdue';
        }
        return 'Open'
    },

    isAvailable() {//Checks if localStorage is working
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }
};

let people = [
    {
        "ID": 1, "Name": "Alice", "Surname": "Mokoena", "Email": "alice.mokoena@devteam.co.za", "Username": "amokoena", "Avatar": "https://api.dicebear.com/7.x/thumbs/svg?seed=amokoena"
    },
    {
        "ID": 2, "Name": "Brendan", "Surname": "Nkosi", "Email": "brendan.nkosi@devteam.co.za", "Username": "bnkosi", "Avatar": "https://api.dicebear.com/7.x/thumbs/svg?seed=bnkosi"
    },
    {
        "ID": 3, "Name": "Chloe", "Surname": "Van der Berg", "Email": "chloe.vdberg@devteam.co.za", "Username": "cvdberg", "Avatar": "https://api.dicebear.com/7.x/thumbs/svg?seed=cvdberg"
    },
    {
        "ID": 4, "Name": "David", "Surname": "Dlamini", "Email": "david.dlamini@devteam.co.za", "Username": "ddlamini", "Avatar": "https://api.dicebear.com/7.x/thumbs/svg?seed=ddlamini"
    }
];
StorageService._save(STORAGE_KEYS.PEOPLE, people);

let projects = [
    { "ID": 1, "Name": "Customer Portal" },
    { "ID": 2, "Name": "Mobile App" },
    { "ID": 3, "Name": "Admin Dashboard" },
    { "ID": 4, "Name": "Payment Gateway" }
];
StorageService._save(STORAGE_KEYS.PROJECTS, projects);

let bugs = [
    {
        "ID": 1,
        "Summary": "Login button unresponsive on Safari",
        "Description": "Users on Safari 16+ report that clicking the login button does nothing. The click event appears to fire but the form submission is blocked. Reproducible on macOS Ventura.",
        "Priority": "high",
        "Status": "resolved",
        "ProjectID": 1,
        "PersonID": 1,
        "DateCreated": "2025-02-10T08:30:00.000Z",
        "TargetResolutionDate": "2025-02-20T00:00:00.000Z",
        "ResolutionDate": "2025-02-18T14:00:00.000Z",
        "ResolutionSummary": "Fixed a preventDefault call that was swallowing the submit event in Safari due to a browser-specific event bubbling quirk."
    },
    {
        "ID": 2,
        "Summary": "Dashboard charts not rendering on mobile",
        "Description": "The analytics charts on the admin dashboard are blank on screens below 768px wide. The chart library renders a 0x0 canvas element. Affects iOS and Android Chrome.",
        "Priority": "high",
        "Status": "open",
        "ProjectID": 3,
        "PersonID": 2,
        "DateCreated": "2025-03-01T09:00:00.000Z",
        "TargetResolutionDate": "2026-05-01T00:00:00.000Z",
        "ResolutionDate": null,
        "ResolutionSummary": null
    },
    {
        "ID": 3,
        "Summary": "Password reset email not sending",
        "Description": "Users who request a password reset never receive the email. The server logs show the email job is queued but the SMTP service returns a 550 error. Only affects accounts created after the March migration.",
        "Priority": "high",
        "Status": "overdue",
        "ProjectID": 1,
        "PersonID": 3,
        "DateCreated": "2025-03-15T11:00:00.000Z",
        "TargetResolutionDate": "2025-03-25T00:00:00.000Z",
        "ResolutionDate": null,
        "ResolutionSummary": null
    },
    {
        "ID": 4,
        "Summary": "App crashes on Android 12 when uploading profile photo",
        "Description": "Selecting a photo from the gallery on Android 12 devices causes the app to crash immediately. The crash log points to a null pointer exception in the image compression module.",
        "Priority": "high",
        "Status": "open",
        "ProjectID": 2,
        "PersonID": 4,
        "DateCreated": "2025-03-20T07:45:00.000Z",
        "TargetResolutionDate": "2026-04-30T00:00:00.000Z",
        "ResolutionDate": null,
        "ResolutionSummary": null
    },
    {
        "ID": 5,
        "Summary": "Payment total rounds incorrectly for split orders",
        "Description": "When an order is split across two payment methods, the final total is sometimes off by R0.01 due to floating-point rounding. Affects roughly 3% of split transactions.",
        "Priority": "medium",
        "Status": "overdue",
        "ProjectID": 4,
        "PersonID": 1,
        "DateCreated": "2025-01-05T10:00:00.000Z",
        "TargetResolutionDate": "2025-02-01T00:00:00.000Z",
        "ResolutionDate": null,
        "ResolutionSummary": null
    },
    {
        "ID": 6,
        "Summary": "User profile page loads slowly",
        "Description": "The profile page takes 6–9 seconds to load. Profiling shows multiple unoptimised SQL queries running sequentially instead of in parallel. Affects all users with more than 50 past orders.",
        "Priority": "medium",
        "Status": "resolved",
        "ProjectID": 1,
        "PersonID": 2,
        "DateCreated": "2025-02-20T13:00:00.000Z",
        "TargetResolutionDate": "2025-03-10T00:00:00.000Z",
        "ResolutionDate": "2025-03-08T16:30:00.000Z",
        "ResolutionSummary": "Refactored the profile data fetching to use a single JOIN query and added an index on the user_orders table. Load time reduced to under 1 second."
    },
    {
        "ID": 7,
        "Summary": "Search filter resets when navigating back",
        "Description": "If a user applies filters in the product search and then clicks into a product detail page, pressing the browser back button clears all previously applied filters and resets the search results.",
        "Priority": "medium",
        "Status": "open",
        "ProjectID": 1,
        "PersonID": 3,
        "DateCreated": "2025-03-22T09:15:00.000Z",
        "TargetResolutionDate": "2026-05-15T00:00:00.000Z",
        "ResolutionDate": null,
        "ResolutionSummary": null
    },
    {
        "ID": 8,
        "Summary": "Dark mode toggle state not persisted",
        "Description": "When the user enables dark mode and then closes and reopens the app, the theme reverts to light mode. The preference does not appear to be saved to local storage correctly.",
        "Priority": "low",
        "Status": "resolved",
        "ProjectID": 2,
        "PersonID": 4,
        "DateCreated": "2025-01-28T14:00:00.000Z",
        "TargetResolutionDate": "2025-02-15T00:00:00.000Z",
        "ResolutionDate": "2025-02-12T10:00:00.000Z",
        "ResolutionSummary": "The key used to save the theme preference had a typo. Corrected the key name and added a migration to update existing stored values."
    },
    {
        "ID": 9,
        "Summary": "Export to CSV includes hidden columns",
        "Description": "When a user exports the transactions table to CSV, columns that have been hidden via the column visibility toggle are still present in the exported file. Expected behaviour is to export only visible columns.",
        "Priority": "low",
        "Status": "open",
        "ProjectID": 3,
        "PersonID": 1,
        "DateCreated": "2025-03-05T08:00:00.000Z",
        "TargetResolutionDate": "2026-06-01T00:00:00.000Z",
        "ResolutionDate": null,
        "ResolutionSummary": null
    },
    {
        "ID": 10,
        "Summary": "Refund confirmation email uses wrong currency symbol",
        "Description": "Refund confirmation emails display the amount with a $ symbol instead of R for South African Rand. The issue is isolated to the email template; the in-app display is correct.",
        "Priority": "low",
        "Status": "overdue",
        "ProjectID": 4,
        "PersonID": 2,
        "DateCreated": "2025-02-01T12:00:00.000Z",
        "TargetResolutionDate": "2025-02-28T00:00:00.000Z",
        "ResolutionDate": null,
        "ResolutionSummary": null
    },
    {
        "ID": 11,
        "Summary": "Notification badge count not clearing on read",
        "Description": "The notification bell icon retains its unread count badge even after the user opens the notification panel and views all notifications. The badge only clears after a full page refresh.",
        "Priority": "medium",
        "Status": "open",
        "ProjectID": 2,
        "PersonID": 3,
        "DateCreated": "2025-03-18T10:30:00.000Z",
        "TargetResolutionDate": "2026-04-25T00:00:00.000Z",
        "ResolutionDate": null,
        "ResolutionSummary": null
    },
    {
        "ID": 12,
        "Summary": "Admin can delete own account",
        "Description": "The user management screen in the admin dashboard allows an admin to delete their own account, which locks them out of the system entirely. There should be a guard preventing self-deletion.",
        "Priority": "high",
        "Status": "resolved",
        "ProjectID": 3,
        "PersonID": 4,
        "DateCreated": "2025-01-15T09:00:00.000Z",
        "TargetResolutionDate": "2025-01-22T00:00:00.000Z",
        "ResolutionDate": "2025-01-21T11:45:00.000Z",
        "ResolutionSummary": "Added a server-side check that compares the target user ID against the authenticated session user ID. The delete button is also hidden client-side for the logged-in user's own row."
    }
];
StorageService._save(STORAGE_KEYS.BUGS, bugs);

window.StorageService = StorageService;
