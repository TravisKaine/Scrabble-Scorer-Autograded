// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");
const vowels =['A','E','I','O','U']
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

//This function takes a word as input, converts it to uppercase. For each letter,//
//it checks its point value based on the oldPointStructure object and constructs a string//
//with the letter and its point value.//

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

//This function prompts the user to enter a word to score, prompts the user to select a scoring algorithm,// 
//calculates the score using the selected algorithm.//

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   console.log();
   let wordToScore = input.question("Enter a word to score: ");
   let scorer = scorerPrompt();
   scrabbleScore = scorer.scorerFunction(wordToScore);
   console.log();
   console.log(`Score for '${wordToScore}': ${scrabbleScore}`);

};

//This function takes a word as input and returns the length of the word as its score.//

function simpleScorer(word){
  return word.length;
};

//This function takes a word as input, converts it to uppercase, iterates over each letter,//
//and assigns points based on whether the letter is a vowel or consonant.//

function vowelBonusScorer(word){
  let points = 0;
  word = word.toUpperCase();
  for (const letter of word) {
    if (vowels.includes(letter)) {
      points += 3;
    } else {
      points += 1;
    }
  }
  return points;
}

//This function takes a word as input, converts it to lowercase, iterates over each letter,//
//looks up its point value from the newPointStructure object.//

function scrabbleScorer(word) {
  let points = 0;
  for (const letter of word) {
    points += newPointStructure[letter.toLowerCase()] || 0;
  }
  return points;
}

//This array contains three objects, each representing a scoring algorithm.//
//The scorerFunction property references one of the three scoring functions defined above.//

 const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScorer
  },
];
 
// This function prompts the user to select a scoring algorithm by displaying the available options.//

function scorerPrompt(word) {
   console.log("which scoring algorithm would like to use \n");

   for (i = 0; i < scoringAlgorithms.length; i++) {
     console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }
 
   let value = input.question("Enter 0, 1, or 2: ");
   return scoringAlgorithms[value];
 }

// This function takes the oldPointStructure object, looks over its keys and values,//
//and transforms it into a new object where the keys are lowercase letters and the values are their point values.//

function transform(obj) {
  let newObj = {};
  for (const key in obj) {
    for (const letter of obj[key]) {
      newObj[letter.toLowerCase()] = Number(key);
    }
  }
  return newObj;
}

//This object stores the transformed point structure, where each lowercase letter is mapped to its values.//

const newPointStructure = transform(oldPointStructure);

function runProgram() {
 initialPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
