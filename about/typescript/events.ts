window.addEventListener("load", function(){
    // SIDE-MENU BUTTONS EVENT CLICKS
    document.getElementById("home-button")?.addEventListener("click", () => {
        window.location.href = "/";
    });
    document.getElementById("work-button")?.addEventListener("click", () => {
        window.location.href = "../work/work.html";
    });
    document.getElementById("contact-button")?.addEventListener("click", () => {
        window.location.href = "../contact/contact.html";
    });
});