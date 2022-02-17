const inputString = require("fs").readFileSync(0, "utf-8")
// [
//   '[({(<(())[]>[[{[]{<()<>>',
//   '[(()[<>])]({[<{<<[]>>(',
//   '{([(<{}[<>[]}>{[]{[(<()>',
//   '(((({<>}<{<{<>}{[]{[]{}'
// ]
const input = inputString.split("\n")

const PAIRS = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
}

const solution1 = (input) => {
  const SCORE_MAP = { ")": 3, "]": 57, "}": 1197, ">": 25137 }
  let score = 0

  for (const line of input) {
    const stack = []

    for (const item of line) {
      if (Object.keys(PAIRS).includes(item)) {
        stack.push(item)
      } else {
        if (PAIRS[stack.pop()] !== item) {
          score += SCORE_MAP[item]
          break
        }
      }
    }
  }

  return score
}

const solution2 = (input) => {
  const SCORE_MAP = { ")": 1, "]": 2, "}": 3, ">": 4 }

  const scores = []
  for (const line of input) {
    const stack = []

    let isIncompleteLine = true
    for (const item of line) {
      if (Object.keys(PAIRS).includes(item)) {
        stack.push(item)
      } else {
        if (PAIRS[stack.pop()] !== item) {
          isIncompleteLine = false
          break
        }
      }
    }

    if (isIncompleteLine) {
      let score = 0
      stack.reverse().forEach((item) => {
        score = score * 5 + SCORE_MAP[PAIRS[item]]
      })
      scores.push(score)
    }
  }

  // always odd
  return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)]
}

// console.log(solution1(input))
console.log(solution2(input))
