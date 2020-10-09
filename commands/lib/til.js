const { DateTime } = require('luxon')
const { Store } = require('./store')

class Til {
  constructor() {
    this.timers = new Store('timers')
    this.modes = ['season', 'hell']
  }

  async setTimer(type, date) {
    let start = DateTime.fromISO(date)
    let end = start.plus({ days: 5 })

    if (![ 'season', 'hell' ].includes(type)) {
      return 'fail'
    }

    await this.timers.set(type, { start: start, end: end })
    return start.toISODate()
  }

  async getTimer(type) {
    return this.timers.get(type)
  }

  async getDiff(start, end, type) {
    return start.diff(end)
  }

  async getTimers() {
    let out = {}

    for (const type of this.modes) {
      let t = await this.getTimer(type);
      if (!t) {
        out[type] = ""
        continue
      }

      let start = DateTime.fromISO(t.start)
      let end = DateTime.fromISO(t.end)
      let now = DateTime.local()

      let diff = await this.getDiff(end, now, type)
      // let diff = end.diff(now, ['days', 'hours', 'minutes'])
      // if (diff.day < 0) {
      //   let {start, end} = await this.reset(type)
      // }
      out[type] = diff.toFormat("d 'days,' h 'hours, and' m 'minutes'")
    }

    return this.embed(out)
  }

  getAll() {
    try {
      return this.getTimers()
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
          "value": timers.season || "No timer set",
        },
        {
          "name": "Hell Reset",
          "value": timers.hell || "No timer set",
        }
      ]
    }
  }

  async error(err) {
    const errStore = new Store('errors')
    await errStore.set(DateTime.local(), err)
    return 'error getting timers - check with dev'
  }
}

module.exports = {
  Til: Til,
  til: new Til(),
}
