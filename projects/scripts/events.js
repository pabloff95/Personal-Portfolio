"use strict";
window.addEventListener("load", function () {
    const CONTENT = document.querySelector("main");
    // Create the project objects
    let project1 = new Project("Project nr. 1", "This is just a test!", "1.png", "description", "link");
    let project2 = new Project("Project nr. 2", "This is just a test!", "2.png", "description", "link");
    let project3 = new Project("Project nr. 3", "This is just a test!", "3.png", "description", "link");
    let project4 = new Project("Project nr. 4", "This is just a test!", "4.png", "description", "link");
    let project5 = new Project("Project nr. 5", "This is just a test!", "1.png", "description", "link");
    let project6 = new Project("Project nr. 6", "This is just a test!", "2.png", "description", "link");
    let project7 = new Project("Project nr. 7", "This is just a test!", "3.png", "description", "link");
    let project8 = new Project("Project nr. 8", "This is just a test!", "4.png", "description", "link");
    let projects = [project1, project2, project3, project4, project5, project6, project7, project8];
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
    for (let i = 0; i < MINIATURES.length; i++) {
        MINIATURES[i].addEventListener("mouseout", function () {
            this.innerHTML = projects[i].getMiniatureWithTitle();
        });
        MINIATURES[i].addEventListener("mouseover", function () {
            this.innerHTML = projects[i].getMiniatureWithSummary();
        });
        MINIATURES[i].addEventListener("click", function () {
            let projectElements = document.querySelectorAll(".project");
            let diferentElement = true; // Used to check if there is already an existing project element (a miniature was previously clicked) and this matches with the current clicked miniature element
            if (projectElements.length > 0) {
                let currentElement = document.getElementById("miniature-identifier").value; // Value (title) of current miniature clicked
                projectElements.forEach(projectElement => {
                    let lastElement = projectElement.childNodes[1].innerText; // Value (title) of last project displayed
                    if (currentElement === lastElement)
                        diferentElement = false;
                    projectElement.remove(); // just 1 project element to be displayed at the same time
                });
            }
            if (diferentElement) { // if last project element and current element (current click in miniature) are the same, no project element is displayed
                let project = document.createRange().createContextualFragment(projects[i].initializateProject()); // Transform string to nodo like element to append <div class="project"> element to <main>
                // Determine position where to append the <div class="poject"> element (directly in the row underneath of the clicked miniature)                                
                let miniatureWidth = parseInt(window.getComputedStyle(MINIATURES[i]).width);
                let miniaturesPerRow = getMiniaturesPerRow(miniatureWidth);
                let miniatureRow = Math.ceil((i + 1) / miniaturesPerRow); // Row where the current miniature is located; i + 1 = Miniature position
                let nMiniatures = MINIATURES.length; // Total number of <div class="miniature"> elements
                let projectPosition = miniatureRow * miniaturesPerRow; // Position in which the project will be placed (starting from 0, array like)                
                if (projectPosition > nMiniatures)
                    projectPosition = nMiniatures;
                // Append the project element in the corresponding position
                let element = MINIATURES[projectPosition - 1]; // -1 to determine the last element (.miniature) position (not project position), to append the project element after it
                element.after(project);
            }
        });
    }
});
// Project class for each programming project to be shown
class Project {
    constructor(title, summary, url, description, link) {
        this.title = title;
        this.summary = summary;
        this.url = url;
        this.description = description;
        this.link = link;
        // -- METHODS
        // Create the miniature div element, with title content (+ picture) in it
        this.initializateMiniature = () => {
            return "<div class='miniature'>" +
                this.getMiniatureWithTitle() +
                "</div>";
        };
        // Create HTML element with the information to display (title content (no event) - subtitle content ("hover" event))
        this.getMiniatureWithTitle = () => {
            return `         
            <span class="miniature-title">${this.title}</span>
            <img src="pictures/${this.url}" class="miniature-img">
        `;
        };
        this.getMiniatureWithSummary = () => {
            return `         
            <span class="miniature-summary">${this.summary}</span>
            <input type="hidden" id="miniature-identifier" value="${this.title}">
            <img src="pictures/${this.url}" class="miniature-img">
        `;
        };
        // Create the project div element
        this.initializateProject = () => {
            return "<div class='project'>" +
                this.getAllInformation() +
                "</div>";
        };
        // Create HTML element with ALL the information to be displayed on user click
        this.getAllInformation = () => {
            return `
            <span class="project-title">${this.title}</span><br>
            <span class="project-description">${this.description}</span><br>
            <span class="project-link">${this.link}</span><br>
            <img src="pictures/${this.url}" class="project-img">
        `;
        };
        this.title = title;
        this.summary = summary;
        this.url = url;
        this.description = description;
        this.link = link;
        this.miniature = "";
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
}
// -------------------- FUNCTIONS -------------------
// Get the number of miniatures per row (changes due to responsive design)
const getMiniaturesPerRow = (minWidth) => {
    // Get with of Main element 
    let main = document.getElementsByTagName("main")[0];
    let mainWidth = parseInt(window.getComputedStyle(main).width);
    let miniaturesPerRow = Math.floor(mainWidth / minWidth);
    return miniaturesPerRow;
};
