// ..:: MAIN SCRIPT ::..

// - Global Variables
const gridContainer = document.querySelector('.grid');
const gridSize = document.getElementById('grid-size');

const coloringTypes = {
    default: '#dedede;',
    black: 'black',
    rainbow: getRandomColor
};

let currentColoring = {
    type: 'simple',
    color: coloringTypes.black
};


// - Prepare the default environment
adjustGridSize();


// - Event Listeners
const btnBlack = document.getElementById('btn-black');
const btnEraser = document.getElementById('btn-eraser');
const btnRainbow = document.getElementById('btn-rainbow');

btnBlack.addEventListener('click', () => {
    currentColoring.type = 'simple';
    currentColoring.color = coloringTypes.black;
    btnBlack.classList.add('active');

    btnEraser.classList.remove('active');
    btnRainbow.classList.remove('active');
});

btnEraser.addEventListener('click', () => {
    currentColoring.type = 'simple';
    currentColoring.color = coloringTypes.default;
    btnEraser.classList.add('active');
    
    btnBlack.classList.remove('active');
    btnRainbow.classList.remove('active');
});

btnRainbow.addEventListener('click', () => {
    currentColoring.type = 'function';
    currentColoring.color = coloringTypes.rainbow;
    btnRainbow.classList.add('active');
    
    btnBlack.classList.remove('active');
    btnEraser.classList.remove('active');
});

document.getElementById('btn-reset').addEventListener('click', () => {
    let gridItems = gridContainer.querySelectorAll('.grid-item');

    for (const item of gridItems) {
        item.style = `
            background-color: ${coloringTypes.default};
        `;
    }
});





// ..:: FUNCTIONS ::..

// - Main Functions
function gridItemHover(event) {
    const item = event.target;

    item.style = `
        background-color: ${currentColoring.type == 'simple' ? currentColoring.color : currentColoring.color()};
    `;
    
}

function adjustGridSize() {

    for (let i = 0; i < gridSize.value ** 2; i++) {
        let gridItem = document.createElement('div');
        gridItem.className = 'grid-item';

        gridItem.addEventListener('mouseover', gridItemHover);

        gridContainer.appendChild(gridItem);
    }
}

// - Helper Functions

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}