import { tanks, bullets, addTank } from '../data/board.js'

export function init({ data, context, broadcast }) {
  addTank(data.tankId)

  context.tankId = data.tankId

  return broadcast(JSON.stringify({ type: 'refresh', tanks, bullets }))
}
