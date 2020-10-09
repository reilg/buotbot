const { timer } = require('./lib/timer')

module.exports = {
  name: 'timers',
  description: 'Time til Reset',
  async execute(message) {
    let timers = await timer.getAll()
    message.channel.send({ embed: timers })
  }
}
