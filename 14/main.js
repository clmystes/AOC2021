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

console.log(solution1(template, pairs))
