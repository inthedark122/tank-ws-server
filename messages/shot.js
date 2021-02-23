import { addBullet, tanks, bullets } from '../data/board.js'

export function onShot({ data, context, broadcast }) {
  if (context.tankId) {
    addBullet(context.tankId)
    broadcast(JSON.stringify({ type: 'refresh', tanks, bullets }))
  }
}
