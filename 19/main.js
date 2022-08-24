const _ = require("lodash")
const math = require("mathjs")

const cartesian = (...a) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())))

function combination(arr) {
  const result = []

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      result.push([arr[i], arr[j]])
    }
  }

  return result
}

const rotations = [
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  [
    [0, 0, 1],
    [0, 1, 0],
    [-1, 0, 0],
  ],
  [
    [-1, 0, 0],
    [0, 1, 0],
    [0, 0, -1],
  ],
  [
    [0, 0, -1],
    [0, 1, 0],
    [1, 0, 0],
  ],
  [
    [0, -1, 0],
    [1, 0, 0],
    [0, 0, 1],
  ],
  [
    [0, 0, 1],
    [1, 0, 0],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 0, 0],
    [0, 0, -1],
  ],
  [
    [0, 0, -1],
    [1, 0, 0],
    [0, -1, 0],
  ],
  [
    [0, 1, 0],
    [-1, 0, 0],
    [0, 0, 1],
  ],
  [
    [0, 0, 1],
    [-1, 0, 0],
    [0, -1, 0],
  ],
  [
    [0, -1, 0],
    [-1, 0, 0],
    [0, 0, -1],
  ],
  [
    [0, 0, -1],
    [-1, 0, 0],
    [0, 1, 0],
  ],
  [
    [1, 0, 0],
    [0, 0, -1],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [0, 0, -1],
    [-1, 0, 0],
  ],
  [
    [-1, 0, 0],
    [0, 0, -1],
    [0, -1, 0],
  ],
  [
    [0, -1, 0],
    [0, 0, -1],
    [1, 0, 0],
  ],
  [
    [1, 0, 0],
    [0, -1, 0],
    [0, 0, -1],
  ],
  [
    [0, 0, -1],
    [0, -1, 0],
    [-1, 0, 0],
  ],
  [
    [-1, 0, 0],
    [0, -1, 0],
    [0, 0, 1],
  ],
  [
    [0, 0, 1],
    [0, -1, 0],
    [1, 0, 0],
  ],
  [
    [1, 0, 0],
    [0, 0, 1],
    [0, -1, 0],
  ],
  [
    [0, -1, 0],
    [0, 0, 1],
    [-1, 0, 0],
  ],
  [
    [-1, 0, 0],
    [0, 0, 1],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 0],
  ],
]

const parsed = parseInput(require("fs").readFileSync(0, "utf-8"))

// part1(parsed)

part2(parsed)

function parseInput(str) {
  const results = []

  for (const part of str.split(/--- scanner \d+ ---/)) {
    const trimmed = part.trim()

    if (trimmed.length === 0) continue

    const scanner = trimmed.split("\n")

    results.push(scanner)
  }

  return results
}

function rotate(pos, r) {
  const result = math.multiply(toV3(pos), math.matrix(r))
  return toPos(result._data)
}

function toPos(v3) {
  return v3.join(",")
}

function toV3(pos) {
  return pos.split(",").map(Number)
}

function relativePos(_a, _b) {
  const a = toV3(_a)
  const b = toV3(_b)
  return toPos([b[0] - a[0], b[1] - a[1], b[2] - a[2]])
}

function addV3(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
}

function transform(scanner, r, transtion) {
  const t = toV3(transtion).map((x) => -x)
  return scanner.map((pos) => addV3(toV3(rotate(pos, r)), t)).map(toPos)
}

function part1(scanners) {
  const beacons = new Set(scanners[0])
  const left = scanners.slice(1)

  while (left.length > 0) {
    let targetScanner, targetRotation, targetTransition

    out: for (const s of left) {
      for (const r of rotations) {
        const rotated = s.map((pos) => rotate(pos, r))

        const [transition, count] = _.maxBy(
          Object.entries(
            _.countBy(
              cartesian([...beacons], rotated).map(([a, b]) =>
                relativePos(a, b)
              )
            )
          ),
          (x) => x[1]
        )

        if (count >= 12) {
          targetRotation = r
          targetTransition = transition
          targetScanner = s
          break out
        }
      }
    }

    const idx = left.indexOf(targetScanner)
    left.splice(idx, 1)

    transform(targetScanner, targetRotation, targetTransition).forEach((b) =>
      beacons.add(b)
    )
  }

  console.log(beacons.size)
}

function part2(scanners) {
  const beacons = new Set(scanners[0])
  const left = scanners.slice(1)

  const scannerPositions = ["0,0,0"]

  while (left.length > 0) {
    let targetScanner, targetRotation, targetTransition

    out: for (const s of left) {
      for (const r of rotations) {
        const rotated = s.map((pos) => rotate(pos, r))

        const [transition, count] = _.maxBy(
          Object.entries(
            _.countBy(
              cartesian([...beacons], rotated).map(([a, b]) =>
                relativePos(a, b)
              )
            )
          ),
          (x) => x[1]
        )

        if (count >= 12) {
          targetRotation = r
          targetTransition = transition
          targetScanner = s
          break out
        }
      }
    }

    const idx = left.indexOf(targetScanner)
    left.splice(idx, 1)

    scannerPositions.push(targetTransition)
    transform(targetScanner, targetRotation, targetTransition).forEach((b) =>
      beacons.add(b)
    )
  }

  const max = combination(scannerPositions)
    .map(([a, b]) => manhattanDistance(a, b))
    .sort((a, b) => b - a)[0]

  console.log(max)
}

function manhattanDistance(a, b) {
  const va = toV3(a)
  const vb = toV3(b)
  return (
    Math.abs(va[0] - vb[0]) + Math.abs(va[1] - vb[1]) + Math.abs(va[2] - vb[2])
  )
}
