const input = require("fs").readFileSync(0, "utf-8")
const [x1, x2, y1, y2] = input.match(/([-0-9]+)/g).map(Number)

const minX = Math.min(x1, x2)
const maxX = Math.max(x1, x2)
const minY = Math.min(y1, y2)
const maxY = Math.max(y1, y2)

const solutions = []
for (let x = 0; x <= maxX; x++) {
  for (let y = minY; y < (maxY - minY) * 3; y++) {
    const result = test(x, y)

    if (result) {
      solutions.push(result)
    }
  }
}

const highestY = solutions.sort((a, b) => b.highestY - a.highestY)[0].highestY

console.log(highestY, solutions.length)

function test(xv, yv) {
  let _xv = xv
  let _yv = yv

  let x = 0
  let y = 0

  let highestY = y

  while (y > minY) {
    x += _xv
    y += _yv

    if (y > highestY) {
      highestY = y
    }

    if (_xv !== 0) {
      _xv += _xv > 0 ? -1 : 1
    }

    _yv--

    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
      return {
        highestY,
        xv: _xv,
        yv: _yv,
      }
    }
  }
}
