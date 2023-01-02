window.addEventListener("load", function(){
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
        window.location.href = "/portfolio/contact/contact.php";
    });

    // Add URL to logos of social media
    document.querySelector(".github").addEventListener("click", function(){
        window.open("https://github.com/pabloff95", "_blank").focus();
    });
    document.querySelector(".linkedin").addEventListener("click", function(){
        window.open("https://www.linkedin.com/in/pablo-fdezfdez/", "_blank").focus();
    });
});