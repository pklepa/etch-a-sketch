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

gridSizeInput.addEventListener('change', adjustGridSize);

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


// Related to the modals
const modal = document.querySelector('#modal');
let modalTitle = document.querySelector('#modal .header h1');
let modalBody = document.querySelector('#modal .body');

const about = document.querySelector('#about');
about.addEventListener('click', handleAboutClick);

const help = document.querySelector('#help');
help.addEventListener('click', handleHelpClick);

const modalCloseBtn = document.querySelector('#modal a');
modalCloseBtn.addEventListener('click', () => {
    modal.classList.add('hide');
})



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


function handleAboutClick(){
    modal.classList.remove('hide');

    modalTitle.textContent = 'About';

    let modalBodyText = `<p>This web page was made by pklepa as an early learning experience in web development.<br>
        <br>
        You can see more of my work at <a style='font-weight: bold; color: white' href="https://github.com/pklepa">https://github.com/pklepa</a></p>`;
    modalBody.innerHTML = modalBodyText;
}


function handleHelpClick(){
    modal.classList.remove('hide');

    modalTitle.textContent = 'Help'

    let modalBodyText = `<p>Etch-a-Sketch is a popular mechanical drawing toy invented in the late 1950s by Andre Cassagnes. 
    The toy was a hit for the greater part of the second half of the 20th century and is still today recognized and beloved by those who come across it.<br>
    <br>
    This site aims to recreate the original concept of the toy by implementing a pixelized grid in which you can use your imagination and draw on!<br>
    <br>
    Although the main objective of this project is to exercise and learn ever bit more of web development, I'll still leave the invitation for you to have fun with it.<br>
    <br>
    That's it! Thanks for visiting.    
    </p>`;
    modalBody.innerHTML = modalBodyText;
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