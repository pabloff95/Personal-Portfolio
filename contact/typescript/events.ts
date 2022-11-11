window.addEventListener("load", function(){
    // SIDE-MENU BUTTONS EVENT CLICKS
    document.getElementById("home-button")?.addEventListener("click", () => {
        window.location.href = "/";
    });
    document.getElementById("work-button")?.addEventListener("click", () => {
        window.location.href = "../work/work.html";
    });
    document.getElementById("about-button")?.addEventListener("click", () => {
        window.location.href = "../about/about.html";
    });
    
    // CHANGE FORM BOX-SHADOW STYLE
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
