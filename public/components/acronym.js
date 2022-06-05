// Modification of the task list code to better suit the functionality of an acronym feature (i.e. easy text input)

// Basic form DOM elements
const form = document.getElementById("acronymform");
const button = document.querySelector("#acronymform > button");

// Selector for the acronym list output
var acronymlist = document.querySelector("#acronymlist > ul");

// DOM elements for the input fields
var wordInput = document.getElementById("wordInput");
var descInput = document.getElementById("descInput");

// Form submission event listener
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let word = wordInput.value;
    let desc = descInput.value;
    if (acronym) {
        addAcronym(word, desc);
    }
})

// Create global array to track acronyms
var acronymListArray = [];

// Function to add acronym with user inputs as parameters
function addAcronym(acronymWord, acronymDescription) {
    let d = new Date();
    let dateCreated = d.getFullYear();
    let acronym = {
        id: Date.now(),
        acronymWord,
        acronymDescription,
        dateCreated
    };
    acronymListArray.push(acronym);
    console.log(acronymListArray);
    renderAcronym(acronym);
}

// Function to display acronym on screen
function renderAcronym(acronym) {

    // Call function - checks if a acronyms has been added
    updateEmpty();

    // Create HTML elements
    let item = document.createElement("li");
    item.setAttribute('data-id', acronym.id);
    item.innerHTML = "<h2>" + acronym.acronymWord + "</h2>" + "<p>" + acronym.acronymDescription + "</p>";
    acronymlist.appendChild(item);

    // Extra acronyms DOM elements
    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("Delete");
    delButton.appendChild(delButtonText);
    item.appendChild(delButton);

    // Event Listeners for DOM elements
    delButton.addEventListener("click", function(event) {
        event.preventDefault();
        let id = event.target.parentElement.getAttribute('data-id');
        let index = acronymListArray.findIndex(acronym => acronym.id === Number(id));
        removeItemFromArray(acronymListArray, index)
        console.log(acronymListArray);
        updateEmpty();
        item.remove();
    })

    form.reset();

}

// Function to remove item from array
function removeItemFromArray(arr, index) {
    if (index > -1) {
        arr.splice(index, 1)
    }
    return arr;
}


// Function to hide the 'you haven't added any acronyms' text
function updateEmpty() {
    if (acronymListArray.length > 0) {
        document.getElementById('emptyAcronymList').style.display = 'none';
    } else {
        document.getElementById('emptyAcronymList').style.display = 'block';
    }
}


