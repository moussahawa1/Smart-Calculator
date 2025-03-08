function clearScreen() {
    document.getElementById('screen').value = '';
}

function deleteLast() {
    let screen = document.getElementById('screen');
    screen.value = screen.value.slice(0, -1);
}

function appendToScreen(value) {
    let screen = document.getElementById('screen');
    screen.value += value;
}

function calculateResult() {
    let screen = document.getElementById('screen');
    let expression = screen.value;

    // Replace mathematical symbols with JavaScript operators
    expression = expression.replace('×', '*');
    expression = expression.replace('÷', '/');
    expression = expression.replace('^', '**'); // Power operator

    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression: expression }),
    })
    .then(response => response.json())
    .then(data => {
        screen.value = data.result;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Drawing Pad Logic
let canvas = document.getElementById('drawingPad');
let ctx = canvas.getContext('2d');
let isDrawing = false;

ctx.lineWidth = 5; // Add line width for visible ink
ctx.lineCap = 'round'; // Add rounded line caps for smoother drawing

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});

function recognizeNumber() {
    //In a real application, you would use a number recognition library here.
    //For simplicity, we'll implement a very basic placeholder.
    let recognizedNumber = Math.floor(Math.random() * 10); // Simulate recognition (0-9)

    if (Math.random() < 0.2) { // Simulate a 20% chance of error
        alert("Error: Number not recognized.");
    } else {
        appendToScreen(recognizedNumber.toString());
        alert("Success: Number recognized as " + recognizedNumber);
        ctx.clearRect(0, 0, canvas.width, canvas.height); //Clear the canvas after recognition.
    }
}