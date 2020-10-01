const { til } = require('./lib/til')

module.exports = {
  name: 'ttr',
  description: 'Time til Reset',
  execute(message) {

    if(message.channel.type != 'dm') {
      message.delete(500)
    }

    let { guild } = til.getAll()
    message.channel.send(`Time To Reset - ${guild}`)
  }
}
