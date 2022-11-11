"use strict";
window.addEventListener("load", function () {
    var _a, _b, _c;
    // SIDE-MENU BUTTONS EVENT CLICKS
    (_a = document.getElementById("home-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        window.location.href = "/";
    });
    (_b = document.getElementById("work-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        window.location.href = "../work/work.html";
    });
    (_c = document.getElementById("about-button")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        window.location.href = "../about/about.html";
    });
    // CHANGE FORM BOX-SHADOW STYLE
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
