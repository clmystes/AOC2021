const inputString = require("fs").readFileSync(0, "utf-8")
const inputArr = inputString.split("\n")
const SEPARATOR = ""

// [
//   [1, 10],
//   [8, 10],
//   ...
// ]
const dots = inputArr
  .slice(0, inputArr.indexOf(SEPARATOR))
  .map((dot) => dot.split(",").map(Number))

// [
//   {
//     axis: 'x',
//     val: 10
//   },
//   ...
// ]
const instructions = inputArr
  .slice(inputArr.indexOf(SEPARATOR) + 1)
  .map((i) => {
    const matched = i.match(/(x|y)=([0-9]+)/)
    return {
      axis: matched[1],
      val: matched[2],
    }
  })

const solution1 = (dots, instructions) => {
  const { axis, val } = instructions[0]

  for (const d of dots) {
    if (axis === "x" && d[0] >= val) {
      d[0] = 2 * val - d[0]
    }

    if (axis === "y" && d[1] >= val) {
      d[1] = 2 * val - d[1]
    }
  }

  return new Set(dots.map((d) => `${d[0]},${d[1]}`)).size
}

const solution2 = (dots, instructions) => {
  for (const i of instructions) {
    const { axis, val } = i

    for (const d of dots) {
      if (axis === "x" && d[0] >= val) {
        d[0] = 2 * val - d[0]
      }

      if (axis === "y" && d[1] >= val) {
        d[1] = 2 * val - d[1]
      }
    }
  }

  let height = 0
  let width = 0
  dots.forEach((d) => {
    if (d[0] > width) width = d[0]
    if (d[1] > height) height = d[1]
  })

  const grid = new Array(height + 1)
    .fill(" ")
    .map(() => new Array(width + 1).fill(" "))

  for (const d of dots) {
    grid[d[1]][d[0]] = 1
  }

  for (const line of grid) {
    console.log(line.join(""))
  }
}

// console.log(solution1(dots, instructions))
solution2(dots, instructions)
