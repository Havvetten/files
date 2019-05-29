function openCardEdit(event){
let editCardsWindow = document.getElementById("editTaskWindow");
let buttonElement = document.getElementById("button");
    
    editCardsWindow.style.display = "inline";
    editCardsWindow.style.opacity = "0.87";
    
    buttonElement.addEventListener("click", function(){
    
    editCardsWindow.style.opacity = "0";
    editCardsWindow.style.display ="none";
        
    });

console.log("click on" + event.target.id);
      
}
//Pusher en ny dropZone inn i arrayet DropZones[] og legger det up på siden.
function AddZone(){
    
    console.log("click Zone");
    var newZone = prompt("title");

    dropZones.push(newZone);
    updateDropZonesToDOM(dropZones[dropZones.length-1]);  

}

//Pusher et nytt kort inn i arrayet Cards[] og legger det up på siden.
function AddCard(){
    
    console.log("click");

    var newCard = {

            name: prompt("Name"),
            description: prompt("des"),
            status: "todo"      
    };

    cards.push(newCard);
    updateCardsToDOM(cards[cards.length-1]);
   
}

//drag start func, som kjøres når man starter å dra
function dragstart_handler(event) {
    console.log("DRAG");
    console.log("TASK", event.target.id);
    event.dataTransfer.setData("text/plain", event.target.id);
          
} 
        
//dragOver start func, som kjøres når man holder det over et som er "dropable"
function dragover_handler(event) {
    console.log("dragover: " + event.target.id);
    event.preventDefault();
        
}

//dropHandler, som kjøres når man dropper
function drop_handler(event) {
    console.log("DROP");
    event.preventDefault();
    let data = event.dataTransfer.getData("text/plain");
    let card = cards.find(function (enTaskFraArrayet) {
        return enTaskFraArrayet.name === data;
    });

    if (dropZones.includes(event.target.id) && card.status !== event.target.id) {
        let el = document.getElementById(data);
        event.target.appendChild(el);
        card.status = event.target.id;
    }

    console.log("CARDS", cards);
        
}

//Container Element der alle Drop Sonene skal opprettes.
const mainEl = document.getElementById("main");

//Update DropContainer/render cards from Array
function updateDropZonesToDOM(dropper) {
    let createColumn = document.createElement("SECTION");
    let createColumnHeader = document.createElement("DIV");
    let createColumnHeaderText = document.createElement("H1");
    let createColumnHeaderBtn = document.createElement("BUTTON");
    let createColumnHeaderBtnIcon = document.createElement("icon"); // Benjamin
    
    createColumn.className = "column";
    createColumnHeader.className = "column-header";
    createColumnHeaderText.className ="column-header-text";
    createColumnHeaderBtn.className = "column-header-btn";
    createColumnHeaderBtnIcon.className = "fas fa-bars"; // klasse fra FontAwesome.com
    
    createColumnHeaderText.innerText = dropper;
    
    mainEl.appendChild(createColumn);
    createColumn.appendChild(createColumnHeader);
    createColumnHeader.appendChild(createColumnHeaderText);
    createColumnHeader.appendChild(createColumnHeaderBtn);
    createColumnHeaderBtn.appendChild(createColumnHeaderBtnIcon); // Benjamin
    
    createColumn.id = dropper;
    
    createColumn.ondragover = dragover_handler;
    createColumn.ondrop = drop_handler;
}

//dropZones array
const dropZones = ["todo", "doing", "done"];

//looper gjennom alle variablene i dropzones og kjører updateDropZonesToDOM for hver av dem.
dropZones.forEach(updateDropZonesToDOM);

//Update Cards/render cards from Array, Tar inn et objekt fra cards og lager et kort på siden.

function updateCardsToDOM(card){
    //opretter alle elementene et kort består av
    let dropZone = document.getElementById(dropZones[0]);
    let createCard = document.createElement("ARTICLE");          
    let createCardHeader = document.createElement("DIV");
    let createCardTitle = document.createElement("H3");
    let createCardTitleBtn = document.createElement("BUTTON");
    const createCardTitleBtnIcon = document.createElement("icon"); // Benjamin
    let createCardContent = document.createElement("DIV");
    let createCardMembersDiv = document.createElement("DIV");
    let createPersonBadge = document.createElement("DIV");
    
    //setter klasse navnene
    createCard.className = "card-project";
    createCardHeader.className = "card-header";
    createCardTitle.className = "card-title";
    createCardTitleBtn.className = "card-title-button";
    createCardTitleBtnIcon.className = "fas fa-ellipsis-h"; // Klasse fra FontAwesome.com
    createCardContent.className = "card-content";
    createCardMembersDiv.className = "card-members superGrid";
    createPersonBadge.className = "person";
    
    createCardTitle.innerText = card.name;
    // createCardTitleBtn.innerText = "***";
    createPersonBadge.innerText = "FH";
    
    
    dropZone.appendChild(createCard);
    createCard.appendChild(createCardHeader);
    createCardHeader.appendChild(createCardTitle);
    createCardHeader.appendChild(createCardTitleBtn);
    createCardTitleBtn.appendChild(createCardTitleBtnIcon); // Benjamin
    createCard.appendChild(createCardContent);
    createCard.appendChild(createCardMembersDiv);
    createCardMembersDiv.appendChild(createPersonBadge); // Benjamin: 
    
    createCard.id = card.name;
    createCard.draggable = true;
    createCard.ondragstart = dragstart_handler;
    createCard.onclick = openCardEdit;                          
    
}

//card[] array med alle card objektene
const cards = [
    {
        name: "Planlegge",
        description: "planlegge alt som skal gjøres",
        status: "todo"      
    },
    {
        name: "Lage",
        description: "lage det",
        status: "todo"
    }
];

//kjøer updateCardsToDOM for hvert card objekt i Cards[].
cards.forEach(updateCardsToDOM);

//add card button/ Push new card in to cars[] and render it
addCardBtn.addEventListener("click", AddCard);

//add dropZone button
addZoneBtn.addEventListener("click", AddZone);





