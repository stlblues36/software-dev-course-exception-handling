/*
Scenario:
You’ve been hired to help a local pet shelter digitize its animal adoption records. The program is meant to:
  
  Allow users to enter an animal type and adoption fee.
  
  Add the animal and fee to a list.
  
  Retrieve the adoption fee for a specific animal when requested.

However, the initial developer left the program in a buggy state, with missing exception-handling logic
and some errors in the implementation. Your job is to fix it!



Instructions
Start by Understanding the Errors:
Run the program and observe the exceptions that occur. Document what the exceptions are and where they happen.

Write Exception Handling Code:
Use try/catch blocks to handle the errors so the program doesn’t crash when incorrect input or unexpected situations occur.

Test and Debug:
Test the program with valid and invalid inputs to confirm that exceptions are handled gracefully
and the program continues running as intended.
*/


// Will need to import / install readline-sync if not done so already within project dir: npm install readline-sync 
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



/*
Problems to Solve

Invalid Input Errors:
  What happens if the user provides a negative adoption fee or leaves the name blank?
  What happens if the user tries to find the fee for an animal that hasn’t been added?

Code Flow Problems:
  What happens if the program throws an exception? Does the rest of the code continue running?

Structured Exception Handling:
  Add try/catch blocks to handle the above errors gracefully.
*/
