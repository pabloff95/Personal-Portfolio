window.addEventListener("load", function() {
    const canvas = document.getElementById("canvas-element");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext("2d");
    const TRAIL_LENGTH = 50;
    const RADIUS_MAX = 35;
    const RADIUS_MIN = 10;
    const POSITION_RANDOM = 50;
    let mouseTrail = [];
    let trailColours = getColours(TRAIL_LENGTH);
    let stopMouse;
    const DISTANCE_CHECK = 25;

    // Mouse move on canvas
    document.querySelector("canvas").addEventListener("mousemove", function(event){
        // Add position to trail (last element --> head)
        let mousePosition = getMousePosition(canvas, event, POSITION_RANDOM);
        if (mouseTrail.length == 0 ){
            mouseTrail.push(mousePosition);
        } else if (outOfRange((mouseTrail.at(-1)["x"] - DISTANCE_CHECK), (mouseTrail.at(-1)["x"] + DISTANCE_CHECK), mousePosition["x"])
            && outOfRange((mouseTrail.at(-1)["y"] - DISTANCE_CHECK), (mouseTrail.at(-1)["y"] + DISTANCE_CHECK), mousePosition["y"])
        ) {
            clearInterval(stopMouse); // stop setinterval (avoids event mousemove from triggering multiple times before)
            context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
            mouseTrail.push(mousePosition);             

            if (mouseTrail.length > TRAIL_LENGTH) mouseTrail.shift();
            // Draw trail        
            let i = 0;
            mouseTrail.forEach(position => {
                position["color"] = trailColours[i];
                position["radius"] = getRandom(RADIUS_MAX, RADIUS_MIN);
                addCircle(position["x"], position["y"], context, position["color"], position["radius"]);
                i++;
            });            
            // If mouse stops --> time gets to 0 and deletes trail leaving just the mouse pointer's circle
            stopMouse = setInterval(() => {
                context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
                mouseTrail.shift();
                let j = 0;
                mouseTrail.forEach(circle => {
                    circle["radius"] = (circle["radius"] > 1) ? circle["radius"] - 1 : 0;
                    addCircle(circle["x"], circle["y"], context, circle["color"], circle["radius"]);
                    j++;
                });
            }, 1000 * 0.05);
        }   
    });

    // Mouse out of canvas
    canvas.addEventListener("mouseout", function(event){
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
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
const getMousePosition = (canvas, event, dispersion) => {
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

// Get a pattern of RGB colours
const getColours = (num) => {
    let colours = [];
    for (let i = 0; i < num; i++) {
        let colour = "rgb("+ getRandom(0,255) +", "+ getRandom(0,255) +", "+ getRandom(0,255) +")";
        colours.push(colour);
    };
    return colours;
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