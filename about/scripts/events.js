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
    (_c = document.getElementById("contact-button")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        window.location.href = "../contact/contact.html";
    });
});
