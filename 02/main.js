const inputString = require("fs").readFileSync(0, "utf-8")
const input = inputString.split("\n")

const DOWN = "down"
const UP = "up"
const FORWARD = "forward"

const processInput = (input) => {
  return input.map((line) => {
    const data = line.split(" ")
    return {
      command: data[0],
      value: Number(data[1]),
    }
  })
}

const part1 = (input) => {
  let hPos = 0
  let depth = 0
  processInput(input).forEach((i) => {
    switch (i.command) {
      case DOWN:
        depth += i.value
        break

      case UP:
        depth -= i.value
        break

      case FORWARD:
        hPos += i.value
        break
    }
  })

  console.log(hPos * depth)
}

const part2 = (input) => {
  let hPos = 0
  let depth = 0
  let aim = 0

  processInput(input).forEach((i) => {
    switch (i.command) {
      case DOWN:
        aim += i.value
        break

      case UP:
        aim -= i.value
        break

      case FORWARD:
        hPos += i.value
        depth += aim * i.value
        break
    }
  })

  console.log(hPos * depth)
}

part1(input)
part2(input)
