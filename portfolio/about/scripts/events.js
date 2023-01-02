"use strict";
window.addEventListener("load", function () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    // SIDE-MENU BUTTONS EVENT CLICKS
    (_a = document.getElementById("home-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        window.location.href = "/";
    });
    (_b = document.getElementById("work-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        window.location.href = "/portfolio/work/work.html";
    });
    (_c = document.getElementById("about-button")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        window.location.href = "/portfolio/about/about.html";
    });
    (_d = document.getElementById("contact-button")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
        window.location.href = "/portfolio/contact/contact.php";
    });
    // --------------------------------- URLs TO SOCIALNETWORK LOGOS (footer) -----------------------------------------
    // Add URL to logos of social media (side-menu)
    (_e = document.querySelector(".github")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () {
        var _a;
        (_a = window.open("https://github.com/pabloff95", "_blank")) === null || _a === void 0 ? void 0 : _a.focus();
    });
    (_f = document.querySelector(".linkedin")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () {
        var _a;
        (_a = window.open("https://www.linkedin.com/in/pablo-fdezfdez/", "_blank")) === null || _a === void 0 ? void 0 : _a.focus();
    });
    // --------------------------------- ADD TECHNOLOGY ELEMENTS -----------------------------------------
    const container = document.getElementById("technologies-container");
    if (container) {
        // Create languages objects
        let javaScritp = new Language("JavaScript", 8);
        let HTML = new Language("HTML", 8);
        let CSS = new Language("CSS", 8);
        let typescript = new Language("TypeScript", 7);
        let r = new Language("R", 7);
        let PHP = new Language("PHP", 5);
        let SQL = new Language("SQL", 5);
        let git = new Language("Git", 4);
        let c = new Language("C#", 3);
        let react = new Language("React", 2);
        let java = new Language("Java", 2);
        let python = new Language("Python", 1);
        // Add elements to the page
        javaScritp.addLanguage(container);
        HTML.addLanguage(container);
        CSS.addLanguage(container);
        typescript.addLanguage(container);
        r.addLanguage(container);
        PHP.addLanguage(container);
        SQL.addLanguage(container);
        git.addLanguage(container);
        c.addLanguage(container);
        react.addLanguage(container);
        java.addLanguage(container);
        python.addLanguage(container);
    }
    // --------------------------------- LANGUAGES CERTIFICATE BOXES -----------------------------------------
    // Adjust the width of the idioms boxes    
    const IDIOMS = Array.from(document.getElementsByClassName("idiom-level"));
    IDIOMS.forEach(idiom => {
        // Set event according to devide --> touchscreen or mouse
        const EVENT = ("ontouchstart" in document.documentElement) ? "touchstart" : "mouseover";
        idiom.addEventListener(EVENT, () => {
            idiomBoxWidth();
        });
    });
    // --------------------------------- DOWNLOAD CV BUTTON -----------------------------------------
    // Donwload the to be available only once per page load
    let cvClicked = false;
    (_g = document.getElementById("cv-button")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", function (event) {
        (!cvClicked) ? cvClicked = true : event.preventDefault();
    });
    // --------------------------------- SCROLL ANIMATIONS -----------------------------------------
    // Make disappear the arrow pointing down, when scrolling
    (_h = document.getElementById("page-content")) === null || _h === void 0 ? void 0 : _h.addEventListener("scroll", () => {
        const ARROW = document.getElementById("scroll-title");
        if (ARROW)
            ARROW.style.display = "none";
    });
    // Add / Remove show class to the elements that the user is viewing --> used to do the scroll animation with css. Used with <section> elements
    const OBSERVER = new IntersectionObserver(elements => {
        elements.forEach(element => {
            (element.isIntersecting) ? element.target.classList.add("show") : element.target.classList.remove("show");
        });
    });
    const HIDDEN_ELEMENTS = Array.from(document.getElementsByClassName("hidden"));
    HIDDEN_ELEMENTS.forEach(element => OBSERVER.observe(element));
});
// Class to create programming languages or other technologies HTML elements: name, photo and knowledge progress bar
class Language {
    constructor(language, level) {
        this.language = language;
        this.level = level;
        this.language = language;
        this.level = level;
    }
    // Initializate element (append language elements)
    addLanguage(container) {
        const element = `
            <div class='language-container'>
                <span class='language-title'>${this.language}</span>
                ${this.addKnowledge()}
            <div>
        `;
        container.innerHTML += element;
    }
    // Add knowledge bar, filled with language level
    addKnowledge() {
        let levelColor = (this.level >= 5) ? "level-high" : "level-low"; // Add level second class to show different color for low - high knowledge
        // Create level element. Width is set with TS according to the level
        let levelElement = `<div class='level ${levelColor}' style='width:${this.level * 10}%;'></div>`;
        let levelContainer = `<div class='level-container'>${levelElement}</div>`;
        return levelContainer;
    }
}
// Function to adapt height of the picture to the one of the programming language levels
const adaptPictureHeight = () => {
    const PICTURE = document.getElementById("profile-picture");
    const LEVELS = document.getElementById("technologies-container");
    const LEVELS_HEIGHT = LEVELS === null || LEVELS === void 0 ? void 0 : LEVELS.offsetHeight;
    if (PICTURE) {
        PICTURE.style.height = LEVELS_HEIGHT + "px";
    }
};
// Function to adjust the width of the idioms boxes (containing language certificates) according to their position on the screen: to close to right borer is likely to overflow --> break box into lines
const idiomBoxWidth = () => {
    const BOXES = Array.from(document.getElementsByClassName('idiom-box'));
    // Check where are the boxes positioned
    BOXES.forEach(idiom => {
        const IDIOM_BOX_END_X = idiom.getBoundingClientRect().x + idiom.getBoundingClientRect().width;
        idiom.style.width = (IDIOM_BOX_END_X > window.innerWidth) ? 'fit-content' : 'max-content';
    });
};
