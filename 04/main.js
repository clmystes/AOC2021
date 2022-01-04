const inputString = require("fs").readFileSync(0, "utf-8")
const input = inputString.split("\n")

const part1 = (input) => {
  const steps = input[0].split(",").map(Number)

  const boards = []
  for (let i = 2; i < input.length; i = i + 6) {
    const row1 = input[i].match(/\d+/g).map(Number)
    const row2 = input[i + 1].match(/\d+/g).map(Number)
    const row3 = input[i + 2].match(/\d+/g).map(Number)
    const row4 = input[i + 3].match(/\d+/g).map(Number)
    const row5 = input[i + 4].match(/\d+/g).map(Number)

    boards.push([row1, row2, row3, row4, row5])
  }

  const output = () => {
    let marked = {}
    for (let i = 0; i < steps.length; i++) {
      const n = steps[i]
      marked[n] = true
      if (i <= 4) {
        continue
      }

      const found = boards.find((board) => {
        const foundRow = board.find((row) => row.every((cell) => marked[cell]))
        const foundCol = new Array(5).fill(0).find((_, i) => {
          return (
            marked[board[0][i]] &&
            marked[board[1][i]] &&
            marked[board[2][i]] &&
            marked[board[3][i]] &&
            marked[board[4][i]]
          )
        })
        return foundRow || foundCol
      })

      if (found) {
        return (
          n *
          found.reduce(
            (acc, cur) =>
              acc + cur.reduce((acc, cur) => acc + (marked[cur] ? 0 : cur), 0),
            0
          )
        )
      }
    }
  }

  console.log(output())
}

const part2 = (input) => {
  const steps = input[0].split(",").map(Number)

  const boards = []
  for (let i = 2; i < input.length; i = i + 6) {
    const row1 = input[i].match(/\d+/g).map(Number)
    const row2 = input[i + 1].match(/\d+/g).map(Number)
    const row3 = input[i + 2].match(/\d+/g).map(Number)
    const row4 = input[i + 3].match(/\d+/g).map(Number)
    const row5 = input[i + 4].match(/\d+/g).map(Number)

    boards.push([row1, row2, row3, row4, row5])
  }

  const output = () => {
    let marked = {}
    for (let i = 0; i < steps.length; i++) {
      const n = steps[i]
      marked[n] = true
      if (i <= 4) {
        continue
      }

      let foundIndex
      let found

      const run = () => {
        found = boards.find((board, index) => {
          const foundRow = board.find((row) =>
            row.every((cell) => marked[cell])
          )
          const foundCol = new Array(5).fill(1).find((_, i) => {
            return (
              marked[board[0][i]] &&
              marked[board[1][i]] &&
              marked[board[2][i]] &&
              marked[board[3][i]] &&
              marked[board[4][i]]
            )
          })

          if (foundRow || foundCol) {
            foundIndex = index
          }
          return foundRow || foundCol
        })

        if (found) {
          if (boards.length === 1) {
            return (
              n *
              found.reduce(
                (acc, cur) =>
                  acc +
                  cur.reduce((acc, cur) => acc + (marked[cur] ? 0 : cur), 0),
                0
              )
            )
          } else {
            boards.splice(foundIndex, 1)
            found = null
            return run()
          }
        } else {
          return false
        }
      }

      const ret = run()
      if (ret) {
        return ret
      }
    }
  }

  console.log(output())
}

part1(input)
part2(input)
