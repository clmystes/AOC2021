const assert = require("assert")
const data = require("fs").readFileSync(0, "utf-8")

const HALLWAY_EXIT_POS = [2, 4, 6, 8]
const ALLOWED_STAY_POS = [0, 1, 3, 5, 7, 9, 10]
const ENERGY_COST = {
  A: 1,
  B: 10,
  C: 100,
  D: 1000,
}
const TARGET_ROOM = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
}

// run(parse(data)) // 13495
run(parse(data, true)) //

function run(parsed) {
  console.log("result:", calculateLeastEnergy(parsed))
}

// #############
// #...........#
// ###A#D#A#B###
//   #C#C#D#B#
//   #########
function parse(data, isPart2) {
  const lines = data.split("\n")

  if (isPart2) {
    lines.splice(3, 0, "  #D#C#B#A#")
    lines.splice(4, 0, "  #D#B#A#C#")
  }

  const rooms = []
  const state = []
  for (let i = 2; i < lines.length - 1; i++) {
    const room = lines[i].split("").filter((v) => v !== "#" && v !== " ")
    room.forEach((v, roomIdx) => {
      state.push({
        name: v,
        room: roomIdx,
        row: i - 2,
        hallwayPos: -1,
        hasMoved: false,
      })
    })
    rooms.push(room)
  }

  return {
    leastEnergy: Number.MAX_SAFE_INTEGER,
    /**@type string[] */
    hallway: lines[1].split("").filter((v) => v === "."),
    /**@type string[][] - [[a, d, a, b], [c, c, d, b]] */
    rooms,
    /**@type {{name: string, room: number, row: number, hallwayPos: number, hasMoved: boolean}} - */
    state,
  }
}

function findLeastEnergyRec(data, prevEnergy, cache) {
  const key = JSON.stringify(data, prevEnergy)

  if (cache.has(key)) return

  cache.set(key, true)

  for (let n = 0; n < data.state.length; n++) {
    let cur = data.state[n] // { name: "A", room: 0, row: 0, hallwayPos: -1, hasMoved: false }
    let { row, room } = cur
    let homeRoom = TARGET_ROOM[cur.name]

    // 在 hallway 上的 amphipods
    if (cur.hallwayPos !== -1) {
      // 找到第一个空房间
      let isHomeFree = false
      let homeRow = 0
      for (let n = 0; n < data.rooms.length; n++) {
        if (data.rooms[n][homeRoom] === ".") {
          homeRow = n
          isHomeFree = true
        }
      }

      // 看下层房间的 amphipods 是否和自己相同
      for (let n = homeRow + 1; n < data.rooms.length; n++) {
        if (data.rooms[n][homeRoom] !== cur.name) {
          isHomeFree = false
        }
      }

      if (!isHomeFree) continue

      // 检查是否能到达这个房间
      let isBlocked = false
      let homeRoomExitPos = HALLWAY_EXIT_POS[homeRoom]

      if (homeRoomExitPos < cur.hallwayPos) {
        for (let k = homeRoomExitPos; k < cur.hallwayPos && !isBlocked; ++k) {
          if (data.hallway[k] !== ".") {
            isBlocked = true
          }
        }
      } else {
        for (
          let k = cur.hallwayPos + 1;
          k <= homeRoomExitPos && !isBlocked;
          ++k
        ) {
          if (data.hallway[k] !== ".") {
            isBlocked = true
          }
        }
      }

      if (isHomeFree && !isBlocked) {
        let energy =
          (Math.abs(homeRoomExitPos - cur.hallwayPos) + (homeRow + 1)) *
          ENERGY_COST[cur.name]

        if (prevEnergy + energy >= data.leastEnergy) continue

        // 检查是否都到达目标位置
        let allAtHome = true
        let prevRoomOwner = data.rooms[homeRow][homeRoom]
        data.rooms[homeRow][homeRoom] = cur.name

        for (let r = 0; r < data.rooms.length; ++r) {
          if (
            !(
              data.rooms[r][0] === "A" &&
              data.rooms[r][1] === "B" &&
              data.rooms[r][2] === "C" &&
              data.rooms[r][3] === "D"
            )
          ) {
            allAtHome = false
            break
          }
        }
        data.rooms[homeRow][homeRoom] = prevRoomOwner

        if (allAtHome) {
          data.leastEnergy = energy + prevEnergy
        } else {
          let prevHallwayState = data.hallway[cur.hallwayPos]
          let prevRoomState = data.rooms[homeRow][homeRoom]
          let prevRow = cur.row
          let prevRoom = cur.room
          let prevHallwayPos = cur.hallwayPos

          data.hallway[cur.hallwayPos] = "."
          data.rooms[homeRow][homeRoom] = cur.name
          cur.row = homeRow
          cur.room = homeRoom
          cur.hallwayPos = -1

          findLeastEnergyRec(data, prevEnergy + energy, cache)

          data.hallway[prevHallwayPos] = prevHallwayState
          data.rooms[homeRow][homeRoom] = prevRoomState
          cur.row = prevRow
          cur.room = prevRoom
          cur.hallwayPos = prevHallwayPos
        }
      }
    } else {
      // 在房间的 amphipods
      for (let i = 0; i < ALLOWED_STAY_POS.length; ++i) {
        if (data.hallway[ALLOWED_STAY_POS[i]] !== ".") continue

        // 是否被 block 了
        let isBlockedByStateAbove = false
        for (let n = row - 1; n >= 0; --n) {
          if (data.rooms[n][room] !== ".") {
            isBlockedByStateAbove = true
            break
          }
        }

        if (isBlockedByStateAbove) continue

        let energy = 0
        let newPos = ALLOWED_STAY_POS[i]

        let exitPos = HALLWAY_EXIT_POS[room]
        let isBlocked = false
        if (newPos < exitPos) {
          for (let k = newPos; k < exitPos && !isBlocked; ++k) {
            if (data.hallway[k] !== ".") isBlocked = true
          }
        } else {
          for (let k = exitPos + 1; k <= newPos && !isBlocked; ++k) {
            if (data.hallway[k] !== ".") isBlocked = true
          }
        }

        if (isBlocked) continue

        let name = data.rooms[row][room]

        energy += (Math.abs(exitPos - newPos) + (row + 1)) * ENERGY_COST[name]

        if (prevEnergy + energy < data.leastEnergy) {
          let prevRoomState = data.rooms[row][room]
          let prevHallwayState = data.hallway[newPos]
          let prevHallwayPos = cur.hallwayPos
          let prevRow = cur.row
          let prevRoom = cur.room
          let prev_hasMoved = cur.hasMoved

          data.rooms[row][room] = "."
          data.hallway[newPos] = name
          cur.hallwayPos = newPos
          cur.row = -1
          cur.room = -1
          cur.hasMoved = true

          findLeastEnergyRec(data, prevEnergy + energy, cache)

          data.rooms[row][room] = prevRoomState
          data.hallway[newPos] = prevHallwayState
          cur.hallwayPos = prevHallwayPos
          cur.row = prevRow
          cur.room = prevRoom
          cur.hasMoved = prev_hasMoved
        }
      }
    }
  }
}

function calculateLeastEnergy(data) {
  const wasChecked = new Map()

  findLeastEnergyRec(data, 0, wasChecked)

  return data.leastEnergy
}
