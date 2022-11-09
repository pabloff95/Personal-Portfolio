window.addEventListener("load", function(){
    // SIDE-MENU BUTTONS EVENT CLICKS
    document.getElementById("home-button")?.addEventListener("click", () => {
        window.location.href = "../index.html";
    });
    document.getElementById("work-button")?.addEventListener("click", () => {
        window.location.href = "../work/work.html";
    });
    document.getElementById("about-button")?.addEventListener("click", () => {
        window.location.href = "../about/about.html";
    });
});