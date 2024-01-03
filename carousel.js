var slideIndex = [];
var rotationInterval = 8000;

window.onload = function() {
    var containers = document.getElementsByClassName("image-container");
    for (var i = 0; i < containers.length; i++) {
        slideIndex[i] = 0;
        carousel(containers[i], i);
    }
    

}

function carousel(container, index) {
    var i;
    var x = container.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.opacity = "0";
    }
    slideIndex[index]++;
    if (slideIndex[index] > x.length) {slideIndex[index] = 1} 
    x[slideIndex[index]-1].style.opacity = "1";
    setTimeout(function() { carousel(container, index); }, rotationInterval);
}


