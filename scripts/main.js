// ..:: MAIN SCRIPT ::..

// - Global Variables
let gridContainer = document.querySelector('.grid');
const gridSizeInput = document.getElementById('grid-size');
let currentResolution = Number(gridSizeInput.value);

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
createDefaultGrid();


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

gridSizeInput.addEventListener('change', adjustGridSize);





// ..:: FUNCTIONS ::..

// - Main Functions
function gridItemHover(event) {
    const item = event.target;

    item.style = `
        background-color: ${currentColoring.type == 'simple' ? currentColoring.color : currentColoring.color()};
    `;
    
}

function createDefaultGrid() {
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = 'repeat(8, minmax(10px, 10vw))'


    for (let i = 0; i < currentResolution ** 2; i++) {
        let gridItem = document.createElement('div');
        gridItem.className = 'grid-item';

        gridItem.addEventListener('mouseover', gridItemHover);

        gridContainer.appendChild(gridItem);
    }
}


// function adjustGridSize() {
//     let itemWidth = getWidth(gridContainer)/gridSizeInput;
//     let itemHeight = getHeight(gridContainer)/gridSizeInput;

//     let newGridContainer = document.createElement('div');
//     newGridContainer.classList.add('grid');
//     newGridContainer.id = 'grid-container'

//     for (let i = 0; i < currentResolution ** 2; i++) {
//         let gridItem = document.createElement('div');
//         gridItem.className = 'grid-item';
//         gridItem.style.width = `${itemWidth}px;`;
//         gridItem.style.height = `${itemHeight}px`;
//         gridItem.addEventListener('mouseover', gridItemHover);

//         newGridContainer.appendChild(gridItem);
//     }

//     // newGridContainer.style.backgroundColor = `red`;
//     // gridContainer.style.gridTemplateColumns = `repeat(${currentResolution}, ${itemWidth}px);`;
//     // gridContainer.style.gridTemplateRows = `repeat(${currentResolution}, ${itemHeight}px)`
//     gridContainer.replaceWith(newGridContainer);
//     // gridContainer.style.gridTemplateRows = `repeat(9, minmax(10px, 10vw));`;
//     document.getElementById('grid-container').style.gridTemplateColumns = `auto auto auto auto;`;

// }

function adjustGridSize() {
    oldResolution = currentResolution;
    currentResolution = Number(gridSizeInput.value);
    
    gridContainer.style.gridTemplateColumns = `repeat(${ currentResolution }, minmax(5px, 320px))`
    gridContainer.style.gridTemplateRows = `repeat(${ currentResolution }, minmax(5px, 320px)`

    // If the resolution change is positive, add the right amount of items
    if (currentResolution > oldResolution) {
        let endIndex = (currentResolution**2) - (oldResolution**2);
        console.log(endIndex)
        for (let i = 0; i < endIndex; i++) {
            let gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            gridItem.addEventListener('mouseover', gridItemHover);      

            gridContainer.appendChild(gridItem);
        }

    } 
    // Else, if the resolution change is negative, remove the right amout of items
    else if (currentResolution < oldResolution) {
        let endIndex = (oldResolution**2) - (currentResolution**2);
        for (let i = 0; i < endIndex; i++) {
            gridContainer.removeChild(gridContainer.lastElementChild);
        }

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