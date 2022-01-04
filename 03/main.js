const inputString = require("fs").readFileSync(0, "utf-8")
const input = inputString.split("\n")

const part1 = (input) => {
  const n = input[0].length
  let gamma = ""
  let epsilon = ""

  const getMost = (arr, i) => {
    let one = 0
    let zero = 0
    arr.forEach((item) => {
      if (item[i] === "1") {
        one++
      } else {
        zero++
      }
    })
    return one > zero ? "1" : "0"
  }

  for (let i = 0; i < n; i++) {
    if (getMost(input, i) === "1") {
      gamma += "1"
      epsilon += "0"
    } else {
      gamma += "0"
      epsilon += "1"
    }
  }

  const output = parseInt(gamma, 2) * parseInt(epsilon, 2)

  console.log(output)
}

const part2 = (input) => {
  let oxygenInput = inputString.split("\n")
  let co2Input = oxygenInput.slice()
  const n = oxygenInput[0].length

  const getMost = (arr, i) => {
    let one = []
    let zero = []
    arr.forEach((item, index) => {
      if (item[i] === "1") {
        one.push(index)
      } else {
        zero.push(index)
      }
    })
    return { one, zero }
  }

  for (let i = 0; i < n; i++) {
    if (oxygenInput.length > 1) {
      const o = getMost(oxygenInput, i)

      if (o.one.length >= o.zero.length) {
        oxygenInput = oxygenInput.filter((item) => item[i] === "1")
      } else {
        oxygenInput = oxygenInput.filter((item) => item[i] === "0")
      }
    }

    if (co2Input.length > 1) {
      const c = getMost(co2Input, i)
      if (c.one.length >= c.zero.length) {
        co2Input = co2Input.filter((item) => item[i] === "0")
      } else {
        co2Input = co2Input.filter((item) => item[i] === "1")
      }
    }
  }

  const output = parseInt(oxygenInput[0], 2) * parseInt(co2Input[0], 2)

  console.log(output)
}

part1(input)
part2(input)
