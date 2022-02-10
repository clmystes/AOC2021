const inputString = require("fs").readFileSync(0, "utf-8")
const input = inputString.split(",").map(Number)

const solution1 = (input) => {
  let min = Number.MAX_VALUE
  for (let i = 0; i < input.length; i++) {
    let fuel = 0
    for (let j = 0; j < input.length; j++) {
      fuel += Math.abs(input[i] - input[j])
    }
    min = Math.min(fuel, min)
  }

  return min
}

const solution2 = (input) => {
  let min = Number.MAX_VALUE
  const start = Math.min(...input)
  const end = Math.max(...input)

  for (let i = start; i <= end; i++) {
    let fuel = 0
    for (let j = 0; j < input.length; j++) {
      const step = Math.abs(i - input[j])
      for (let k = 1; k <= step; k++) {
        fuel += k
      }
    }
    min = Math.min(fuel, min)
  }

  return min
}

// console.log(solution1(input))
console.log(solution2(input))
