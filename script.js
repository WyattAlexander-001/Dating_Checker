let traits = [];

// Add event listener to handle "Enter" key for adding new traits
document.getElementById('new-trait').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission behavior
        addTrait(); // Call the addTrait function when Enter is pressed
    }
});

// Function to add a new trait dynamically
function addTrait() {
    let traitName = document.getElementById('new-trait').value.trim();

    if (traitName === '') {
        alert('Please enter a trait.');
        return;
    }

    // Convert input to title case
    traitName = toTitleCase(traitName);

    const traitElement = document.createElement('div');
    traitElement.className = 'trait';
    traitElement.innerHTML = `
        <span>${traitName}</span>
        <div class="trait-options">
            <label><input type="radio" name="${traitName}" value="1" onclick="checkAllSelected()"> Yes</label>
            <label><input type="radio" name="${traitName}" value="0" onclick="checkAllSelected()"> No</label>
        </div>
    `;

    document.getElementById('dynamic-form').appendChild(traitElement);

    traits.push(traitName);
    document.getElementById('new-trait').value = ''; // Clear input field

    checkAllSelected(); // Check if all radio buttons are selected
}

// Function to convert a string to title case
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Function to check if all traits have a selection
function checkAllSelected() {
    const calculateBtn = document.getElementById('calculate-btn');
    const traitElements = document.querySelectorAll('.trait');

    let allSelected = true;
    
    traitElements.forEach(traitElement => {
        const radios = traitElement.querySelectorAll('input[type="radio"]');
        const checked = Array.from(radios).some(radio => radio.checked);
        if (!checked) {
            allSelected = false;
        }
    });

    // Enable or disable the calculate button based on selections
    calculateBtn.disabled = !allSelected;
}

// Function to calculate the total score and percentage
function calculateScore() {
    const radioButtons = document.querySelectorAll('input[type="radio"]:checked');
    let score = 0;

    radioButtons.forEach(radio => {
        score += parseInt(radio.value);
    });

    const maxScore = traits.length; // Maximum possible score is equal to the number of traits
    const percentage = (score / maxScore) * 100; // Calculating percentage

    document.getElementById('result').innerText = `Your score is: ${score} (${percentage.toFixed(2)}%)`;
}
