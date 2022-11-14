window.addEventListener("load", function(){
    //  --------------------------------- SIDE-MENU BUTTONS EVENT CLICKS  -----------------------------------------
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
    
    // ------------------------------------ CHANGE FORM BOX-SHADOW STYLE ---------------------------
    let formElements:HTMLCollection = document.getElementsByClassName("input");
    let form:HTMLElement = document.getElementsByTagName("form")[0];
    for (let i:number = 0; i<formElements.length; i++) {
        formElements[i].addEventListener("focusin", () => {
            form.style.boxShadow = "0px 10px 20px var(--contrast)";        
        });
        formElements[i].addEventListener("focusout", () => {
            form.style.boxShadow = "0px 10px 20px var(--main-dark)";        
        });
    }
});
