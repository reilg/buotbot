const { timer } = require('./timer')

class Til {
  modes = ['season', 'hell']

  async set(mode, start) {
    if (!this.modes.includes(mode)) {
      return `unsupported mode; ${mode}`
    }

    try {
      let t = await timer.get(mode)
      await t.set(start)
      return mode[0].toUpperCase() + mode.slice(1) + ` timer started at ${t.timers.start}`
    } catch (e) {
      let err = `error setting ${mode} to ${start}`
      console.log(err, e)
      return err
    }
  }

  async get(mode) {
    if(!this.modes.includes(mode)) {
      return `unsupported mode; ${mode}`
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
