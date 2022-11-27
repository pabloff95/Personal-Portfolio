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
    
    // --------------------------------- URLs TO CONTACT ICONS (section) -----------------------------------------
    // Add URL to contact icons
    document.querySelector("#location-img")?.addEventListener("click", function(){
        window.open("https://www.google.com/maps/place/88682+Salem/@47.7705336,9.2936284,12z/data=!3m1!4b1!4m5!3m4!1s0x479a573b01421c2f:0x41f6bb7a5df84e0!8m2!3d47.7621271!4d9.2940477", "_blank")?.focus();
    });
    document.querySelector("#github-img")?.addEventListener("click", function(){
        window.open("https://github.com/pabloff95", "_blank")?.focus();
    });
    document.querySelector("#linkedin-img")?.addEventListener("click", function(){
        window.open("https://www.linkedin.com/in/pablo-fdezfdez/", "_blank")?.focus();
    });    

    // ------------------------------------ CHANGE FORM BOX-SHADOW STYLE ---------------------------
    let formElements:HTMLCollection = document.getElementsByClassName("input");
    let form:HTMLElement = document.getElementsByTagName("form")[0];
    for (let i:number = 0; i<formElements.length; i++) {
        formElements[i].addEventListener("focusin", () => {
            form.style.boxShadow = "0 5px 8px var(--contrast)";        
        });
        formElements[i].addEventListener("focusout", () => {
            form.style.boxShadow = "0 5px 8px var(--main-dark)";        
        });
    }
    document.getElementById("submit-button")?.addEventListener("mouseover", () => {
        form.style.boxShadow = "0 5px 8px var(--contrast)";        
    });    
    document.getElementById("submit-button")?.addEventListener("mouseout", () => {
        form.style.boxShadow = "0 5px 8px var(--main-dark)";        
    });    

    // ------------------------------------- INPUT VALIDATION -------------------------------------
    const NAME_INPUT:HTMLElement | null = document.getElementById("name-input");
    const NAME_ERROR_TAG:HTMLElement | null = document.getElementById("name-error-tag");
    const EMAIL_INPUT:HTMLElement | null = document.getElementById("email-input");
    const EMAIL_ERROR_TAG:HTMLElement | null = document.getElementById("email-error-tag");
    // Validate name input
    if (NAME_INPUT && NAME_ERROR_TAG) {
        NAME_INPUT.addEventListener("input", () => {
            let text:string = (<HTMLInputElement>NAME_INPUT).value;
            let showError:boolean = false;

            // Do not allow numbers
            text.split("").forEach(char => {
                if (!isNaN(parseInt(char))) {
                    showError = true;
                    return;
                }
            })
            // Do not allow specific characters (ex.: <, >, -)
            const FORBIDEN_CHARACTERS:string[] = [",", "<", ">", "-", ".", "\"", "(", ")"];
            FORBIDEN_CHARACTERS.forEach(char => {
                if (text.split("").includes(char)) {
                    showError = true;
                    return;
                }
            });
            // Max input length: 60 char (also specified in HTML tag property)
            if (text.length > 60) showError = true;
            
            // Update error tag visibility
            NAME_ERROR_TAG.style.display = (showError)? "unset" : "none";
        });
    }
    // Validate email input
    if (EMAIL_INPUT && EMAIL_ERROR_TAG) { 
        EMAIL_INPUT.addEventListener("input", () => {
            let text:string = (<HTMLInputElement>EMAIL_INPUT).value;
            let showError:boolean = false;

            // If there is no text do not show error, otherwise compare email with regex expression
            const regexEmail:RegExp = new RegExp("^([A-z]|\\d)([A-z]|\\d|-|_|\\+|\\.)*@(([A-z]|\\d)+-?\\d?[A-z]*)\\.([A-z]{1,10})$", "g");
            showError = (text === "")? false : !regexEmail.test(text);           

            // Update error tag visibility
            EMAIL_ERROR_TAG.style.display = (showError)? "unset" : "none";
        });
    }

    // Disable submit button until all fields are correctly filled
    const SUBMIT_BUTTON:HTMLElement | null = document.getElementById("submit-button");
    SUBMIT_BUTTON?.parentElement?.addEventListener("mouseover", () => {
        const NAME_CONTENT:string = (<HTMLInputElement>NAME_INPUT)?.value;
        const EMAIL_CONTENT:string = (<HTMLInputElement>EMAIL_INPUT)?.value;
        const MESSAGE_CONTENT:string|null = (<HTMLInputElement>document.getElementById("message-input")).value;
        let allowMessage = false;

        // Verify all conditions
            // 1- First line: check that name and email inputs are correct
            // 2- Second line: check that fields are not empty
        allowMessage = (NAME_ERROR_TAG?.style.display === "none" && EMAIL_ERROR_TAG?.style.display === "none" &&
                        NAME_CONTENT !== "" && EMAIL_CONTENT !== "" && MESSAGE_CONTENT !== "")? true : false;        

        // Update submit button
        (<HTMLInputElement>SUBMIT_BUTTON).disabled = (allowMessage)? false : true;
    });
});
