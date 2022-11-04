// Plan: first create a tile class. This will have letter and points keys.
// Create a function that uses this class to create each tile, then create duplicates of tiles that have duplicates
import shuffle from "./shuffle.js";
const dict = await Deno.readTextFile("./dictionary.txt"); //This isn't working???

class Tile {
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

export function createAllTiles() {
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

export function calculateScore(word) {
  return word.reduce((cum, letter) => {
    const value = letter.points;
    return cum + value;
  }, 0);
}

export function createHand(Tiles) {
  const hand = [];
  for (let i = 0; i < 7; i++) {
    hand.push(Tiles.shift());
  }
  return hand;
}

export function main() {
  const allTiles = createAllTiles();
  const shuffledTiles = shuffle(allTiles);
  const player1Hand = createHand(shuffledTiles);
  console.log(dict);
}

main();
