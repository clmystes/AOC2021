const inputString = require("fs").readFileSync(0, "utf-8")

const solution1 = (inputString) => {
  const input = inputString
    .split("\n")
    .map((line) => line.split(" | ")[1].split(" "))

  let count = 0
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if ([2, 3, 4, 7].includes(input[i][j].length)) count++
    }
  }
  return count
}

console.log(solution1(inputString))
