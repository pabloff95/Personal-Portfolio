"use strict";
window.addEventListener("load", function () {
    var _a, _b, _c, _d, _e, _f;
    //  --------------------------------- SIDE-MENU BUTTONS EVENT CLICKS  -----------------------------------------
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
        window.location.href = "/portfolio/contact/contact.html";
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
    // ------------------------------------ CHANGE FORM BOX-SHADOW STYLE ---------------------------
    let formElements = document.getElementsByClassName("input");
    let form = document.getElementsByTagName("form")[0];
    for (let i = 0; i < formElements.length; i++) {
        formElements[i].addEventListener("focusin", () => {
            form.style.boxShadow = "0px 10px 20px var(--contrast)";
        });
        formElements[i].addEventListener("focusout", () => {
            form.style.boxShadow = "0px 10px 20px var(--main-dark)";
        });
    }
});
