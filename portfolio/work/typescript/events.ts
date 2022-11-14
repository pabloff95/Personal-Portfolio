window.addEventListener("load", function() {
    const CONTENT:HTMLElement|null = document.getElementById("miniatures-section");
    let lastMiniatureClicked:HTMLElement;
    
    // --------------------------------- CREATE THE PROJECT OBJECTS -----------------------------------------
    // Descriptions
    const PROJECT1_DESCRIPTION:string = "The GuessGame project was my first big project. It is an online version of the boardgame \"Mastermind\"." + "<br><br>" +
        "In every game, a random combination of 4 colours is automatically created. The objective of the player is to guess this code in less than 10 rounds."  + "<br><br>" +
        "Furthermore, this web application provides the opportunity to play as logged user. When logged, at the end of each game a punctuation is displayed. This punctuation, together with other game statistics, is stored in the data base, which allows the user to keep track of his games and to create a global rank of the logged players.";
    const PROJECT2_DESCRIPTION:string = "The Finance Manager is a web-application that allows to monitore expenses, income and investments. The user can record new data and edit/delete the existing records." + "<br><br>" +
        "Besides this application provides an overview of the finances by using different charts from the \"CanvasJS\" library. It also uses the PHP library PHPSpreadsheet, to import and export data as \".xlsx\" files. ";        
    const PROJECT3_DESCRIPTION:string = "This project displays the weather of any town introduced by the user. It shows updated weather information thanks to the OpenWeather Map API. This allows the user to see the weather of the current day and also the forecast for the next 5 days. " + "<br><br>" +
        "Furthermore, this project uses the Unsplash API to update the background picture to display one of the town typed by the user.";
    const PROJECT4_DESCRIPTION:string = "This project is a web version of the classic snake game. This project was completely developed with JavaScript vanilla, using a canvas element as the main gameboard.";
    const PROJECT5_DESCRIPTION:string = "Data analysis performed to study of impacts of rising temperatures on a plant species population. Analyses and charts performed using R." + "<br><br>" + 
        "The study and its results can be found <a  href='https://doi.org/10.1111/plb.13418'>here</a>.";

    // Create objects
    let project1:Project = new Project("The GuessGame", "Online adaptation of the boardgame \"Mastermind\"", "guessgame.PNG", PROJECT1_DESCRIPTION, "guess-game.online", "https://github.com/pabloff95/The-GuessGame");    
    let project2:Project = new Project("Finance Manager", "Web-application to keep track of all your finances", "finance-manager.PNG", PROJECT2_DESCRIPTION, null, "https://github.com/pabloff95/Finance-Manager");    
    let project3:Project = new Project("Weather App", "Wep-application to consult the weather forecast of any town", "weather-app.PNG", PROJECT3_DESCRIPTION, null, "https://github.com/pabloff95/Weather-App");    
    let project4:Project = new Project("Snake Game", "Web adaptation of the classic snake game", "snake-game.PNG", PROJECT4_DESCRIPTION, null, "https://github.com/pabloff95/Snake-Game");    
    let project5:Project = new Project("Research Study", "Data analysis study on Plant Ecology", "research-study.PNG", PROJECT5_DESCRIPTION, "doi.org/10.6084/m9.figshare.c.5757800", "https://github.com/pabloff95/Research-Study");    
    // Add pictures set    
    project1.addPictureURL(["guessgame-1.PNG", "guessgame-2.PNG", "guessgame-3.PNG", "guessgame-4.PNG"]);
    project2.addPictureURL(["finance-manager-1.PNG", "finance-manager-2.PNG", "finance-manager-3.PNG", "finance-manager-4.PNG"]);
    project3.addPictureURL(["weather-app-1.PNG", "weather-app-2.PNG"]);
    project4.addPictureURL(["snake-game-1.PNG", "snake-game-2.PNG"]);
    project5.addPictureURL(["research-study-1.PNG", "research-study-2.PNG"]);

    let projects:Project[] = [project1, project2, project3, project4, project5];

    // Display projects as HTML elements (miniature elements). Then add empty elements until filling complete.
    if (CONTENT != null) {
        projects.forEach(project => {
            CONTENT.innerHTML += project.initializateMiniature();
        });        
        addEmptyMiniatures(projects.length, CONTENT);
    }

    

    // --------------------------------- EVENTS------------------------------------------------------------
    // Add events to miniature elements
        // - Create hover (CSS) like events on projects pictures to display the project title / subtitle on mouse out / over respectively
        // - On click: display project detailed information. If same miniature is clicked twice: first shows the project, second hides it again
    const MINIATURES:HTMLCollection = document.getElementsByClassName("miniature");
    const IMGS:HTMLCollection = document.getElementsByClassName("miniature-img");
    for (let i:number = 0; i < MINIATURES.length; i++) {        
        MINIATURES[i].addEventListener("click", function(this:HTMLElement){               
            lastMiniatureClicked = <HTMLElement>MINIATURES[i];
            let projectElements:NodeList | undefined = document.querySelectorAll(".project-text-container");
            let diferentElement:boolean = true; // Used to check if there is already an existing project element (a miniature was previously clicked) and this matches with the current clicked miniature element            
            if (projectElements != undefined) {                            
                let currentElement:string = (<HTMLInputElement>document.getElementsByClassName("miniature-identifier")[i]).value; // Value (title) of current miniature clicked                
                projectElements.forEach(projectElement => {
                    let lastElement:string= (<HTMLElement>projectElement.childNodes[1]).innerText; // Value (title) of last project displayed
                    if (currentElement === lastElement) diferentElement = false;
                    (<HTMLElement>projectElement).parentElement?.remove(); // just 1 project element to be displayed at the same time
                });
            } 
            if (diferentElement) { // if last project element and current element (current click in miniature) are the same, no project element is displayed                
                let project:HTMLElement = document.createElement("div");
                project.className= "project";
                project.innerHTML = projects[i].initializateProject();                
                // Determine position where to append the <div class="poject"> element (directly in the row underneath of the clicked miniature)                                
                let miniatureWidth:number = getElementRealWidth(lastMiniatureClicked);
                let miniaturesPerRow:number = getMiniaturesPerRow(miniatureWidth);
                let miniatureRow:number = Math.ceil((i+1) / miniaturesPerRow); // Row where the current miniature is located; i + 1 = Miniature position

                let element:Element; // Element after which the project element will be appended. Element to be found belllow
                // Check if the clicked miniature row is the last row 
                if (projects.length/miniaturesPerRow > miniatureRow) { // Clicked miniature IS NOT in the last row
                    let projectPosition:number = miniatureRow*miniaturesPerRow; // Position in which the project will be placed (starting from 0, like an array)                
                    element = MINIATURES[projectPosition-1];
                } else { // Clicked miniature IS in the last row
                    // Check if there are empty miniature elements "filling" the row
                    let emptyElements:HTMLCollection = document.getElementsByClassName("empty-miniature");                
                    if (emptyElements.length == 0) {   // NO empty elements
                        let projectPosition:number = miniatureRow*miniaturesPerRow; // Position in which the project will be placed (starting from 0, array like)                                                   
                        element = MINIATURES[projectPosition-1]; // -1 to determine the last element (.miniature) position (not project position), to append the project element after it
                    } else{                                       
                        element = emptyElements[emptyElements.length - 1]; // The last element is the last empty miniature element, so the project will be appended in a new row                  
                    }
                }
                // Append the project element in the corresponding position                
                element.after(project);    
            }

            // --------- ARROW BUTTONS (on img) -----------           
            // Set click events: project IMG arrow buttons --> change displaying photo
            document.getElementById("img-right-button")?.addEventListener("click", () => {                
                let img:Element = document.getElementsByClassName("project-img")[0];                
                let currentSRC:string | undefined = img.getAttribute("src")?.split("/")[1];
                if (currentSRC) { 
                    let currentIndex:number = projects[i].getImgCollection.indexOf(currentSRC);
                    let newSRC:string = (currentIndex + 1 == projects[i].getImgCollection.length) ? 
                        "pictures/" + projects[i].getImgCollection[0]:
                        "pictures/" + projects[i].getImgCollection[currentIndex + 1];                                            
                    img.setAttribute("src", newSRC);
                }                              
            });
            document.getElementById("img-left-button")?.addEventListener("click", () => {                
                let img:Element = document.getElementsByClassName("project-img")[0];                
                let currentSRC:string | undefined = img.getAttribute("src")?.split("/")[1];
                if (currentSRC) { 
                    let currentIndex:number = projects[i].getImgCollection.indexOf(currentSRC);
                    let newSRC:string = (currentIndex - 1 < 0) ? 
                        "pictures/" + projects[i].getImgCollection.at(-1):
                        "pictures/" + projects[i].getImgCollection[currentIndex - 1];                                            
                    img.setAttribute("src", newSRC);
                }                
            });

            // --------- ADD CLICK EVENT WITH GITHUB PROJECT PAGE -----------            
            document.getElementById("project-github")?.addEventListener("click", () => {
                let githubUrl:string = projects[i].getGitHubURL;
                window.open(githubUrl, "_blank")?.focus();
            });
        });
    }

    // Events on window resize
    window.addEventListener("resize", () => {        
        let project:HTMLElement = <HTMLElement>document.getElementsByClassName("project")[0];
        
        // Recalculate position of <div class="project"> element
        if (project != null) {
            let miniatureWidth:number = getElementRealWidth(<HTMLElement>MINIATURES[0]);
            let miniaturesPerRow:number = getMiniaturesPerRow(miniatureWidth);
            // Get last miniature clicked: lastMiniatureClicked
            let miniaturesArray:Array<never> = [].slice.call(MINIATURES);
            let miniatureIndex:number = miniaturesArray.indexOf(<never>lastMiniatureClicked);
            let miniatureRow:number = Math.ceil((miniatureIndex+1) / miniaturesPerRow);
            let projectPosition:number = miniatureRow * miniaturesPerRow;
            if (projectPosition>MINIATURES.length) projectPosition = MINIATURES.length; 
            // Move project element to its new position
            MINIATURES[projectPosition-1].after(project);
        }                

        // Readjust number of empty miniature elements (according to miniatures per row)
        addEmptyMiniatures(projects.length, CONTENT);
    });

    // --------------------------------- SIDE-MENU BUTTONS EVENT CLICKS -----------------------------------------
    document.getElementById("home-button")?.addEventListener("click", () => {
        window.location.href = "/";
    });
    document.getElementById("work-button")?.addEventListener("click", () => {
        window.location.href = "/portfolio/work/work.html";
    });
    document.getElementById("about-button")?.addEventListener("click", () => {
        window.location.href = "/portfolio/about/about.html";
    });
    document.getElementById("contact-button")?.addEventListener("click", () => {
        window.location.href = "/portfolio/contact/contact.html";
    });

    // --------------------------------- URLs TO SOCIALNETWORK LOGOS (footer) -----------------------------------------
    // Add URL to logos of social media (side-menu)
    document.querySelector(".github")?.addEventListener("click", function(){
        window.open("https://github.com/pabloff95", "_blank")?.focus();
    });
    document.querySelector(".linkedin")?.addEventListener("click", function(){
        window.open("https://www.linkedin.com/in/pablo-fdezfdez/", "_blank")?.focus();
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
    imgCollection:string[];

    constructor(public title:string, public summary:string, public url:string, public description:string, public link:string | null, public github:string){
        this.title = title;
        this.summary = summary;
        this.url = url;
        this.description = description;
        this.link = link;
        this.miniature = "";
        this.imgCollection = [url];
        this.github = github;
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
    get getLink():string | null{
        return this.link;
    }

    get getImgCollection():string[] {
        return this.imgCollection;
    }
    
    get getGitHubURL ():string {
        return this.github;
    }

    // -- METHODS
    // Create the miniature div element, with title content (+ picture) in it    
    initializateMiniature = ():string => {
        return  `<div class='miniature'> 
                    <div class='miniature-img-container'>      
                        <img src="pictures/${this.url}" class="miniature-img">
                    </div>
                    <div class="miniature-title-container">
                        <span class="miniature-title">${this.title}</span>
                    </div>
                    <div class="miniature-summary-container">
                        <span class="miniature-summary">${this.summary}</span>
                    </div>
                    <input type="hidden" class="miniature-identifier" value="${this.title}"> 
                </div>`;        
    }

    // Create the project div element: HTML element with ALL the information to be displayed on user click
    initializateProject = ():string => {
        let linkURL:string = (this.link != null)? "<span class='project-link'>URL: <a href='https://"+this.link+"' target='_blank'>"+this.link+"</a></span>" : "";
        return `
            <div class='project-text-container'>
                <span class="project-title">${this.title}</span><br>
                
                    <span class="project-description">${this.description}</span><br>
                <div class='project-urls'>
                    ${linkURL}
                    <img alt='GitHub URL' id='project-github' />
                </div>
            </div>
            <div class='project-img-container'>
                <button class='project-picture-button' id='img-left-button'>&#60;</button>
                <img src="pictures/${this.url}" class="project-img">
                <button class='project-picture-button' id='img-right-button'>&#62;</button>
            </div>`;            
    }

    addPictureURL = (imgs:string | string[]):void => {
        if (typeof imgs == "string") {
            this.imgCollection.push(imgs)
        } else {
            imgs.forEach(img => this.imgCollection.push(img));
        };
    }
}


// -------------------- FUNCTIONS -------------------
// Get element real widht (including borders and margin)
const getElementRealWidth = (element:HTMLElement):number => {
    let elementStyle:CSSStyleDeclaration = window.getComputedStyle(element);
    let width:number = element.getBoundingClientRect().width; // Width includes borders and padding, but not margins
    let marginRigth:number = parseInt(elementStyle.getPropertyValue("margin-right"));
    let marginLeft:number = parseInt(elementStyle.getPropertyValue("margin-left"));

    return Math.round(width + marginLeft + marginRigth);
}

// Get the number of miniatures per row (changes due to responsive design)
const getMiniaturesPerRow = (elementWidth:number):number => {        
    // Get with of Main element 
    let main:HTMLElement | null = document.getElementById("miniatures-section"); 
    let mainWidth:number =parseInt(window.getComputedStyle(<HTMLElement>main).width); 
    // Calculate miniatures per row
    let miniaturesPerRow:number = Math.floor(mainWidth/elementWidth); 
    
    return miniaturesPerRow;
}

// Add empty miniatures to the last row, until filling it completely (for design purposes)
const addEmptyMiniatures = (nMiniatures:number, container:HTMLElement | null):void => {
    // Check if there are already existing empty miniature elements (e.x. in case of resizing the window)
    let emptyElements:HTMLCollection = document.getElementsByClassName("empty-miniature");
    if (emptyElements.length > 0) {
        while(emptyElements.length > 0){
            emptyElements[0].parentNode?.removeChild(emptyElements[0]);            
        }
    }        
    // Get number of miniatures per row
    let miniatureWidth:number = getElementRealWidth(<HTMLElement>document.getElementsByClassName("miniature")[0]);
    let miniaturesPerRow:number = getMiniaturesPerRow(miniatureWidth);
    // Get number of miniatures missing in the last row (to fill the whole row with miniatures)
    let miniaturesMissing:number = miniaturesPerRow - (nMiniatures % miniaturesPerRow);    
    for (let i:number = 0; i < miniaturesMissing; i++) {
        let emptyMiniature:HTMLElement = document.createElement("div");
        emptyMiniature.className = "empty-miniature";
        emptyMiniature.style.width = miniatureWidth + "px";
        container?.appendChild(emptyMiniature);
    }
    checkProjectPosition(); // See bellow
}

// Make sure that, if project element is in the last row, it is in the last position. This avoids project being in the wrong row after window resize
const checkProjectPosition = ():void => {
    // Check if element exists
    let project:Element | undefined = document.getElementsByClassName("project")[0];
    if (typeof project != "undefined") {
        let container:HTMLElement | null = document.getElementById("miniatures-section");
        let allElements:NodeListOf<ChildNode> | undefined = container?.childNodes;
        if (typeof allElements != "undefined") {
            let projectPosition:number = 0;
            for (let i:number = 0; i < allElements.length; i++) {
                if (project == allElements[i]) projectPosition = i;
            }    
            let nextElement:string = (<HTMLElement>allElements[projectPosition+1]).className;
            if (nextElement === "empty-miniature") {
                container?.appendChild(project);                                             
            } 
        }
    }
}
