window.addEventListener("load", function() {
    // Define constants and variables
    const CANVAS = document.getElementById("canvas-element");
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
    const CONTEXT = CANVAS.getContext("2d");
    let mouseTrail = [];
    let stopMouse;
    // Mouse trail setting
    const TRAIL_LENGTH = 20;
    const RADIUS_MIN = 10;
    const RADIUS_MAX = 25;    
    const POSITION_RANDOM = 15; // x and y random dispersion from mouse position
    const DISTANCE_CHECK = 5; // minimum distance for a new circle in trail from the last element in the trail

    // Draw mouse trail when mouse move on canvas
    CANVAS.addEventListener("mousemove", function(event){
        let newCircle = getnewCircle(CANVAS, event, POSITION_RANDOM); // Get mouse position in canvas
        // Check if it is the first move 
        if (mouseTrail.length == 0 ){
            // Get color and radius of new circle and add it to trail
            newCircle["radius"] = getRandom(RADIUS_MAX, RADIUS_MIN);
            newCircle["color"] = getColor();
            mouseTrail.push(newCircle);
            // Draw (first) circle
            addCircle(newCircle["x"], newCircle["y"], CONTEXT, newCircle["color"], newCircle["radius"]);

        // If trail was already started, check that the new position is out of range (avoid creating new circles to close to the previous ones)
        } else if (outOfRange((mouseTrail.at(-1)["x"] - DISTANCE_CHECK), (mouseTrail.at(-1)["x"] + DISTANCE_CHECK), newCircle["x"]) && outOfRange((mouseTrail.at(-1)["y"] - DISTANCE_CHECK), (mouseTrail.at(-1)["y"] + DISTANCE_CHECK), newCircle["y"])) {
            clearInterval(stopMouse); // stop setinterval that removes the circles (avoids multiple intervals running at the same time)
            CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height); // Clear canvas
            // Get color and radius of new circle and add it to trail
            newCircle["radius"] = getRandom(RADIUS_MAX, RADIUS_MIN);
            newCircle["color"] = getColor();
            mouseTrail.push(newCircle);  // Add position to trail (last element --> head)
            // Check that trail is not too long and draw trail
            if (mouseTrail.length > TRAIL_LENGTH) mouseTrail.shift();
            mouseTrail.forEach(position => {             
                addCircle(position["x"], position["y"], CONTEXT, position["color"], position["radius"]);
            });         
            // If mouse stops --> interval gets active and start reducing the radius until circles disapear
            stopMouse = setInterval(() => {
                CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height); // Clear canvas
                mouseTrail.forEach(circle => {
                    circle["radius"] = (circle["radius"] > 1) ? circle["radius"] - 0.75 : 0; // Reduce radius
                    addCircle(circle["x"], circle["y"], CONTEXT, circle["color"], circle["radius"]);
                });
            }, 1000 * 0.05);
        }

    });

    // If mouse out of canvas, clear it
    CANVAS.addEventListener("mouseout", function(event){
        CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height); // Clear canvas
        mouseTrail = [];        
    });
    
});

// Draw a circle in canvas
const addCircle = (x, y, context, colour, radius) => {   
    context.fillStyle = colour;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI); // Draw circle
    context.closePath();
    context.fill();    
}

// Get mouse position in canvas
const getnewCircle = (canvas, event, dispersion) => {
    let rect = canvas.getBoundingClientRect();
    // Get ratio
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;
    // Add random dispersion to the points
    let x = (event.clientX - rect.left) * scaleX;
    let y = (event.clientY - rect.top) * scaleY;

    return {
        "x" : getRandom(x + dispersion, x - dispersion),
        "y" : getRandom(y + dispersion, y - dispersion)
    };
}

// Get a random color from a list
const getColor = () => {
    let colors = ["#07977A", "#06866C", "#05755F",        
                  "#08a888", "#20B093", "#39B99F", 
                  "#52C2AB", "#6ACAB7", "#83D3C3", 
                  "#9CDCCF", "#B4E4DB", "#CDEDE7", 
                  "#E6F6F3", "#FEFEFF"];
    return colors[getRandom(colors.length, 0)];    
}

// Get a random radius in range
const getRandom = (max, min) => {
    return Math.round(Math.random() * (max - min)) + min;
}

// Check that value is not in range
const outOfRange = (min, max, value) => {
    return (value < min || value > max) ? true : false;
}


// New guide: https://codepen.io/renatorib/pen/xxWemq
// https://codepen.io/farisk/pen/bXvejG
// https://www.kirupa.com/canvas/creating_motion_trails.htm