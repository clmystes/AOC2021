const inputString = require("fs").readFileSync(0, "utf-8")
// [
//   [1,2,3,4,5,6,7,8,9],
//   [1,2,3,4,5,6,7,8,9],
//   ...
// ]
const input = inputString.split("\n").map((line) => line.split("").map(Number))
const height = input.length
const width = input[0].length

const isLowPoint = (input, h, w) => {
  const point = input[h][w]
  const adjacents = []

  if (h > 0) {
    adjacents.push(input[h - 1][w])
  }

  if (w > 0) {
    adjacents.push(input[h][w - 1])
  }

  if (h < height - 1) {
    adjacents.push(input[h + 1][w])
  }

  if (w < width - 1) {
    adjacents.push(input[h][w + 1])
  }

  return adjacents.every((adjacent) => adjacent > point)
}

const solution1 = (input) => {
  let riskLevels = 0
  for (let h = 0; h < height; h++) {
    for (let w = 0; w < width; w++) {
      if (isLowPoint(input, h, w)) {
        riskLevels += input[h][w] + 1
      }
    }
  }

  return riskLevels
}

console.log(solution1(input))
