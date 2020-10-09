const { Store } = require('./store')
const { DateTime } = require('luxon')

class Timer {
  constructor(type) {
    this.type = type;
    this.store = new Store('timers');
    this.start = null
    this.end = null
  }

  async load() {
    let timers = await this.store.get(this.type)
    if (!timers) {
      return Promise.resolve(`${this.type} timer not set`)
    }

    this.start = timers.start
    this.end = timers.end
  }

  get length() {
    switch (this.type) {
      case 'hell':
        return 10;
      case 'season':
      default:
        return 5;
        break;
    }
  }

  get nextStart() {
    return this.length + 1
  }

  async set(date) {
    this.start = DateTime.fromISO(date)
    this.end = this.start.plus({ days: this.length })
    try {
      await this.store.set(
        this.type,
        {
          start: this.start.toISODate(),
          end: this.end.toISODate(),
        }
      )
      return Promise.resolve(this.start.toISODate())
    } catch(err) {
      return Promise.reject(err)
    }
  }

  async reset() {
    if (this.end && this.end.day >= 0) {
      Promise.resolve('no need to reset')
    }

    let newStart = this.start.plus({ day: this.nextStart })
    await this.set(newStart)
  }

  async getDiff() {
    if (!this.start) {
      return Promise.resolve(`${this.type} timer not set`)
    }

    let now = DateTime.local()
    let diff = this.end.diff(now)
    if (diff.as('days') < 0) {
      await this.reset()
      return this.getDiff()
    }

    return this.end.diff(now)
  }

  async get() {
    let diff = await this.getDiff()
    return diff.toFormat("d 'days,' h 'hours, and' m 'minutes'")
  }
}

module.exports.Timer = Timer
