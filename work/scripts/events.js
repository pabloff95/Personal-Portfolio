"use strict";
window.addEventListener("load", function () {
    const CONTENT = document.querySelector("main");
    let lastMiniatureClicked;
    let mainImgWidth;
    // --------------------------------- CREATE THE PROJECT OBJECTS -----------------------------------------
    // Descriptions
    const PROJECT1_DESCRIPTION = "The GuessGame project was my first big project. It is an online version of the boardgame \"Mastermind\"." + "<br><br>" +
        "In every game, a random combination of 4 colours is automatically created. This is a secret code to guess. The objective of the user is to guess this code in less than 10 rounds." + "<br><br>" +
        "Furthermore, this web application provides the opportunity to play as logged user. When logged, at the end of each game a punctuation is displayed. This punctuation, together with other game statistics, is stored in the data base, which allows the user to keep track of his games and to create a global rank of the logged players.";
    const PROJECT2_DESCRIPTION = "The Finance Manager is a webapplication that allows to monitore the personal finances (expenses, income, investments). The user can record and manage their finances (i.e. edit or delete records). " + "<br><br>" +
        "Besides this application provides an overview of the finances by using different charts \"CanvasJS\" library. It also uses the PHP library PHPSpreadsheet, to import and export data as .xlsx files. ";
    const PROJECT3_DESCRIPTION = "This project displays the weather of any town introduced by the user. It shows updated weather information thanks to the OpenWeather Map API. This allows the user to see the weather of the current day and of the next 5 days. " + "<br><br>" +
        "Furthermore, this project uses the Unsplash API to update the background picture to one of the town introduced by the user.";
    const PROJECT4_DESCRIPTION = "This project is a web version of the clasic snake phone game. This project is enterely developed using JavaScript vanilla, using a canvas element as the main gameboard";
    const PROJECT5_DESCRIPTION = "Data analysis performed to study of impacts of rising temperatures on a plant species population. Analyses and charts performed using R." + "<br><br>" +
        "The study and its results can be found <a  href='https://doi.org/10.1111/plb.13418'>here</a>.";
    // Create objects
    let project1 = new Project("The GuessGame", "An online adaptation of the boardgame \"Mastermind\"", "guessgame.PNG", PROJECT1_DESCRIPTION, "guess-game.online");
    let project2 = new Project("Finance Manager", "A web-application to keep track of all your finances", "finance-manager.PNG", PROJECT2_DESCRIPTION, null);
    let project3 = new Project("Weather App", "A wep-application to consult the weather forecast of any town", "weather-app.PNG", PROJECT3_DESCRIPTION, null);
    let project4 = new Project("Snake Game", "An adaptation of the traditional snake mobilephone game", "snake-game.PNG", PROJECT4_DESCRIPTION, null);
    let project5 = new Project("Research Study", "Data analysis study on Plant Ecology", "research-study.PNG", PROJECT5_DESCRIPTION, "doi.org/10.6084/m9.figshare.c.5757800");
    // Add pictures set    
    project1.addPictureURL(["guessgame-1.PNG", "guessgame-2.PNG", "guessgame-3.PNG", "guessgame-4.PNG"]);
    project2.addPictureURL(["finance-manager-1.PNG", "finance-manager-2.PNG", "finance-manager-3.PNG", "finance-manager-4.PNG"]);
    project3.addPictureURL(["weather-app-1.PNG", "weather-app-2.PNG"]);
    project4.addPictureURL(["snake-game-1.PNG", "snake-game-2.PNG"]);
    project5.addPictureURL(["research-study-1.PNG", "research-study-2.PNG"]);
    let projects = [project1, project2, project3, project4, project5];
    // Display projects as HTML elements
    if (CONTENT != null) {
        projects.forEach(project => {
            CONTENT.innerHTML += project.initializateMiniature();
        });
    }
    // Add events to miniature elements
    // - Create hover (CSS) like events on projects pictures to display the project title / subtitle on mouse out / over respectively
    // - On click: display project detailed information. If same miniature is clicked twice: first shows the project, second hides it again
    const MINIATURES = document.getElementsByClassName("miniature");
    const IMGS = document.getElementsByClassName("miniature-img");
    for (let i = 0; i < MINIATURES.length; i++) {
        MINIATURES[i].addEventListener("mouseout", function () {
            this.innerHTML = projects[i].getMiniatureWithTitle();
        });
        MINIATURES[i].addEventListener("mouseover", function () {
            this.innerHTML = projects[i].getMiniatureWithSummary();
            // Change img background from black-white to colour            
            IMGS[i].style.filter = "grayscale(85%)";
        });
        MINIATURES[i].addEventListener("click", function () {
            lastMiniatureClicked = MINIATURES[i];
            let projectElements = document.querySelectorAll(".project-text-container");
            let diferentElement = true; // Used to check if there is already an existing project element (a miniature was previously clicked) and this matches with the current clicked miniature element
            if (projectElements.length > 0) {
                let currentElement = document.getElementById("miniature-identifier").value; // Value (title) of current miniature clicked                
                projectElements.forEach(projectElement => {
                    let lastElement = projectElement.childNodes[1].innerText; // Value (title) of last project displayed
                    if (currentElement === lastElement)
                        diferentElement = false;
                    projectElement.parentElement?.remove(); // just 1 project element to be displayed at the same time
                });
            }
            if (diferentElement) { // if last project element and current element (current click in miniature) are the same, no project element is displayed                
                let project = document.createElement("div");
                project.className = "project";
                project.innerHTML = projects[i].initializateProject();
                // Determine position where to append the <div class="poject"> element (directly in the row underneath of the clicked miniature)                                
                let miniatureWidth = getElementRealWidth(lastMiniatureClicked);
                let miniaturesPerRow = getMiniaturesPerRow(miniatureWidth);
                let miniatureRow = Math.ceil((i + 1) / miniaturesPerRow); // Row where the current miniature is located; i + 1 = Miniature position
                let nMiniatures = MINIATURES.length; // Total number of <div class="miniature"> elements
                let projectPosition = miniatureRow * miniaturesPerRow; // Position in which the project will be placed (starting from 0, array like)                
                if (projectPosition > nMiniatures)
                    projectPosition = nMiniatures;
                // Append the project element in the corresponding position
                let element = MINIATURES[projectPosition - 1]; // -1 to determine the last element (.miniature) position (not project position), to append the project element after it
                //project.style.width = miniatureRowWidth() + "px"; // Set <div class="project"> width
                element.after(project);
                // Set project element width equal to the width of all the elements in the first row                
                document.getElementsByClassName("project")[0].style.width = miniatureRowWidth() + "px"; // Set <div class="project"> width                
            }
            // ---------- Update width value of main img in project element
            let img = document.getElementsByClassName("project-img")[0];
            mainImgWidth = img.getClientRects()[0].width;
            // --------- ARROW BUTTONS (on img) -----------
            // Set arrow buttons positions
            setArrowButtonPosition();
            // Set click events: project IMG arrow buttons --> change displaying photo
            document.getElementById("img-right-button")?.addEventListener("click", () => {
                let img = document.getElementsByClassName("project-img")[0];
                let currentSRC = img.getAttribute("src")?.split("/")[1];
                if (currentSRC) {
                    let currentIndex = projects[i].getImgCollection.indexOf(currentSRC);
                    let newSRC = (currentIndex + 1 == projects[i].getImgCollection.length) ?
                        "pictures/" + projects[i].getImgCollection[0] :
                        "pictures/" + projects[i].getImgCollection[currentIndex + 1];
                    img.setAttribute("src", newSRC);
                }
                img.style.width = mainImgWidth + "px";
            });
            document.getElementById("img-left-button")?.addEventListener("click", () => {
                let img = document.getElementsByClassName("project-img")[0];
                let currentSRC = img.getAttribute("src")?.split("/")[1];
                if (currentSRC) {
                    let currentIndex = projects[i].getImgCollection.indexOf(currentSRC);
                    let newSRC = (currentIndex - 1 <= 0) ?
                        "pictures/" + projects[i].getImgCollection.at(-1) :
                        "pictures/" + projects[i].getImgCollection[currentIndex - 1];
                    img.setAttribute("src", newSRC);
                }
                img.style.width = mainImgWidth + "px";
            });
        });
    }
    // Events on window resize
    window.addEventListener("resize", () => {
        let project = document.getElementsByClassName("project")[0];
        // Adjust <div class="project"> width 
        if (project != null) {
            project.style.width = miniatureRowWidth() + "px";
        }
        // Recalculate position of <div class="project"> element
        if (project != null) {
            let miniatureWidth = getElementRealWidth(MINIATURES[0]);
            let miniaturesPerRow = getMiniaturesPerRow(miniatureWidth);
            // Get last miniature clicked: lastMiniatureClicked
            let miniaturesArray = [].slice.call(MINIATURES);
            let miniatureIndex = miniaturesArray.indexOf(lastMiniatureClicked);
            let miniatureRow = Math.ceil((miniatureIndex + 1) / miniaturesPerRow);
            let projectPosition = miniatureRow * miniaturesPerRow;
            if (projectPosition > MINIATURES.length)
                projectPosition = MINIATURES.length;
            // Move project element to its new position
            MINIATURES[projectPosition - 1].after(project);
        }
        // Set arrow buttons (on img) positions
        setArrowButtonPosition();
    });
    // SIDE-MENU BUTTONS EVENT CLICKS
    document.getElementById("home-button")?.addEventListener("click", () => {
        window.location.href = "/";
    });
    document.getElementById("about-button")?.addEventListener("click", () => {
        window.location.href = "../about/about.html";
    });
    document.getElementById("contact-button")?.addEventListener("click", () => {
        window.location.href = "../contact/contact.html";
    });
});
// Project class for each programming project to be shown
class Project {
    title;
    summary;
    url;
    description;
    link;
    /* -- PROPERTIES DESCRIPTION:
            - title -> main title of the project;
            - summary -> short description of the project
            - url -> URL of the picture to be displayed
            - description -> long description of the project
            - link -> link to GitHub project
    */
    miniature;
    imgCollection;
    constructor(title, summary, url, description, link) {
        this.title = title;
        this.summary = summary;
        this.url = url;
        this.description = description;
        this.link = link;
        this.title = title;
        this.summary = summary;
        this.url = url;
        this.description = description;
        this.link = link;
        this.miniature = "";
        this.imgCollection = [url];
    }
    // -- GETTERS
    get getTitle() {
        return this.title;
    }
    get getSummary() {
        return this.summary;
    }
    get getDescription() {
        return this.description;
    }
    get getUrl() {
        return this.url;
    }
    get getLink() {
        return this.link;
    }
    get getImgCollection() {
        return this.imgCollection;
    }
    // -- METHODS
    // Create the miniature div element, with title content (+ picture) in it
    initializateMiniature = () => {
        return "<div class='miniature'>" +
            this.getMiniatureWithTitle() +
            "</div>";
    };
    // Create HTML element with the information to display (title content (no event) - subtitle content ("hover" event))
    getMiniatureWithTitle = () => {
        return `         
            <div class="miniature-title-container">
                <span class="miniature-title">${this.title}</span>
            </div>
            <img src="pictures/${this.url}" class="miniature-img">
        `;
    };
    getMiniatureWithSummary = () => {
        return `         
            <div class="miniature-summary-container">
                <span class="miniature-summary">${this.summary}</span>
            </div>
            <input type="hidden" id="miniature-identifier" value="${this.title}">
            <img src="pictures/${this.url}" class="miniature-img">
        `;
    };
    // Create the project div element: HTML element with ALL the information to be displayed on user click
    initializateProject = () => {
        let linkURL = (this.link != null) ? "<span class='project-link'>URL: <a href='https://" + this.link + "' target='_blank'>" + this.link + "</a></span>" : "";
        return `
            <div class='project-text-container'>
                <span class="project-title">${this.title}</span><br>
                <span class="project-description">${this.description}</span><br>
                ${linkURL}
            </div>
            <div class='project-img-container'>
                <button class='project-picture-button' id='img-left-button'>&#60;</button>
                <img src="pictures/${this.url}" class="project-img">
                <button class='project-picture-button' id='img-right-button'>&#62;</button>
            </div>`;
    };
    addPictureURL = (imgs) => {
        if (typeof imgs == "string") {
            this.imgCollection.push(imgs);
        }
        else {
            imgs.forEach(img => this.imgCollection.push(img));
        }
        ;
    };
}
// -------------------- FUNCTIONS -------------------
// Get element real widht (including borders and margin)
const getElementRealWidth = (element) => {
    let elementStyle = window.getComputedStyle(element);
    let width = element.getBoundingClientRect().width; // Width includes borders and padding, but not margins
    let marginRigth = parseInt(elementStyle.getPropertyValue("margin-right"));
    let marginLeft = parseInt(elementStyle.getPropertyValue("margin-left"));
    return Math.round(width + marginLeft + marginRigth);
};
// Get the number of miniatures per row (changes due to responsive design)
const getMiniaturesPerRow = (elementWidth) => {
    // Get with of Main element 
    let main = document.getElementsByTagName("main")[0];
    let mainWidth = parseInt(window.getComputedStyle(main).width);
    // Calculate miniatures per row
    let miniaturesPerRow = Math.floor(mainWidth / elementWidth);
    return miniaturesPerRow;
};
// Get miniatures row total (real) width (margin + borders + elements)
const miniatureRowWidth = () => {
    // Set project element width equal to the width of all the elements in the first row
    let miniature = document.getElementsByClassName("miniature")[0];
    let marginMiniature = parseInt(window.getComputedStyle(miniature).getPropertyValue("margin-right"));
    let elementWidth = getElementRealWidth(miniature);
    let miniaturesPerRow = getMiniaturesPerRow(elementWidth);
    let totalWidth = (elementWidth * miniaturesPerRow) - marginMiniature; // Get total length:  element (widht + 2 margins) * number of elements in a row
    return totalWidth;
};
// Set arrow buttons (left) in its correct position: limits of img .project-img; right button always at right:0
const setArrowButtonPosition = () => {
    let img = document.getElementsByClassName("project-img")[0];
    let button = document.getElementById("img-left-button");
    if (button != null) {
        let imgWidth = Math.round(img.getClientRects()[0].width - button.getClientRects()[0].width);
        button.style.right = imgWidth + "px";
    }
};
