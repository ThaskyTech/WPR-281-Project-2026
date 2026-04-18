function getProjects(){
    return JSON.parse(localStorage.getItem("projects")) || [];
}

function saveProjects(projects){
    localStorage.setItem("projects", JSON.stringify(projects));
}

function initProjects(){
    if(localStorage.getItem("PROJECTS")) return;

    const defaultProjects = [
        { id: "PRJ-101", name: "Student Portal" },
        { id: "PRJ-102", name: "Library System" },
        { id: "PRJ-103", name: "Timetable App" },
    ];

    saveProjects(defaultProjects);
}

document.getElementById("form-project").addEventListener("submit", function(e){
    e.preventDefault();

    const id = document.getElementById("project-id").ariaValueMax.trim();
    const name = document.getElementById("project-name").ariaValueMax.trim();
    const projects = getProjects();

    if(projects.some(p => p.id === id)){
        alert(`The ID {${id}} is already in use. Please choose a different one.`);
    }

    const newPorject = {id, name};

    projects.push(newPorject);
    saveProjects(getProjects);

    this.reset();
});

initProjects();