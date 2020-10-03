const { DateTime } = require('luxon')
const { Store } = require('./store')

class Til {
  constructor() {
    this.timers = new Store('timers')
  }

  async getTimer(type) {
    let season = await this.timers.get(type)
    if (!season) {
      return null
    }
    return season
  }

  async setSeasonTimer(date) {
    let start = DateTime.fromISO(date)
    let end = start.plus({ days: 5 })
    this.timers.set('season', { start: start, end: end })
    return 'Season started at: ' + start.toLocaleString()
  }

  async _get() {
    let out = {}

    let types = ['season', 'hell']
    for (const type of types) {
      let tmr = await this.getTimer(type);
      if (!tmr) {
        out[type] = "Timer needs to be set first:\n```!timer {1} YYYY-MM-DD```".replace("{1}", type)
        continue
      }

      let end = DateTime.fromISO(tmr.end)
      let now = DateTime.local()

      let diff = end.diff(now, ['days', 'hours', 'minutes'])
        .toFormat("d 'days,' h 'hours, and' m 'minutes'")
      out[type] = "```bash\n{1}```".replace("{1}", diff)
    }

    return this.embed(out)
  }

  getAll() {
    try {
      return this._get()
    } catch(err) {
      console.log(err)
      return this.error(err)
    }
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
