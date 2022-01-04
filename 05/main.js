const inputString = require("fs").readFileSync(0, "utf-8")

const part1 = () => {
  const points = []
  inputString.split("\n").forEach((line) => {
    const [start, end] = line.split(" -> ")
    const [startX, startY] = start.split(",").map(Number)
    const [endX, endY] = end.split(",").map(Number)

    if (startX !== endX && startY !== endY) {
      return
    }

    if (startX === endX) {
      const max = Math.max(startY, endY)
      const min = Math.min(startY, endY)

      for (let i = min; i <= max; i++) {
        points.push(`${startX}-${i}`)
      }
    } else {
      const max = Math.max(startX, endX)
      const min = Math.min(startX, endX)

      for (let i = min; i <= max; i++) {
        points.push(`${i}-${startY}`)
      }
    }
  })

  const map = {}
  let counts = 0
  points.forEach((x) => {
    if (map[x] === 1) {
      counts++
      map[x]++
    }

    if (map[x] == null) {
      map[x] = 1
    }
  })

  console.log(counts)
}

const part2 = (input) => {}

part1()
