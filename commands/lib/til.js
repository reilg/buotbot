const { timer } = require('./timer')

class Til {
  modes = ['season', 'hell']

  async set(mode, start) {
    if (!this.modes.includes(mode)) {
      throw Error(`unsupported mode: ${mode}`)
    }

    let t = await timer.get(mode)
    return t.set(start)
  }

  async get(mode) {
    if(!this.modes.includes(mode)) {
      throw Error(`unsupported mode: ${mode}`)
    }

    return timer.get(mode)
  }

  async getAll() {
    let timers = {}
    for(const m of this.modes) {
      let t = await this.get(m)
      timers[m] = t.reset
    }

    return this.embed(timers)
  }

  embed(timers) {
    return {
      "color": 2861636,
      "fields": [
        {
          "name": "Season Reset",
          "value": timers.season,
        },
        {
          "name": "Hell Reset",
          "value": timers.hell,
        }
      ]
    }
  }

  error(err) {
    console.log('err', err)
    return 'error - check logs'
  }
}

module.exports = {
  Til: Til,
  til: new Til(),
}
