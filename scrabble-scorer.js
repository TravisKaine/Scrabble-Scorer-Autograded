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

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   console.log();
   let wordToScore = input.question("Enter a word to score: ");
   let scorer = scorerPrompt();
   scrabbleScore = scorer.scorerFunction(wordToScore);
   console.log();
   console.log(`Score for '${wordToScore}': ${scrabbleScore}`);

};

function simpleScorer(word){
  return word.length;
};

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

function scrabbleScorer(word) {
  let points = 0;
  for (const letter of word) {
    points += newPointStructure[letter.toLowerCase()] || 0;
  }
  return points;
}

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
 

function scorerPrompt(word) {
   console.log("which scoring algorithm would like to use \n");

   for (i = 0; i < scoringAlgorithms.length; i++) {
     console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }
 
   let value = input.question("Enter 0, 1, or 2: ");
   return scoringAlgorithms[value];
 }

function transform(obj) {
  let newObj = {};
  for (const key in obj) {
    for (const letter of obj[key]) {
      newObj[letter.toLowerCase()] = Number(key);
    }
  }
  return newObj;
}

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
