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
        if (bug.status === 'resolved') {
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
    { id: "p1", name: "Lebo", surname: "Mokoena", email: "lebo@bt.com", username: "lebo_m", profilePic: "" },
    { id: "p2", name: "Thabo", surname: "Dlamini", email: "thabo@bt.com", username: "thabo_d", profilePic: "" },
    { id: "p3", name: "Ayanda", surname: "Nkosi", email: "ayanda@bt.com", username: "ayanda_n", profilePic: "" },
    { id: "p4", name: "Priya", surname: "Naidoo", email: "priya@bt.com", username: "priya_n", profilePic: "" }
];
StorageService._save(STORAGE_KEYS.PEOPLE, people);
let projects = [
    { id: "PRJ-101", name: "Student Portal" },
    { id: "PRJ-102", name: "Library System" },
    { id: "PRJ-103", name: "Timetable App" }
];
StorageService._save(STORAGE_KEYS.PROJECTS, projects);
window.StorageService = StorageService;
