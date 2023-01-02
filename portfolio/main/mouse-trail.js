// Check if element is a mobile or tablet: mouse trail only active in computers. Source: https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
const isMobileTablet = () => {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

if (!isMobileTablet()) {
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
            // Remove from the trail array those circles with too small radius (when the trail is longer than the max trail lenght, the radius of the last elements are reduced)
            mouseTrail = mouseTrail.filter(circle => circle["radius"]>=1);
            mouseTrail.forEach((circle, index )=> {                             
                if (index < mouseTrail.length - TRAIL_LENGTH) { // Check if element is in a trail's position longer than the max trail length (remember: trail head = last element)
                    circle["radius"] = (circle["radius"] < 1) ? 0 : circle["radius"] - 1;                           
                }
                addCircle(circle["x"], circle["y"], CONTEXT, circle["color"], circle["radius"]);                           
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

}

