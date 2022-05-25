// [
//   [[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]],
//   [[[5,[2,8]],4],[5,[[9,9],0]]],
//   [6,[[[6,2],[5,6]],[[7,6],[4,7]]]],
//   ...
// ]
const data = require("fs")
  .readFileSync(0, "utf-8")
  .split(/\n/)
  .map((i) => JSON.parse(i))

const toTree = (val) => {
  if (typeof val === "number") {
    return { v: val, isLeaf: true }
  } else {
    return { left: toTree(val[0]), right: toTree(val[1]) }
  }
}

const explode = (tree, path = []) => {
  if (path.length < 5) {
    if (tree.isLeaf) return
    return (
      explode(tree.left, [...path, tree]) ||
      explode(tree.right, [...path, tree])
    )
  }

  const exploded = path.pop()
  const parent = path.pop()

  if (parent.left === exploded) {
    let f = parent.right
    while (!f.isLeaf) {
      f = f.left
    }

    f.v += exploded.right.v

    let prev = parent
    for (const node of path.reverse()) {
      if (node.right === prev) {
        f = node.left

        while (!f.isLeaf) {
          f = f.right
        }

        f.v += exploded.left.v

        break
      } else {
        prev = node
      }
    }

    parent.left = { isLeaf: true, v: 0 }
  } else {
    let f = parent.left
    while (!f.isLeaf) {
      f = f.right
    }

    f.v += exploded.left.v

    let prev = parent
    for (const node of path.reverse()) {
      if (node.left === prev) {
        f = node.right
        while (!f.isLeaf) {
          f = f.left
        }

        f.v += exploded.right.v
        break
      } else {
        prev = node
      }
    }

    parent.right = { isLeaf: true, v: 0 }
  }

  return true
}

const split = (tree) => {
  if (tree.isLeaf) {
    if (tree.v >= 10) {
      tree.left = { isLeaf: true, v: Math.floor(tree.v / 2) }
      tree.right = { isLeaf: true, v: Math.ceil(tree.v / 2) }
      delete tree.v
      delete tree.isLeaf
      return true
    }

    return false
  }

  return split(tree.left) || split(tree.right)
}

const sumTree = (t1, t2) => {
  const tree = { left: t1, right: t2 }

  let i = 0
  while (explode(tree) || split(tree) || i > 10000) {
    i++
  }

  if (i > 10000) {
    console.warn("sumTree: max iterations reached")
  }

  return tree
}

const magnitude = (tree) => {
  if (tree.isLeaf) {
    return tree.v
  } else {
    return 3 * magnitude(tree.left) + 2 * magnitude(tree.right)
  }
}

const solution1 = () => {
  const finalSum = data.reduce((acc, cur) => {
    return acc == null ? toTree(cur) : sumTree(acc, toTree(cur))
  }, null)

  console.log(magnitude(finalSum))
}

const solution2 = () => {
  let max = 0
  for (let i = 0; i < data.length - 1; i++) {
    for (let j = i + 1; j < data.length; j++) {
      max = Math.max(
        max,
        magnitude(sumTree(toTree(data[i]), toTree(data[j]))),
        magnitude(sumTree(toTree(data[j]), toTree(data[i])))
      )
    }
  }

  console.log(max)
}

solution1()
solution2()
