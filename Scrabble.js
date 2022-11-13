// Plan: first create a tile class. This will have letter and points keys.
// Create a function that uses this class to create each tile, then create duplicates of tiles that have duplicates
const dict = await Deno.readTextFile("./dictionary.txt"); //This isn't working???

export class Tile {
  constructor(letter) {
    this.letter = letter;
    this.points = this.pointsFor();
  }

  pointsFor() {
    const points = {
      1: ["E", "A", "I", "O", "N", "R", "T", "L", "S", "U"],
      2: ["D", "G"],
      3: ["B", "C", "M", "P"],
      4: ["F", "H", "V", "W", "Y"],
      5: ["K"],
      8: ["J", "X"],
      10: ["Q", "Z"],
    };
    for (let i = 0; i < Object.keys(points).length; i++) {
      if (Object.values(points)[i].includes(this.letter)) {
        return Number(Object.keys(points)[i]);
      }
    }
  }
}

export class AllTiles {
  constructor() {
    this.tiles = this.createAllTiles();
  }

  createAllTiles() {
    let allTiles = [];
    const numberOfTiles = {
      1: ["K", "J", "X", "Q", "Z"],
      2: ["B", "C", "M", "P", "F", "H", "V", "W", "Y"],
      3: ["G"],
      4: ["L", "S", "U", "D"],
      6: ["N", "R", "T"],
      8: ["O"],
      9: ["A", "I"],
      12: ["E"],
    };
    for (let i = 0; i < Object.keys(numberOfTiles).length; i++) {
      for (let j = 0; j < Number(Object.keys(numberOfTiles)[i]); j++) {
        Object.values(numberOfTiles)[i].forEach((letter) => {
          const tile = new Tile(letter);
          allTiles.push(tile);
        });
      }
    }
    return allTiles;
  }

  createHand() {
    const hand = [];
    for (let i = 0; i < 7; i++) {
      hand.push(
        this.tiles.splice(Math.floor(Math.random() * this.tiles.length), 1)[0]
      );
    }
    return hand;
  }
}

export class Hand {
  constructor(hand) {
    this.hand = hand;
    this.newDict = dict.split("\n").filter((word) => word.length <= 7);
  }

  get letters() {
    return this.hand.map((tile) => tile.letter);
  }

  findValidWordV2() {
    const matchIndices = [];
    const newDict = dict.split("\n").filter((word) => word.length <= 7);
    for (let i = 0; i < newDict.length; i++) {
      const lettersCopy = [...this.letters];
      newDict[i].split("").forEach((dictLetter) => {
        if (lettersCopy.includes(dictLetter.toUpperCase())) {
          const index = lettersCopy.indexOf(dictLetter.toUpperCase());
          lettersCopy.splice(index, 1);
        }
      });
      if (newDict[i].length === 7 - lettersCopy.length) {
        matchIndices.push(i);
      }
    }
    return matchIndices;
  }

  get words() {
    return this.findValidWordV2().map((index) => this.newDict[index]);
  }

  get tileWords() {
    const tileWords = [];
    for (const match of this.words) {
      const currentMatch = [];
      match
        .toUpperCase()
        .split("")
        .forEach((letter) => {
          const tile = this.hand.find((tile) => {
            return tile.letter === letter;
          });
          currentMatch.push(tile);
        });
      tileWords.push(currentMatch);
    }
    return tileWords;
  }

  get lengths() {
    return this.words.map((word) => word.length);
  }

  get longestWord() {
    let maxLength = 0;
    let index = 0;
    this.lengths.forEach((length, i) => {
      if (length > maxLength) {
        console.log(index);
        index = i;
        maxLength = length;
      }
    });
    return this.words[index];
  }

  get scores() {
    const scores = [];
    this.tileWords.forEach((word) => {
      scores.push(
        word.reduce((cum, value) => {
          return cum + value.points;
        }, 0)
      );
    });
    return scores;
  }

  get scoresUsingHighestScoringTriple() {
    const scores = [];
    this.tileWords.forEach((word) => {
      const maxPointsForLetter = word.reduce((cum, val) => {
        if (val.points > cum) {
          return val.points;
        } else {
          return cum;
        }
      }, 0);
      const highestPointLetter = word.find((letter) => {
        return letter.points === maxPointsForLetter;
      });
      scores.push(
        word.reduce((cum, value) => {
          return cum + value.points;
        }, 0) +
          highestPointLetter.points * 2
      );
    });
    return scores;
  }

  findHighestScore(scores, words) {
    let maxScore = 0;
    let index = 0;
    scores.forEach((score, i) => {
      if (score > maxScore) {
        index = i;
        maxScore = score;
      }
    });
    return words[index];
  }

  get highestScoringWord() {
    return this.findHighestScore(this.scores, this.words);
  }

  get highestScoringWordWithTriple() {
    return this.findHighestScore(
      this.scoresUsingHighestScoringTriple,
      this.words
    );
  }
}

export function main() {
  const allTiles = new AllTiles();
  const player1 = new Hand(allTiles.createHand());
  console.log(`
  Tiles: ${player1.letters}\n
  Longest word: ${player1.longestWord}\n
  Highest scoring word: ${player1.highestScoringWord}\n
  Highest scoring word with triple letter: ${player1.highestScoringWordWithTriple}`);
}

main();
