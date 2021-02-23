import { moveTank, tanks, bullets } from '../data/board.js'

export function onMove({ data, context, broadcast }) {
  if (context.tankId) {
    moveTank(context.tankId, data.position)
    broadcast(JSON.stringify({ type: 'refresh', tanks, bullets }))
  }
}
