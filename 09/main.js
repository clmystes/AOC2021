const inputString = require("fs").readFileSync(0, "utf-8")
// [
//   [1,2,3,4,5,6,7,8,9],
//   [1,2,3,4,5,6,7,8,9],
//   ...
// ]
const input = inputString.split("\n").map((line) => line.split("").map(Number))
const height = input.length
const width = input[0].length

const getAdjacents = (input, h, w) => {
  const adjacents = []

  if (h > 0) {
    adjacents.push({ h: h - 1, w })
  }

  if (w > 0) {
    adjacents.push({ h, w: w - 1 })
  }

  if (h < height - 1) {
    adjacents.push({ h: h + 1, w })
  }

  if (w < width - 1) {
    adjacents.push({ h, w: w + 1 })
  }

  return adjacents
}

const isLowPoint = (input, h, w) =>
  getAdjacents(input, h, w).every(
    (adjacent) => input[adjacent.h][adjacent.w] > input[h][w]
  )

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

const basinSize = (input, h, w, sizeCache) => {
  const key = `${h},${w}`
  if (sizeCache[key] || input[h][w] === 9) return 0
  sizeCache[key] = true

  return (
    1 +
    getAdjacents(input, h, w).reduce((pre, cur) => {
      return pre + basinSize(input, cur.h, cur.w, sizeCache)
    }, 0)
  )
}

const solution2 = (input) => {
  const basins = []

  for (let h = 0; h < height; h++) {
    for (let w = 0; w < width; w++) {
      if (isLowPoint(input, h, w)) {
        basins.push(basinSize(input, h, w, {}))
      }
    }
  }

  return basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((pre, cur) => pre * cur, 1)
}

// console.log(solution1(input))
console.log(solution2(input))
