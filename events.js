window.addEventListener("load", function() {
    const canvas = document.getElementById("canvas-element");
    const context = canvas.getContext("2d");
    const TRAIL_LENGTH = 20
    let mouseTrail = [];
    let trailColours = getColours(TRAIL_LENGTH);
    let stopMouse;

    // Mouse move on canvas
    canvas.addEventListener("mousemove", function(event){
        clearInterval(stopMouse); // stop setinterval (avoids event mousemove from triggering multiple times before)
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        // Add position to trail (last element --> head)
        let mousePosition = getMousePosition(canvas, event);
        mouseTrail.push(mousePosition);
        if (mouseTrail.length > TRAIL_LENGTH) mouseTrail.shift();
        // Draw trail
        let i = 0;
        mouseTrail.forEach(position => {
            addCircle(position["x"],position["y"], context, trailColours[i]);
            i++;
        });     
        // If mouse stops --> time gets to 0 and deletes trail leaving just the mouse pointer's circle
        let x = 0;
        stopMouse = setInterval(() => {
            if (x < mouseTrail.length) addCircle(mouseTrail[x]["x"],mouseTrail[x]["y"], context, "black"); // Removes trail starting from end 
            x++;
            addCircle(mousePosition["x"],mousePosition["y"], context, trailColours.at(-1)); // Adds the mouse trail "head"
        }, 1000 * 0.025);
    });

    // Mouse out of canvas
    canvas.addEventListener("mouseout", function(event){
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        mouseTrail = [];        
    });
    
});

// Draw a circle in canvas
const addCircle = (x, y, context, colour) => {
    const RADIUS = 7.5;
    
    context.fillStyle = colour;
    context.beginPath();
    context.arc(x, y, RADIUS, 0, 2 * Math.PI); // Draw circle
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