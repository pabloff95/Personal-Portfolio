 window.addEventListener("load", function(){
    // SIDE-MENU BUTTONS EVENT CLICKS
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
        window.location.href = "/portfolio/contact/contact.php";
    });
    
    // --------------------------------- URLs TO SOCIALNETWORK LOGOS (footer) -----------------------------------------
    // Add URL to logos of social media (side-menu)
    document.querySelector(".github")?.addEventListener("click", function(){
        window.open("https://github.com/pabloff95", "_blank")?.focus();
    });
    document.querySelector(".linkedin")?.addEventListener("click", function(){
        window.open("https://www.linkedin.com/in/pablo-fdezfdez/", "_blank")?.focus();
    });

    // --------------------------------- ADD TECHNOLOGY ELEMENTS -----------------------------------------
    const container:HTMLElement | null = document.getElementById("technologies-container");
    if (container){
        // Create languages objects
        let javaScritp:Language = new Language("JavaScript", 8);
        let HTML:Language = new Language("HTML", 8);
        let CSS:Language = new Language("CSS", 8);
        let typescript:Language = new Language("TypeScript", 7);
        let r:Language = new Language("R", 7);
        let PHP:Language = new Language("PHP", 5);
        let SQL:Language = new Language("SQL", 5);
        let git:Language = new Language("Git", 4);
        let c:Language = new Language("C#", 3);
        let react:Language = new Language("React", 2);        
        let java:Language = new Language("Java", 2);
        let python:Language = new Language("Python", 1);
        


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
    const IDIOMS:Element[] = Array.from(document.getElementsByClassName("idiom-level"));
    IDIOMS.forEach(idiom => {
        // Set event according to devide --> touchscreen or mouse
        const EVENT:string = ("ontouchstart" in document.documentElement)? "touchstart" : "mouseover";
        idiom.addEventListener(EVENT, () => {
            idiomBoxWidth();
        })
    });

    // --------------------------------- DOWNLOAD CV BUTTON -----------------------------------------
    // Donwload the to be available only once per page load
    let cvClicked:boolean = false;    
    document.getElementById("cv-button")?.addEventListener("click", function(event) {
        (!cvClicked)? cvClicked = true: event.preventDefault();        
    });

    // --------------------------------- SCROLL ANIMATIONS -----------------------------------------
    // Make disappear the arrow pointing down, when scrolling
    document.getElementById("page-content")?.addEventListener("scroll", () => {
        const ARROW: HTMLElement | null = document.getElementById("scroll-title");
        if (ARROW) ARROW.style.display = "none";
    });
    // Add / Remove show class to the elements that the user is viewing --> used to do the scroll animation with css. Used with <section> elements
    const OBSERVER:IntersectionObserver = new IntersectionObserver(elements => {
        elements.forEach(element => {
            (element.isIntersecting)? element.target.classList.add("show") : element.target.classList.remove("show");
        });
    });

    const HIDDEN_ELEMENTS:Element[] = Array.from(document.getElementsByClassName("hidden"));
    HIDDEN_ELEMENTS.forEach(element => OBSERVER.observe(element));
});

// Class to create programming languages or other technologies HTML elements: name, photo and knowledge progress bar
class Language {
    constructor(public language:string, public level:number){
        this.language = language;
        this.level = level;
    }

    // Initializate element (append language elements)
    addLanguage(container:HTMLElement):void {
        const element:string = `
            <div class='language-container'>
                <span class='language-title'>${this.language}</span>
                ${this.addKnowledge()}
            <div>
        `;
        container.innerHTML += element;
    }
    // Add knowledge bar, filled with language level
    addKnowledge():string {
        let levelColor = (this.level >= 5) ? "level-high" : "level-low"; // Add level second class to show different color for low - high knowledge
        // Create level element. Width is set with TS according to the level
        let levelElement:string = `<div class='level ${levelColor}' style='width:${this.level*10}%;'></div>`;        
        let levelContainer:string = `<div class='level-container'>${levelElement}</div>`;
        return levelContainer;
    }
}

// Function to adapt height of the picture to the one of the programming language levels
const adaptPictureHeight = ():void => {
    const PICTURE:HTMLElement | null = document.getElementById("profile-picture");
    const LEVELS:HTMLElement | null = document.getElementById("technologies-container");
    const LEVELS_HEIGHT:number | undefined = LEVELS?.offsetHeight;
    
    if (PICTURE){    
        PICTURE.style.height = LEVELS_HEIGHT + "px";
    }
}


// Function to adjust the width of the idioms boxes (containing language certificates) according to their position on the screen: to close to right borer is likely to overflow --> break box into lines
const idiomBoxWidth = ():void => {    
    const BOXES:Element[] =  Array.from(document.getElementsByClassName('idiom-box'));
    // Check where are the boxes positioned
    BOXES.forEach(idiom => {                      
        const IDIOM_BOX_END_X:number = idiom.getBoundingClientRect().x + idiom.getBoundingClientRect().width;                
        (idiom  as HTMLElement).style.width = (IDIOM_BOX_END_X > window.innerWidth)? 'fit-content':'max-content';        
    });
}



