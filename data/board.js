const gridSize = 20

export const tanks = {}
export let bullets = []

function random() {
  return Math.floor(Math.random() * gridSize)
}

function getNextPosition(tank) {
  const { x, y } = tank

  switch (tank.position) {
    case 'top':
      return { x, y: y - 1 }
    case 'right':
      return { x: x + 1, y }
    case 'bottom':
      return { x, y: y + 1 }
    case 'left':
      return { x: x - 1, y }
  }
}

function canMove(tank, position) {
  switch (position) {
    case 'top':
      return tank.y > 0
    case 'right':
      return tank.x < gridSize - 1
    case 'bottom':
      return tank.y < gridSize - 1
    case 'left':
      return tank.x > 0
  }
}

function getTanksByCoordinate(x, y) {
  return Object.values(tanks).filter((tank) => tank.x === x && tank.y === y)
}

function isCollision(coordinate) {
  return (
    Object.values(tanks).find(
      (tank) => tank.x === coordinate.x && tank.y === coordinate.y
    ) !== -1
  )
}

export function addTank(tankId) {
  let coordinate = { x: random(), y: random() }

  while (!isCollision(coordinate)) {
    coordinate = { x: random(), y: random() }
  }

  tanks[tankId] = { tankId, ...coordinate, position: 'right' }
}

export function addBullet(tankId) {
  const tank = tanks[tankId]

  bullets.push({ tankId, ...getNextPosition(tank), position: tank.position })
}

export function removeTank(tankId) {
  delete tanks[tankId]
}

export function moveTank(tankId, position) {
  const tank = tanks[tankId]

  if (canMove(tank, position)) {
    tank.position = position
    Object.assign(tank, getNextPosition(tank))
  }
}

export function recalculateBullets() {
  bullets = bullets.filter((bullet) => canMove(bullet, bullet.position))

  bullets.forEach(function (bullet) {
    Object.assign(bullet, getNextPosition(bullet))
  })

  const indexedToDelete = []
  const tanksToDelete = []

  bullets.forEach((bullet, index) => {
    const tanks = getTanksByCoordinate(bullet.x, bullet.y).filter(
      (tank) => tank.id !== bullet.tankId
    )

    if (tanks.length) {
      indexedToDelete.push(index)
      tanksToDelete.push(...tanks)
    }
  })

  if (indexedToDelete.length) {
    indexedToDelete.reverse().forEach((idx) => {
      bullets.splice(idx, 1)
    })
  }

  if (tanksToDelete.length) {
    const uniqTanksToDelete = new Set(tanksToDelete.map((tank) => tank.tankId))

    uniqTanksToDelete.forEach((tankId) => {
      delete tanks[tankId]
      addTank(tankId)
    })
  }
}
