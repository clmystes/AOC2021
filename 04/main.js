const inputString = require("fs").readFileSync(0, "utf-8")

// boards:
// [
//   [
//     [ 22, 13, 17, 11, 0 ],
//     [ 8, 2, 23, 4, 24 ],
//     [ 21, 9, 14, 16, 7 ],
//     [ 6, 10, 3, 18, 5 ],
//     [ 1, 12, 20, 15, 19 ]
//   ],
//   ...
// ]

// numbers: [ 7, 4, 9... ]

// positionMap:
// {
//   '7': [
//     { pi: 0, pj: 0, pk: 4 },
//     { pi: 1, pj: 0, pk: 2 },
//     { pi: 2, pj: 4, pk: 1 }
//   ],
//   '7': [ { pi: 0, pj: 4, pk: 0 } ],
//   ...
// }

const parseInput = (inputString) => {
  const input = inputString.split("\n")
  const numbers = input[0].split(",").map(Number)
  const boards = []
  const positionMap = {}

  let lineIdx = 1
  while (lineIdx < input.length) {
    const board = []
    const pi = boards.push(board) - 1

    let line
    // while line is not undefined or empty string
    while ((line = input[++lineIdx])) {
      const rowNumbers = line.match(/\d+/g).map(Number)
      const pj = board.push(rowNumbers) - 1
      rowNumbers.forEach((n, pk) => {
        if (positionMap[n] == null) {
          positionMap[n] = []
        }
        positionMap[n].push({ pi, pj, pk })
      })
    }
  }

  return { numbers, boards, positionMap }
}

const isWin = (board, row, col) => {
  const boardSize = board[0].length

  let rowResult = true
  let colResult = true
  for (let i = 0; i < boardSize; i++) {
    rowResult = rowResult && board[i][col]
    colResult = colResult && board[row][i]

    if (!colResult && !rowResult) {
      return false
    }
  }

  return true
}

// strategy: first | last // win first or last
const solution = (inputString, strategy) => {
  const { boards, numbers, positionMap } = parseInput(inputString)
  const boardSize = boards[0][0].length

  const marks = boards.map(() =>
    new Array(boardSize).fill(0).map(() => new Array(boardSize).fill(false))
  )
  const targetWinCount = strategy === "first" ? 1 : boards.length
  const wins = new Set()

  for (const n of numbers) {
    const position = positionMap[n]

    console.assert(position == null, "position not found")

    for (const p of position) {
      const { pi, pj, pk } = p

      marks[pi][pj][pk] = true

      if (!wins.has(pi) && isWin(marks[pi], pj, pk)) {
        wins.add(pi)

        if (wins.size === targetWinCount) {
          return (
            boards[pi].reduce(
              (boardSum, rowNumbers, row) =>
                boardSum +
                rowNumbers.reduce(
                  (rowSum, aNumber, col) =>
                    rowSum + (marks[pi][row][col] ? 0 : aNumber),
                  0
                ),
              0
            ) * n
          )
        }
      }
    }
  }
}

const part1 = (inputString) => solution(inputString, "first")
const part2 = (inputString) => solution(inputString, "last")

console.log(part1(inputString))
console.log(part2(inputString))
