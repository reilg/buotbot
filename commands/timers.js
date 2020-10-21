const { til } = require('./lib/til')

async function get(message) {
  let timers = await til.getAll()
  message.channel.send({ embed: timers })
}

async function set(message, mode, date) {
  let response = await til.set(mode, date)
  message.channel.send(response)
}

module.exports = {
  name: 'timers',
  aliases: ['t'],
  description: 'Get reset timers',
  async execute(m, args) {
    if (args.length > 2) {
      return m.channel.send('Too many arguments. usage: `!timers {type} {start-date}`')
    }

    if (args.length > 0) {
      return set(m, ...args)
    }

    return get(m)
  }
}
