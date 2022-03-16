const inputString = require("fs").readFileSync(0, "utf-8")
const inputArr = inputString.split("\n")

// NNCB
const template = inputArr[0]

// [
//   ["CH", "B"],
//   ["HH", "N"],
//   ...
// ]
const pairs = inputArr
  .slice(2)
  .map((pair) => pair.split("->").map((c) => c.trim()))

const solution1 = (template, pairs) => {
  for (let i = 0; i < 10; i++) {
    let _template = template[0]
    for (let j = 1; j < template.length; j++) {
      const pair = template.substr(j - 1, 2)
      const inserted = pairs.find((p) => p[0] === pair)
      if (inserted) {
        _template = _template + inserted[1]
      }
      _template += template[j]
    }
    template = _template
  }

  const counts = {}
  for (const c of template) {
    counts[c] = (counts[c] ?? 0) + 1
  }

  return Math.max(...Object.values(counts)) - Math.min(...Object.values(counts))
}

const solution2 = (template, pairs) => {
  let map = new Map() // { AB: 3, BC: 3, CA: 2 }
  for (let i = 0; i < template.length - 1; i++) {
    const a = template[i]
    const b = template[i + 1]
    const pair = a + b
    map.set(pair, (map.get(pair) || 0) + 1)
  }

  for (let step = 1; step <= 40; step++) {
    const newMap = new Map()

    for (let [pair, count] of map) {
      const rule = pairs.find((p) => p[0] === pair)
      if (rule) {
        let a = pair[0] + rule[1]
        let b = rule[1] + pair[1]

        newMap.set(a, count + (newMap.get(a) || 0))
        newMap.set(b, count + (newMap.get(b) || 0))
      } else {
        newMap.set(pair, count)
      }
    }

    map = newMap
  }

  const counts = {}
  for (let [pair, count] of map) {
    let a = pair[0]
    let b = pair[1]

    if (!counts[a]) counts[a] = 0
    if (!counts[b]) counts[b] = 0

    counts[a] += count
    counts[b] += count
  }

  counts[template[0]] = (counts[template[0]] || 0) + 1
  counts[template[template.length - 1]]++

  const sorted = Object.entries(counts)
    .map(([name, count]) => [name, count / 2])
    .sort((a, b) => a[1] - b[1])

  let min = sorted[0]
  let max = sorted[sorted.length - 1]

  console.log(max[1] - min[1])
}

// console.log(solution1(template, pairs))
solution2(template, pairs)
