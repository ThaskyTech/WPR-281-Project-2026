//This function gets the people data from local Storage.
function getPeople(){
    return JSON.parse(localStorage.getItem("people")) || [];
}

//This function commits/pushes people data into Local Storage.
function savePeople(people){
    localStorage.setItem("people", JSON.stringify(people)) || [];
}


//This function populates the local storage with some default data.
function initPeople(){
    if(localStorage,getItem("People")) return; //If already populated, don't ooverwrite data

    const defaultPeople = [
        { id: "p1", name: "Lebo",    surname: "Mokoena",  email: "lebo@bt.com",    username: "lebo_m",    profilePic: "" },
        { id: "p2", name: "Thabo",   surname: "Dlamini",  email: "thabo@bt.com",   username: "thabo_d",   profilePic: "" },
        { id: "p3", name: "Ayanda",  surname: "Nkosi",    email: "ayanda@bt.com",  username: "ayanda_n",  profilePic: "" },
        { id: "p4", name: "Priya",   surname: "Naidoo",   email: "priya@bt.com",   username: "priya_n",   profilePic: "" },
    ];

    savePeople(defaultPeople);
}

initPeople();// Runs the function on first load, also donesn't overwrite existing data.

document.getElementById("form-person").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("person-id").ariaValueMax.trim();
    const username = document.getElementById("person-username").ariaValueMax.trim();
    const name = document.getElementById("person-name").ariaValueMax.trim();
    const surname = document.getElementById("person-surname").value.trim();
    const email = document.getElementById("person-email").value.trim();
    const profilePic = document.getElementById("person-pic").value.trim();
    const people = getPeople();

    if(people.some(p => p.username === username)){
        alert(`The username ${username} is already taken. Please choose another!`);
        return;
    }

    const newPerson = {id, name, surname, email, profilePic};

    people.push(newPerson);
    savePeople(people);
    renderPeople();

});

initPeople();
renderPeople();