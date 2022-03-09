const inputString = require("fs").readFileSync(0, "utf-8")
// [
//   ["a", "b"],
//   ...
// ]
const input = inputString.split("\n").map((line) => line.split("-"))

const isLowerCase = (c) => c === c.toLowerCase()

const paths = {}
for (let i = 0; i < input.length; i++) {
  const left = input[i][0]
  const right = input[i][1]

  paths[left] = paths[left] || []
  paths[left].push(right)

  paths[right] = paths[right] || []
  paths[right].push(left)
}

const solution1 = () => {
  const found = []

  const findPath = (cave, current) => {
    const next = [...current, cave]

    if (cave === "end") {
      found.push(next)
      return
    }

    paths[cave].forEach((nextCave) => {
      if (nextCave.toLowerCase() !== nextCave || !current.includes(nextCave)) {
        findPath(nextCave, next)
      }
    })
  }

  findPath("start", [])

  return found.length
}

const solution2 = () => {
  const found = []

  const findPath = (cave, current) => {
    const next = [...current, cave]

    if (cave === "end") {
      found.push(next)
      return
    }

    if (cave === "start" && current.length > 0) return

    paths[cave].forEach((nextCave) => {
      if (!isLowerCase(nextCave)) {
        findPath(nextCave, next)
        return
      }

      const lowerCaves = next.filter((n) => isLowerCase(n))
      if (!lowerCaves.includes(nextCave)) {
        findPath(nextCave, next)
        return
      }

      const count = {}
      lowerCaves.forEach((c) => (count[c] = (count[c] || 0) + 1))

      if (Object.values(count).includes(2)) return

      findPath(nextCave, next)
    })
  }

  findPath("start", [])

  return found.length
}

// console.log(solution1())
console.log(solution2())
