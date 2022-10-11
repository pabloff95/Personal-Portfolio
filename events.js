window.addEventListener("load", function() {
    document.querySelector(".header-right").addEventListener("mouseover", function(event){
        console.log(event.offsetX);
    });
    mouseTrail(5,5);
});

const mouseTrail = (x, y) => {
    return x + y
}

// https://codepen.io/Mertl/pen/XWdyRwJ