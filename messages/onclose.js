import { removeTank, tanks, bullets } from '../data/board.js'

export function onclose({ context, broadcast }) {
  if (context.tankId) {
    removeTank(context.tankId)
    broadcast(JSON.stringify({ type: 'refresh', tanks, bullets }))
  }
}
