const input = require("fs").readFileSync(0, "utf-8")
const binary = input
  .split("")
  .map((d) => parseInt(d, 16).toString(2).padStart(4, "0"))
  .join("")

const parse = (binary) => {
  let version = parseInt(binary.substr(0, 3), 2)
  let type = parseInt(binary.substr(3, 3), 2)

  let pos = 0

  if (type === 4) {
    pos = 6
    binary = binary.substr(6)

    let bits = ""
    let more = true

    while (more) {
      more = binary[0] === "1"
      bits += binary.substr(1, 4)
      pos += 5
      binary = binary.substr(5)
    }

    return { version, pos, number: parseInt(bits, 2) }
  }

  const subPackets = []

  if (binary[6] === "0") {
    const length = parseInt(binary.substr(7, 15), 2)
    let sub = binary.substr(22, length)

    while (sub.length > 0) {
      const parsed = parse(sub)
      subPackets.push(parsed.number)
      version += parsed.version
      sub = sub.substr(parsed.pos)
    }

    pos += 22 + length
  }

  if (binary[6] === "1") {
    const packets = parseInt(binary.substr(7, 11), 2)
    pos = 18
    let sub = binary.substr(pos)

    for (let i = 0; i < packets; i++) {
      const parsed = parse(binary.substr(pos))
      subPackets.push(parsed.number)
      version += parsed.version
      sub = sub.substr(parsed.pos)
      pos += parsed.pos
    }
  }

  let number
  switch (type) {
    case 0: {
      number = subPackets.reduce((acc, cur) => acc + cur, 0)
      break
    }

    case 1: {
      number = subPackets.reduce((acc, cur) => acc * cur, 1)
      break
    }

    case 2: {
      number = Math.min(...subPackets)
      break
    }

    case 3: {
      number = Math.max(...subPackets)
      break
    }

    case 5: {
      number = subPackets[0] > subPackets[1] ? 1 : 0
      break
    }

    case 6: {
      number = subPackets[0] < subPackets[1] ? 1 : 0
      break
    }

    case 7: {
      number = subPackets[0] === subPackets[1] ? 1 : 0
      break
    }
  }

  return { version, number, pos }
}

console.log(parse(binary))
