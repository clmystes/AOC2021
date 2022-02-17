const inputString = require("fs").readFileSync(0, "utf-8")
// [
//   '[({(<(())[]>[[{[]{<()<>>',
//   '[(()[<>])]({[<{<<[]>>(',
//   '{([(<{}[<>[]}>{[]{[(<()>',
//   '(((({<>}<{<{<>}{[]{[]{}'
// ]
const input = inputString.split("\n")

const SCORES = { ")": 3, "]": 57, "}": 1197, ">": 25137 }
const PAIRS = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
}

const solution1 = (input) => {
  let score = 0
  for (const line of input) {
    const stack = []

    for (const item of line) {
      if (Object.keys(PAIRS).includes(item)) {
        stack.push(item)
      } else {
        if (PAIRS[stack.pop()] !== item) {
          score += SCORES[item]
          break
        }
      }
    }
  }

  return score
}

console.log(solution1(input))
