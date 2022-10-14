window.addEventListener("load", function() {
    const canvas = document.getElementById("canvas-element");
    const context = canvas.getContext("2d");
    const TRAIL_LENGTH = 20
    const RADIUS = 12;
    const REDUCE_RADIUS = 0.5;
    let mouseTrail = [];
    let trailColours = getColours(TRAIL_LENGTH);
    let stopMouse;

    // Mouse move on canvas
    document.querySelector("header").addEventListener("mousemove", function(event){
        clearInterval(stopMouse); // stop setinterval (avoids event mousemove from triggering multiple times before)
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        // Add position to trail (last element --> head)
        let mousePosition = getMousePosition(canvas, event);
        mouseTrail.push(mousePosition);
        if (mouseTrail.length > TRAIL_LENGTH) mouseTrail.shift();
        // Draw trail
        let i = 0;
        let radius = RADIUS;
        mouseTrail.forEach(position => {
            addCircle(position["x"],position["y"]+((i/2)-(TRAIL_LENGTH/2)), context, trailColours[i], radius);
            addCircle(position["x"],position["y"]+((TRAIL_LENGTH/2)-(i/2)), context, trailColours[i], radius);
            i++;
            radius -= REDUCE_RADIUS;
        });    
        // If mouse stops --> time gets to 0 and deletes trail leaving just the mouse pointer's circle
        let x = 0;
        radius = RADIUS;
        let mouseRadius = RADIUS - (REDUCE_RADIUS*TRAIL_LENGTH);
        stopMouse = setInterval(() => {
            if (x < mouseTrail.length) {
                addCircle(mouseTrail[x]["x"],mouseTrail[x]["y"]+((x/2)-(TRAIL_LENGTH/2)), context, "black", radius); // Removes trail starting from end 
                addCircle(mouseTrail[x]["x"],mouseTrail[x]["y"]+((TRAIL_LENGTH/2)-(x/2)), context, "black", radius); // Removes trail starting from end 
                addCircle(mousePosition["x"],mousePosition["y"], context, trailColours.at(-1), mouseRadius); // Adds the mouse trail "head"
                radius -= REDUCE_RADIUS;
            } else {
                mouseTrail = [];
            }
            x++;
        }, 1000 * 0.025);
    });

    // Mouse out of canvas
    canvas.addEventListener("mouseout", function(event){
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        mouseTrail = [];        
    });
    
});

/*const drawPath = (context, trail) => {
    let controlPoint1 = trail.at(trail.length/2);
    let controlPoint2 = trail.at((trail.length/3)*2);

    context.fillStyle = "red";
    context.beginPath();
    context.moveTo(trail.at(-1)["x"], trail.at(-1)["y"]);
    context.lineTo(trail[0]["x"], trail[0]["y"]);
    context.bezierCurveTo(controlPoint1["x"], controlPoint1["y"], controlPoint2["x"], controlPoint2["y"], trail[0]["x"], trail[0]["y"]); 
    context.lineTo(trail.at(-1)["x"], trail.at(-1)["y"]);
    context.closePath();
    context.fill();
}*/


// Draw a circle in canvas
const addCircle = (x, y, context, colour, radius) => {   
    context.fillStyle = colour;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI); // Draw circle
    context.closePath();
    context.fill();
}

// Get mouse position in canvas
const getMousePosition = (canvas, event) => {
    let rect = canvas.getBoundingClientRect();
    // Get ratio
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;

    return {
        "x" : (event.clientX - rect.left) * scaleX,
        "y" : (event.clientY - rect.top) * scaleY
    };
}

// Get a pattern of RGB colours
const getColours = (num) => {
    let colours = [];
    let interval = 255 / num;
    for (let i = interval; i < 256; i+=interval) {
        let colour = "rgb(0, 0, " + Math.round(i) +")";
        colours.push(colour);
    };

    return colours;
}

// https://codepen.io/farisk/pen/bXvejG
// https://www.kirupa.com/canvas/creating_motion_trails.htm