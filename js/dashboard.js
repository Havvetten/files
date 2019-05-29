// dashboard.js
// Javascript for the dashboard

// users array
var users = document.getElementsByClassName("users");

// grabbing all the available cards
var cards = document.getElementsByClassName("card");

// makes the elements draggable
for (var i=0; i<users.length; i++) {
    users[i].setAttribute("draggable", true);
}

// creates a list of the users id.
var cardList = [];

// pushing userId into userList

// references to the ID of card and user
var cardId;
var userId;




// putting id's on the users
for(var i =0; i<users.length; i++){
    users[i].addEventListener("dragstart", e => {
        console.log("dragstart", e);
        userId = e.target.id;
    });
}

let newProjectBtn = document.getElementById("btnCreateCard");
let mainElement = document.getElementById("main");

newProjectBtn.addEventListener("click", AddProject);

var projects =[];

function AddProject(){
    let newProjectObj = {
        name: prompt("name"),
        info: prompt("info")
    }
    console.log(projects.length);
    projects.push(newProjectObj);
    
    RenderProject(projects[projects.length-1]);
}


function RenderProject(project){
    var createArticle = document.createElement("ARTICLE");
    var createDiv = document.createElement("DIV");
    var createH3 = document.createElement("H3");
    var createP = document.createElement("P");
    var createBtn = document.createElement("button");
    var createLink = document.createElement("a");
    
    createArticle.className = "cm-card cm-shadow-wb";
    createDiv.className = "text";
    createBtn.className = "cm-button";
    
    createArticle.id = project.name;
    
    createH3.innerText = project.name;
    createP.innerText = project.info;
    createLink.innerText = "Enter";
    
    mainElement.appendChild(createArticle);
    createArticle.appendChild(createDiv);
    createDiv.appendChild(createH3);
    createDiv.appendChild(createP);
    createDiv.appendChild(createBtn);
    createBtn.appendChild(createLink);
    
    
    createArticle.addEventListener("drop", e => {
        console.log("DROP", e);
        if (!cardList.includes(userId)) {
            cardList.push(userId);
            var user = document.getElementById(userId);
            var card = document.getElementById(cardId);
            var cln = user.cloneNode(true);
            card.appendChild(cln);
        } else {alert("already in list")};
    });
    
    createArticle.addEventListener("dragover", e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        cardId = e.target.id;
    });
    
    createLink.setAttribute("href", "project.html");
    console.log(createBtn);
}