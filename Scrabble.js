// Plan: first create a tile class. This will have letter and points keys.
// Create a function that uses this class to create each tile, then create duplicates of tiles that have duplicates
//

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
        return Object.keys(points)[i];
      }
    }
  }
}

export function createAllTiles() {
  const allTiles = [];
}

export function calculateScore(word) {
  return word.reduce((cum, letter) => {
    const value = Number(letter.points);
    return cum + value;
  }, 0);
}
