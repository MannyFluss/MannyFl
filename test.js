//create a functiont that returns a variable that is proportional to the size of a canvas element

function getCanvasSize(canvas) {
    var width = canvas.width;
    var height = canvas.height;
    return (width + height) / 2;
}