const inputString = require("fs").readFileSync(0, "utf-8")
const input = inputString.split("\n")

const countPositions = (arr, i) => {
  let one = 0
  let zero = 0

  arr.forEach((item) => {
    if (item[i] === "1") {
      one++
    } else {
      zero++
    }
  })

  return { one, zero }
}

const part1 = (input) => {
  const n = input[0].length
  let gamma = ""
  let epsilon = ""

  for (let i = 0; i < n; i++) {
    const { one, zero } = countPositions(input, i)
    if (one > zero) {
      gamma += "1"
      epsilon += "0"
    } else if (one < zero) {
      gamma += "0"
      epsilon += "1"
    } else {
      throw new Error("Wrong input: The number of 0 and 1 cannot be the same")
    }
  }

  console.log(parseInt(gamma, 2) * parseInt(epsilon, 2))
}

const part2 = (input) => {
  let oxygenInput = input
  let co2Input = oxygenInput.slice()
  const n = oxygenInput[0].length

  for (let i = 0; i < n; i++) {
    if (oxygenInput.length > 1) {
      const o = countPositions(oxygenInput, i)

      if (o.one >= o.zero) {
        oxygenInput = oxygenInput.filter((item) => item[i] === "1")
      } else {
        oxygenInput = oxygenInput.filter((item) => item[i] === "0")
      }
    }

    if (co2Input.length > 1) {
      const c = countPositions(co2Input, i)
      if (c.one >= c.zero) {
        co2Input = co2Input.filter((item) => item[i] === "0")
      } else {
        co2Input = co2Input.filter((item) => item[i] === "1")
      }
    }
  }

  console.log(parseInt(oxygenInput[0], 2) * parseInt(co2Input[0], 2))
}

part1(input)
part2(input)
