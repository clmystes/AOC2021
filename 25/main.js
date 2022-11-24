const data = require("fs").readFileSync(0, "utf-8")
const parsed = data.split("\n").map((l) => l.split(""))

const part1 = (map) => {
  const W = map[0].length
  const H = map.length

  let i = 0
  let changed = true
  while (changed) {
    changed = false

    for (let turn of [0, 1]) {
      const newMap = map.map((row) => row.map((cell) => cell))

      map.forEach((row, y) =>
        row.forEach((cell, x) => {
          if (turn === 0 && cell === ">") {
            if (map[y][(x + 1) % W] === ".") {
              newMap[y][x] = "."
              newMap[y][(x + 1) % W] = ">"
              changed = true
            }
          }

          if (turn === 1 && cell === "v") {
            if (map[(y + 1) % H][x] === ".") {
              newMap[y][x] = "."
              newMap[(y + 1) % H][x] = "v"
              changed = true
            }
          }
        })
      )

      map = newMap
    }

    i++
  }

  console.log(i)
}

part1(parsed)
