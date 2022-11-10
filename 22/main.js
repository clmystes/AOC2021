const data = require("fs").readFileSync(0, "utf-8")

const intersect = (a, b) => {
  const c = [0, 1, 2].map((i) => [
    Math.max(a[i][0], b[i][0]),
    Math.min(a[i][1], b[i][1]),
  ])

  if (c.some(([min, max]) => min > max)) {
    return null
  }

  return c
}

// toggle: 'on' | 'off'
// output:
// [
//   [toggle, x1, x2, y1, y2, z1, z2],
//   ...
// ]
const parse = (data) => {
  return data
    .split("\n")
    .map((l) =>
      /(\w+) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/g.exec(l)
    )
    .map(([_, toggle, x1, x2, y1, y2, z1, z2]) => {
      return [
        toggle,
        Number(x1),
        Number(x2),
        Number(y1),
        Number(y2),
        Number(z1),
        Number(z2),
      ]
    })
}

const parsed = parse(data)

const part1 = (parsed) => {
  const start = (n) => Math.max(n, -50)
  const end = (n) => Math.min(n, 50)
  const onSet = new Set()

  parsed.forEach(([toggle, x1, x2, y1, y2, z1, z2]) => {
    for (let x = start(x1); x <= end(x2); x++) {
      for (let y = start(y1); y <= end(y2); y++) {
        for (let z = start(z1); z <= end(z2); z++) {
          const key = `${x}.${y}.${z}`

          if (toggle === "on") {
            onSet.add(key)
          } else {
            onSet.delete(key)
          }
        }
      }
    }
  })

  console.log(onSet.size)
}

const part2 = (parsed) => {
  const cuboids = []

  parsed.forEach(([toggle, x1, x2, y1, y2, z1, z2]) => {
    const cuboid = [
      [x1, x2],
      [y1, y2],
      [z1, z2],
    ]
    const on = toggle === "on"

    for (const { on: _on, cuboid: _cuboid } of [...cuboids]) {
      const intersected = intersect(cuboid, _cuboid)

      if (intersected) {
        cuboids.push({
          on: !_on,
          cuboid: intersected,
        })
      }
    }

    if (on) {
      cuboids.push({
        on,
        cuboid,
      })
    }
  })

  console.log(
    cuboids
      .map(
        ({ on, cuboid }) =>
          (on ? 1 : -1) *
          cuboid.map(([min, max]) => max + 1 - min).reduce((acc, n) => acc * n)
      )
      .reduce((acc, n) => acc + n)
  )
}

// part1(parsed)
part2(parsed)
