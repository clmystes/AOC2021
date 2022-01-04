const inputString = require("fs").readFileSync(0, "utf-8")
const input = inputString.split("\n")

const DOWN = "down "
const UP = "up "
const FORWARD = "forward "

const part1 = (input) => {
  let hPos = 0
  let depth = 0
  input.forEach((command) => {
    if (command.startsWith(DOWN)) {
      depth += parseInt(command.substring(DOWN.length))
    } else if (command.startsWith(UP)) {
      depth -= parseInt(command.substring(UP.length))
    } else if (command.startsWith(FORWARD)) {
      hPos += parseInt(command.substring(FORWARD.length))
    }
  })

  const output = hPos * depth

  console.log(output)
}

const part2 = (input) => {
  let hPos = 0
  let depth = 0
  let aim = 0
  input.forEach((command) => {
    if (command.startsWith(DOWN)) {
      aim += parseInt(command.substring(DOWN.length))
    } else if (command.startsWith(UP)) {
      aim -= parseInt(command.substring(UP.length))
    } else if (command.startsWith(FORWARD)) {
      const x = parseInt(command.substring(FORWARD.length))
      hPos += x
      depth += aim * x
    }
  })

  const output = hPos * depth

  console.log(output)
}

part1(input)
part2(input)
