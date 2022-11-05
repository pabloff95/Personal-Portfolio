
window.addEventListener("load", function() {
    const CONTENT:HTMLElement|null = document.querySelector("main");
    
    // Create the project objects
    let project1:Project = new Project("The GuessGame", "Mastermind boardgame online version", "guessgame.png", "description", "link");    
    let project2:Project = new Project("Finance Manager", "App to keep track of your finances", "finance-manager.png", "description", "link");    
    let project3:Project = new Project("Weather App", "App to get the weather forecast of any town", "weather-app.png", "description", "link");    
    let project4:Project = new Project("Snake Game", "Traditional snake mobilephone game", "snake-game.png", "description", "link");    
    let project5:Project = new Project("Research Study", "Data analysis study on Plant Ecology", "research-study.png", "description", "link");    
    
    let projects:Project[] = [project1, project2, project3, project4, project5];

    // Display projects as HTML elements
    if (CONTENT != null) {
        projects.forEach(project => {
            CONTENT.innerHTML += project.initializateMiniature();
        })
    }

    // Add events to miniature elements
        // - Create hover (CSS) like events on projects pictures to display the project title / subtitle on mouse out / over respectively
        // - On click: display project detailed information. If same miniature is clicked twice: first shows the project, second hides it again
    const MINIATURES:HTMLCollection = document.getElementsByClassName("miniature");
    const IMGS:HTMLCollection = document.getElementsByClassName("miniature-img");
    for (let i:number = 0; i < MINIATURES.length; i++) {        
        MINIATURES[i].addEventListener("mouseout", function(this:HTMLElement){
            this.innerHTML = projects[i].getMiniatureWithTitle();
        });
        MINIATURES[i].addEventListener("mouseover", function(this:HTMLElement){
            this.innerHTML = projects[i].getMiniatureWithSummary();
            // Change img background from black-white to colour
            (<HTMLElement>IMGS[i]).style.filter = "grayscale(0%)";            
        });
        MINIATURES[i].addEventListener("click", function(this:HTMLElement){             
            let projectElements:NodeList = document.querySelectorAll(".project");
            let diferentElement:boolean = true; // Used to check if there is already an existing project element (a miniature was previously clicked) and this matches with the current clicked miniature element
            if (projectElements.length> 0) {            
                let currentElement:string = (<HTMLInputElement>document.getElementById("miniature-identifier")).value; // Value (title) of current miniature clicked
                projectElements.forEach(projectElement => {
                    let lastElement:string= (<HTMLElement>projectElement.childNodes[1]).innerText; // Value (title) of last project displayed
                    if (currentElement === lastElement) diferentElement = false;
                    (<HTMLElement>projectElement).remove(); // just 1 project element to be displayed at the same time
                });
            } 
            if (diferentElement) { // if last project element and current element (current click in miniature) are the same, no project element is displayed
                let project:DocumentFragment = document.createRange().createContextualFragment(projects[i].initializateProject()); // Transform string to nodo like element to append <div class="project"> element to <main>
                // Determine position where to append the <div class="poject"> element (directly in the row underneath of the clicked miniature)                                
                let miniatureWidth:number = parseInt(window.getComputedStyle(<HTMLElement>MINIATURES[i]).width);
                let miniaturesPerRow:number = getMiniaturesPerRow(miniatureWidth);
                let miniatureRow:number = Math.ceil((i+1) / miniaturesPerRow); // Row where the current miniature is located; i + 1 = Miniature position
                let nMiniatures:number = MINIATURES.length; // Total number of <div class="miniature"> elements
                let projectPosition:number = miniatureRow*miniaturesPerRow; // Position in which the project will be placed (starting from 0, array like)                
                if (projectPosition>nMiniatures) projectPosition = nMiniatures;                
                // Append the project element in the corresponding position
                let element:Element = MINIATURES[projectPosition-1]; // -1 to determine the last element (.miniature) position (not project position), to append the project element after it
                element.after(project);                
            }
        });
    }

    // Side-menu buttons click events
    document.getElementById("home-button")?.addEventListener("click", () => {
        window.location.href = "../index.html";
    });
});

// Project class for each programming project to be shown
class Project {
    /* -- PROPERTIES DESCRIPTION: 
            - title -> main title of the project;   
            - summary -> short description of the project
            - url -> URL of the picture to be displayed
            - description -> long description of the project
            - link -> link to GitHub project
    */
    miniature:string;

    constructor(public title:string, public summary:string, public url:string, public description:string, public link:string){
        this.title = title;
        this.summary = summary;
        this.url = url;
        this.description = description;
        this.link = link;
        this.miniature = "";
    }

    // -- GETTERS
    get getTitle():string{
        return this.title;
    }
    get getSummary():string{
        return this.summary;
    }
    get getDescription():string{
        return this.description;
    }
    get getUrl():string{
        return this.url;
    }
    get getLink():string{
        return this.link;
    }

    // -- METHODS
    // Create the miniature div element, with title content (+ picture) in it
    initializateMiniature = ():string => {
        return "<div class='miniature'>" +
                    this.getMiniatureWithTitle() +
                "</div>";
    }
    // Create HTML element with the information to display (title content (no event) - subtitle content ("hover" event))
    getMiniatureWithTitle = ():string => {
        return  `         
            <div class="miniature-title-container">
                <span class="miniature-title">${this.title}</span>
            </div>
            <img src="pictures/${this.url}" class="miniature-img">
        `;        
    }
    getMiniatureWithSummary = ():string => {
        return  `         
            <div class="miniature-summary-container">
                <span class="miniature-summary">${this.summary}</span>
            </div>
            <input type="hidden" id="miniature-identifier" value="${this.title}">
            <img src="pictures/${this.url}" class="miniature-img">
        `;        
    }
    // Create the project div element
    initializateProject = ():string => {
        return "<div class='project'>" +
                    this.getAllInformation() +
                "</div>";
    }
    // Create HTML element with ALL the information to be displayed on user click
    getAllInformation = ():string => {
        return `
            <span class="project-title">${this.title}</span><br>
            <span class="project-description">${this.description}</span><br>
            <span class="project-link">${this.link}</span><br>
            <img src="pictures/${this.url}" class="project-img">
        `;
    }
}


// -------------------- FUNCTIONS -------------------
// Get the number of miniatures per row (changes due to responsive design)
const getMiniaturesPerRow = (minWidth:number):number => {    
    // Get with of Main element 
    let main:HTMLElement = document.getElementsByTagName("main")[0];
    let mainWidth:number =parseInt(window.getComputedStyle(<HTMLElement>main).width); 
    let miniaturesPerRow:number = Math.floor(mainWidth/minWidth); 
    
    return miniaturesPerRow;
}
