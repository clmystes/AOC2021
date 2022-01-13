const inputString = require("fs").readFileSync(0, "utf-8")

const RESET_TIMER = 6
const NEW_TIMER = 8

const solution = (inputString, days) => {
  const input = inputString.split(",").map(Number) // [3,4,3,1,2...]
  const ages = new Array(NEW_TIMER + 1).fill(0)
  input.forEach((v) => ages[v]++)

  for (let i = 0; i < days; i++) {
    const count = ages.shift()
    ages[NEW_TIMER] = count
    ages[RESET_TIMER] += count
  }

  return ages.reduce((acc, cur) => acc + cur, 0)
}

const part1 = (inputString) => solution(inputString, 80)
const part2 = (inputString) => solution(inputString, 256)

console.log(part1(inputString))
console.log(part2(inputString))
