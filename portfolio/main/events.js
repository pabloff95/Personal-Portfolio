window.addEventListener("load", function(){
    // Set geometric shape height equal to width, according to phone CSS responsive breakpoint
    var square = document.querySelector("#square");
    if(window.innerWidth >= 768) { // 768px --> CSS mediaquery breakpoint for phones
        square.style.width = "40%";
        square.style.height = getComputedStyle(square).width;
    } else {
        square.style.height = "30%";
        square.style.width = getComputedStyle(square).height;
    }
    
    this.window.addEventListener("resize", function(){        
        if(window.innerWidth >= 768) { 
            square.style.width = "40%";
            square.style.height = getComputedStyle(square).width;            
        } 
    });

    // Button: click to relocate window 
    document.getElementById("home-button").addEventListener("click", () => {
        window.location.href = "/";
    });
    document.getElementById("work-button").addEventListener("click", () => {
        window.location.href = "/portfolio/work/work.html";
    });
    document.getElementById("about-button").addEventListener("click", () => {
        window.location.href = "/portfolio/about/about.html";
    });
    document.getElementById("contact-button").addEventListener("click", () => {
        window.location.href = "/portfolio/contact/contact.html";
    });

    // Add URL to logos of social media
    document.querySelector(".github").addEventListener("click", function(){
        window.open("https://github.com/pabloff95", "_blank").focus();
    });
    document.querySelector(".linkedin").addEventListener("click", function(){
        window.open("https://www.linkedin.com/in/pablo-fdezfdez/", "_blank").focus();
    });
});