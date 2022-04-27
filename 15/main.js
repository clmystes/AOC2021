const input = require("fs").readFileSync(0, "utf-8")
// [
//   [1,2,3,4,5],
//   [1,2,3,4,5],
//   ...
// ]
const matrix = input.split("\n").map((line) => line.split("").map(Number))
const steps = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
]

const search = (matrix) => {
  const height = matrix.length
  const width = matrix[0].length

  let queueHead = { v: [0, 0, 0] }
  const costs = {}

  while (true) {
    let [cost, x, y] = queueHead.v

    if (x === width - 1 && y === height - 1) return cost

    for (const [sx, sy] of steps) {
      const _x = x + sx
      const _y = y + sy

      if (_x < 0 || _x >= width || _y < 0 || _y >= height) continue

      const newCost = cost + matrix[_y][_x]
      const key = `${_x},${_y}`

      if (!(key in costs) || costs[key] > newCost) {
        costs[key] = newCost
        let p = queueHead

        while (p.n != null && p.n.v[0] < newCost) {
          p = p.n
        }

        p.n = { v: [newCost, _x, _y], n: p.n }
      }
    }

    queueHead = queueHead.n
  }
}

const solution1 = (matrix) => console.log(search(matrix))

const solution2 = (matrix) => {
  const nm = []

  for (let y = 0; y < matrix.length * 5; y++) {
    for (let x = 0; x < matrix[0].length * 5; x++) {
      if (nm[y] == null) nm[y] = []

      nm[y][x] =
        ((matrix[y % matrix.length][x % matrix[0].length] +
          Math.floor(y / matrix.length) +
          Math.floor(x / matrix[0].length) -
          1) %
          9) +
        1
    }
  }

  console.log(search(nm))
}

// solution1(matrix)
solution2(matrix)
