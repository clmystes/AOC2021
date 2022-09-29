const data = require("fs").readFileSync(0, "utf-8")

// input:
// Player 1 starting position: 4
// Player 2 starting position: 8
// output:
// {
//   p1StartPos: num,
//   p2StartPos: num,
// }
const parse = (data) => {
  const [line1, line2] = data.split("\n")

  const p1StartPos = Number(
    line1.substring("Player 1 starting position: ".length).trim()
  )
  const p2StartPos = Number(
    line2.substring("Player 2 starting position: ".length).trim()
  )

  console.assert(
    [p1StartPos, p2StartPos].every(
      (num) => typeof num === "number" && !isNaN(num)
    ),
    "Play starting position should be number."
  )

  return {
    p1StartPos,
    p2StartPos,
  }
}

const move = (pos, step) => {
  const target = (pos + step) % 10
  return target === 0 ? 10 : target
}

const part1 = (parsed) => {
  const { p1StartPos, p2StartPos } = parsed
  const p1 = { pos: p1StartPos, score: 0 }
  const p2 = { pos: p2StartPos, score: 0 }

  const roll = (turn) => turn * 3 + 6

  let turn = 0
  let boundary = 0
  while (true) {
    boundary++

    if (boundary > 100000) {
      console.error("Out of boundary: part1")
      return
    }

    p1.pos = move(p1.pos, roll(turn))
    p1.score = p1.score + p1.pos
    turn += 3

    if (p1.score >= 1000) {
      return p2.score * turn
    }

    p2.pos = move(p2.pos, roll(turn))
    p2.score = p2.score + p2.pos
    turn += 3

    if (p2.score >= 1000) {
      return p1.score * turn
    }
  }
}

const part2 = (parsed) => {
  const { p1StartPos, p2StartPos } = parsed
  const TARGET = 21
  const memo = {}

  const recurse = (p1, p2, isP1Turn) => {
    const uniqueKey = JSON.stringify({ p1, p2, isP1Turn })

    if (memo[uniqueKey] != null) {
      return memo[uniqueKey]
    }

    if (p1.score >= TARGET) {
      const ret = { p1: 1, p2: 0 }
      memo[uniqueKey] = ret
      return ret
    }

    if (p2.score >= TARGET) {
      const ret = { p1: 0, p2: 1 }
      memo[uniqueKey] = ret
      return ret
    }

    const result = { p1: 0, p2: 0 }
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        for (let k = 1; k <= 3; k++) {
          if (isP1Turn) {
            const newPos = move(p1.pos, i + j + k)
            const cur = recurse(
              { pos: newPos, score: p1.score + newPos },
              { ...p2 },
              !isP1Turn
            )
            result.p1 = result.p1 + cur.p1
            result.p2 = result.p2 + cur.p2
          } else {
            const newPos = move(p2.pos, i + j + k)
            const cur = recurse(
              { ...p1 },
              { pos: newPos, score: p2.score + newPos },
              !isP1Turn
            )
            result.p1 = result.p1 + cur.p1
            result.p2 = result.p2 + cur.p2
          }
        }
      }
    }

    memo[uniqueKey] = result
    return result
  }

  return Math.max(
    ...Object.values(
      recurse(
        { pos: p1StartPos, score: 0 },
        { pos: p2StartPos, score: 0 },
        true
      )
    )
  )
}

const parsed = parse(data)

// console.log(part1(parsed))
console.log(part2(parsed))
