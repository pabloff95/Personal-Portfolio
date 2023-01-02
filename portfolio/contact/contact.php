<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Welcome to my portfolio website, this section shows a form to contact me via email.">
    <meta name="keywords" content="web developer, portfolio, projects, frontend, javascript, contact">
    <meta name="author" content="Pablo Fernandez">
    <title>Pablo Web Development</title>    
    <script src="scripts/events.js"></script>    
    <link rel="stylesheet" href="/portfolio/style/main-variables.css">
    <link rel="stylesheet" href="/portfolio/style/main-layout.css">
    <link rel="stylesheet" href="contact.css">
    <link rel="icon" type="image/x-icon" href="/portfolio/style/pictures/favicon.png">
    <?php
        // Check all inputs from user
            // function to check that form elements are not empy
            function wordNotEmpty($input) {            
                if ($input !== "") {
                    return true;
                } else{
                    return false;
                }            
            } 
            // function to check forbiden words (ex.: <script>)
            function noForbiddenWords($input) {
                if (strpos($input, "<script>") !== false){ // Check match with word
                    return false;
                } else {
                    return true;
                }
            }
            // function to escape strings 
            function escape($input) {
                return  htmlspecialchars($input, ENT_QUOTES, "UTF-8", false);
            }
            // Do all security checks
            function checkInput($input) {
                if (wordNotEmpty($input) && noForbiddenWords($input)){
                    return escape($input);
                } else {
                    return "ERROR";
                }
            }

        // Send email 
        function sendMail($name, $mail, $text){
            // Parameters
            $to = "pablo.fernandezfernandez@outlook.com";
            $subject = "Contact from pablo-webdevelopment";
            $message = "Hello ,\r\n \r\n".        
                "NEW MESSAGE FROM: " . $name . "\r\n \r\n" .
                "CONTACT: " . $mail . "\r\n \r\n" .
                "MESSAGE:" . "\r\n \r\n" . $text . "\r\n \r\n";
            $header = 'From: service@pablo-webdevelopment.com';
            // Send email
            mail($to, $subject, $message, $header);
        }        

        // Check if email can be sent
        if (isset($_POST['contactForm'])){                 
            sendMail(checkInput($_POST['name']), checkInput($_POST['email']), checkInput($_POST['message']));                                                   
        }                    
    ?>
</head>
<body>
    <nav>
        <div id="logo">
            <div id="logo-container">
                <div id="logo-main-container">
                    <p><span class="logo-side">&#60;</span><span id="logo-main">P</span><span class="logo-side">&#62;</span></p>
                </div>
                <p id="logo-text">Web Developer</p>
            </div>
        </div>
        <div id="buttons">
            <button class="menu-button" id="home-button">HOME</button>                         
            <button class="menu-button" id="work-button">WORK</button>
            <button class="menu-button" id="about-button">ABOUT</button>
            <button class="menu-button" id="contact-button">CONTACT</button>                
        </div>
    </nav>
    
    <div id="page-content">
        <header>
            <div id="main-title">
                <span>&#32;CONTACT&#32;</span>
            </div><br>
        </header>
        <div id="page-main-content">
            <section>
                <span class="subtitle-element">Where to find me</span>
                    <div id="contact-networks">
                        <div class="contact">
                            <img alt="Location" class="contact-img clickable" id="location-img">
                            <span class="contact-img-subtext-title">Based in</span>
                            <span class="contact-img-subtext-text">Bavaria, Germany</span>
                        </div>
                        <div class="contact">
                            <img alt="GitHub Profile" class="contact-img clickable" id="github-img">
                            <span class="contact-img-subtext-title">GitHub</span>                            
                        </div>
                        <div class="contact">
                            <img alt="LinkedIn Profile" class="contact-img clickable" id="linkedin-img">
                            <span class="contact-img-subtext-title">LinkedIn</span>                            
                        </div>
                    </div>                
            </section>
            <main>               
                    <?php 
                        if (isset($_POST['contactForm'])){ 
                    ?>
                            <div id="sent-form-container">
                                <div class="sent-form-element">
                                    <img src="pictures\form-confirm.svg" alt="message sent">
                                </div>
                                <div class="sent-form-element">
                                    <h1>Thank you <?php echo checkInput($_POST['name']); ?>!</h1>
                                    <p class="mail-sent-text">Your message was sent succesfully.</p>
                                    <p class="mail-sent-text">I will reply you as soon as possible.</p>
                                </div>
                            </div>
                    <?php 
                        } else {
                    ?>                    
                        <span class="subtitle-element">Send an email</span>
                        
                        <!--form action="contact.html"-->
                        <form action="contact.php" method="POST">
                            <div class="form-element">                    
                                <input type="text" class="text-field input" name="name" id="name-input" placeholder="Name" autocomplete="off" maxlength="60" required />
                                <label class="label-element">Name</label>
                                <span class="form-error" id="name-error-tag">Invalid name format</span>                                                                
                            </div>
                            <br>
                            <div class="form-element">                    
                                <input type="email" class="text-field input" name="email" id="email-input" placeholder="Email"  autocomplete="off" maxlength="150" required />                                                            
                                <label class="label-element">Email</label>
                                <span class="form-error" id="email-error-tag">Invalid email format</span>                        
                            </div>
                            <div class="form-element textarea-container">                        
                                <textarea class="textarea-field input" name="message" id="message-input" placeholder="Write your message here ..." required></textarea>                                                                         
                                <label id="label-textarea">Message</label>
                            </div>
                            <div class="form-element" id="submit-container">
                                <input type="submit" value="SEND" name="contactForm" id="submit-button">
                                <div id="submit-label"><label>All fields must be properly filled</label></div>
                            </div>                    
                        </form>
                    <?php
                        } 
                    ?>

                
            </main>
        </div>
    </div>    
</body>
</html>