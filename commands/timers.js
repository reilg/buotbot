const { til } = require('./lib/til')

module.exports = {
  name: 'timers',
  description: 'Time til Reset',
  async execute(message) {
    let timers = await til.getAll()
    message.channel.send({ embed: timers })
  }
}
