window.addEventListener("load", function() {
    const canvas = document.getElementById("canvas-element");
    let x;
    let y;

    document.querySelector(".header-right").addEventListener("mouseover", function(event){
        let context = canvas.getContext("2d");

        var rect = canvas.getBoundingClientRect();
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;     
        
        addCircle(x, y, context);
    });
    
});

const addCircle = (x, y, context) => {
    const RADIUS = 2;

    context.fillStyle = "#ffffff"; // Colour
    context.beginPath();
    context.arc(x, y, RADIUS, 0, 2 * Math.PI); // Draw circle
    context.stroke();
    context.closePath();
    context.fill();

}

// https://codepen.io/farisk/pen/bXvejG