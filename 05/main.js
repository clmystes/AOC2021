const inputString = require("fs").readFileSync(0, "utf-8")

const parseInput = (inputString) => {
  return inputString.split("\n").map((line) => {
    const [start, end] = line.split(" -> ")
    const [startX, startY] = start.split(",").map(Number)
    const [endX, endY] = end.split(",").map(Number)
    return {
      start: {
        x: startX,
        y: startY,
      },
      end: {
        x: endX,
        y: endY,
      },
    }
  })
}

const solution = (inputString, isConsiderDiagonalLines) => {
  const points = []
  const lines = parseInput(inputString)

  lines.forEach(({ start, end }) => {
    if (!isConsiderDiagonalLines && start.x !== end.x && start.y !== end.y) {
      return
    }

    if (start.x === end.x) {
      const max = Math.max(start.y, end.y)
      const min = Math.min(start.y, end.y)

      for (let i = min; i <= max; i++) {
        points.push(`${start.x}-${i}`)
      }
    } else if (start.y === end.y) {
      const max = Math.max(start.x, end.x)
      const min = Math.min(start.x, end.x)

      for (let i = min; i <= max; i++) {
        points.push(`${i}-${start.y}`)
      }
    } else {
      let x = start.x
      let y = start.y

      while (x !== end.x && y !== end.y) {
        points.push(`${x}-${y}`)
        if (start.x > end.x) {
          x--
        } else {
          x++
        }
        if (start.y > end.y) {
          y--
        } else {
          y++
        }
      }

      points.push(`${end.x}-${end.y}`)
    }
  })

  const map = {} // { "1-1": 1 }
  return points.reduce((acc, cur) => {
    if (map[cur] === 1) {
      map[cur]++
      return acc + 1
    }

    if (map[cur] == null) {
      map[cur] = 1
    }

    return acc
  }, 0)
}

const part1 = (inputString) => solution(inputString, false)
const part2 = (inputString) => solution(inputString, true)

console.log(part1(inputString))
console.log(part2(inputString))
