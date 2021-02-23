import WebSocket from 'ws'
import crypto from 'crypto'
import { wss } from './core/wss.js'
import { incoming } from './messages/main.js'
import { recalculateBullets, tanks, bullets, addTank } from './data/board.js'

function broadcast(message) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message)
    }
  })
}

wss.on('connection', function connection(ws) {
  ws.on('message', incoming(ws, broadcast))

  ws.send(JSON.stringify({ type: 'connected' }))
})

// new Array(10).fill(null).forEach(() => {
//   const id = crypto.randomBytes(16).toString("hex");

//   addTank(id);
// })

setInterval(function () {
  if (bullets.length > 0) {
    recalculateBullets()
    broadcast(JSON.stringify({ type: 'refresh', tanks, bullets }))
  }
}, 160)
