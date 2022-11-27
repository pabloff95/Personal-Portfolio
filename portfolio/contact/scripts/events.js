"use strict";
window.addEventListener("load", function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
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
    // --------------------------------- URLs TO CONTACT ICONS (section) -----------------------------------------
    // Add URL to contact icons
    (_e = document.querySelector("#location-img")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () {
        var _a;
        (_a = window.open("https://www.google.com/maps/place/88682+Salem/@47.7705336,9.2936284,12z/data=!3m1!4b1!4m5!3m4!1s0x479a573b01421c2f:0x41f6bb7a5df84e0!8m2!3d47.7621271!4d9.2940477", "_blank")) === null || _a === void 0 ? void 0 : _a.focus();
    });
    (_f = document.querySelector("#github-img")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () {
        var _a;
        (_a = window.open("https://github.com/pabloff95", "_blank")) === null || _a === void 0 ? void 0 : _a.focus();
    });
    (_g = document.querySelector("#linkedin-img")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", function () {
        var _a;
        (_a = window.open("https://www.linkedin.com/in/pablo-fdezfdez/", "_blank")) === null || _a === void 0 ? void 0 : _a.focus();
    });
    // ------------------------------------ CHANGE FORM BOX-SHADOW STYLE ---------------------------
    let formElements = document.getElementsByClassName("input");
    let form = document.getElementsByTagName("form")[0];
    for (let i = 0; i < formElements.length; i++) {
        formElements[i].addEventListener("focusin", () => {
            form.style.boxShadow = "0 5px 8px var(--contrast)";
        });
        formElements[i].addEventListener("focusout", () => {
            form.style.boxShadow = "0 5px 8px var(--main-dark)";
        });
    }
    (_h = document.getElementById("submit-button")) === null || _h === void 0 ? void 0 : _h.addEventListener("mouseover", () => {
        form.style.boxShadow = "0 5px 8px var(--contrast)";
    });
    (_j = document.getElementById("submit-button")) === null || _j === void 0 ? void 0 : _j.addEventListener("mouseout", () => {
        form.style.boxShadow = "0 5px 8px var(--main-dark)";
    });
    // ------------------------------------- INPUT VALIDATION -------------------------------------
    const NAME_INPUT = document.getElementById("name-input");
    const NAME_ERROR_TAG = document.getElementById("name-error-tag");
    const EMAIL_INPUT = document.getElementById("email-input");
    const EMAIL_ERROR_TAG = document.getElementById("email-error-tag");
    // Validate name input
    if (NAME_INPUT && NAME_ERROR_TAG) {
        NAME_INPUT.addEventListener("input", () => {
            let text = NAME_INPUT.value;
            let showError = false;
            // Do not allow numbers
            text.split("").forEach(char => {
                if (!isNaN(parseInt(char))) {
                    showError = true;
                    return;
                }
            });
            // Do not allow specific characters (ex.: <, >, -)
            const FORBIDEN_CHARACTERS = [",", "<", ">", "-", ".", "\"", "(", ")"];
            FORBIDEN_CHARACTERS.forEach(char => {
                if (text.split("").includes(char)) {
                    showError = true;
                    return;
                }
            });
            // Max input length: 60 char (also specified in HTML tag property)
            if (text.length > 60)
                showError = true;
            // Update error tag visibility
            NAME_ERROR_TAG.style.display = (showError) ? "unset" : "none";
        });
    }
    // Validate email input
    if (EMAIL_INPUT && EMAIL_ERROR_TAG) {
        EMAIL_INPUT.addEventListener("input", () => {
            let text = EMAIL_INPUT.value;
            let showError = false;
            // If there is no text do not show error, otherwise compare email with regex expression
            const regexEmail = new RegExp("^([A-z]|\\d)([A-z]|\\d|-|_|\\+|\\.)*@(([A-z]|\\d)+-?\\d?[A-z]*)\\.([A-z]{1,10})$", "g");
            showError = (text === "") ? false : !regexEmail.test(text);
            // Update error tag visibility
            EMAIL_ERROR_TAG.style.display = (showError) ? "unset" : "none";
        });
    }
    // Disable submit button until all fields are correctly filled
    const SUBMIT_BUTTON = document.getElementById("submit-button");
    (_k = SUBMIT_BUTTON === null || SUBMIT_BUTTON === void 0 ? void 0 : SUBMIT_BUTTON.parentElement) === null || _k === void 0 ? void 0 : _k.addEventListener("mouseover", () => {
        const NAME_CONTENT = NAME_INPUT === null || NAME_INPUT === void 0 ? void 0 : NAME_INPUT.value;
        const EMAIL_CONTENT = EMAIL_INPUT === null || EMAIL_INPUT === void 0 ? void 0 : EMAIL_INPUT.value;
        const MESSAGE_CONTENT = document.getElementById("message-input").value;
        let allowMessage = false;
        // Verify all conditions
        // 1- First line: check that name and email inputs are correct
        // 2- Second line: check that fields are not empty
        allowMessage = ((NAME_ERROR_TAG === null || NAME_ERROR_TAG === void 0 ? void 0 : NAME_ERROR_TAG.style.display) === "none" && (EMAIL_ERROR_TAG === null || EMAIL_ERROR_TAG === void 0 ? void 0 : EMAIL_ERROR_TAG.style.display) === "none" &&
            NAME_CONTENT !== "" && EMAIL_CONTENT !== "" && MESSAGE_CONTENT !== "") ? true : false;
        // Update submit button
        SUBMIT_BUTTON.disabled = (allowMessage) ? false : true;
    });
});
