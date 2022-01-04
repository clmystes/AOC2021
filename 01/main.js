const inputString = require("fs").readFileSync(0, "utf-8")
const input = inputString.split("\n").map(Number)

const part1 = (input) => {
  const output = input.reduce((prev, cur, curIdx) => {
    if (curIdx === 0) return 0
    return prev + (cur > input[curIdx - 1] ? 1 : 0)
  }, 0)

  console.log(output)
}

const part2 = (input) => {
  let last = 0
  const output = input.reduce((prev, cur, curIdx) => {
    const next = input[curIdx + 1]
    const nextNext = input[curIdx + 2]

    if (curIdx === 0 || next == null || nextNext == null) return prev

    const sum = cur + next + nextNext
    const ret = prev + (sum > last ? 1 : 0)
    last = sum
    return ret
  }, 0)

  console.log(output)
}

part1(input)
part2(input)
