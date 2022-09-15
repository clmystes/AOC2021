const data = require("fs").readFileSync(0, "utf-8").split(/\n/)

const algo = data[0].split("") // ['.', '.', '#', '.', '#']
const input = [] // ['#..#.', '#....', '##..#', '..#..', '..###']
for (let i = 2; i < data.length; i++) {
  input.push(data[i])
}

const width = input[0].length
const height = input.length

const enhance = (x, y, [minX, minY, maxX, maxY], infinitePixel, map) => {
  const neighbors = []
  for (const dy of [-1, 0, 1]) {
    for (const dx of [-1, 0, 1]) {
      if (x + dx < minX || x + dx > maxX || y + dy < minY || y + dy > maxY) {
        neighbors.push("infinitePixel")
      } else {
        neighbors.push(`${x + dx},${y + dy}`)
      }
    }
  }

  let binary = ""
  for (const point of neighbors) {
    binary +=
      point === "infinitePixel" ? infinitePixel : map.has(point) ? "1" : "0"
  }

  return algo[parseInt(binary, 2)]
}

const run = (input, times) => {
  let map = new Set()

  input.forEach((line, i) => {
    line.split("").forEach((char, j) => {
      if (char === "#") {
        map.add(`${j},${i}`)
      }
    })
  })

  for (let i = 0; i < times; i++) {
    let next = new Set()

    for (let x = -1 - i; x < width + i + 1; x++) {
      for (let y = -1 - i; y < height + i + 1; y++) {
        if (
          enhance(
            x,
            y,
            [0 - i, 0 - i, width + i - 1, height + i - 1],
            i % 2 === 0 ? "0" : "1",
            map
          ) === "#"
        ) {
          next.add(`${x},${y}`)
        }
      }
    }

    map = next
  }

  console.log(map.size)
}

run(input, 2) // part 1
run(input, 50) // part 2
