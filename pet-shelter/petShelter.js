const readlineSync = require('readline-sync');

let animals = [];
let fees = [];

function addAnimal(name, fee) {
    // Input validation
    if (!name || name.trim() === '') {
        throw new Error("Animal name cannot be empty!");
    }
    if (isNaN(fee) || fee < 0) {
        throw new Error("Adoption fee must be a valid positive number!");
    }

    // Check for duplicate animals
    if (animals.includes(name)) {
        throw new Error("This animal is already in the system!");
    }

    animals.push(name);
    fees.push(fee);
}

function getAdoptionFee(animalName) {
    if (!animalName || animalName.trim() === '') {
        throw new Error("Animal name cannot be empty!");
    }

    let index = animals.indexOf(animalName);
    if (index === -1) {
        throw new Error("Animal not found in records!");
    }
    return fees[index];
}

// Main program
console.log("Welcome to the Pet Shelter System");

while (true) {
    try {
        let action = readlineSync.question("\nChoose an action: 'add', 'fee', or 'exit': ").toLowerCase();

        if (action === "exit") {
            console.log("Goodbye!");
            break;
        }

        if (action === "add") {
            try {
                let animal = readlineSync.question("Enter the animal's name: ");
                let fee = Number(readlineSync.question("Enter the adoption fee: "));
                
                addAnimal(animal, fee);
                console.log(`Success! ${animal} added with a fee of $${fee}.`);
            } catch (error) {
                console.log(`Error adding animal: ${error.message}`);
            }

        } else if (action === "fee") {
            try {
                let animal = readlineSync.question("Enter the animal's name to find its adoption fee: ");
                let fee = getAdoptionFee(animal);
                console.log(`${animal}'s adoption fee is $${fee}.`);
            } catch (error) {
                console.log(`Error retrieving fee: ${error.message}`);
            }

        } else {
            console.log("Invalid action. Please choose 'add', 'fee', or 'exit'.");
        }

    } catch (error) {
        console.log(`An unexpected error occurred: ${error.message}`);
        console.log("Please try again.");
    }
}