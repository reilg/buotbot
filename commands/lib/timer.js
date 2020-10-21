const { DateTime } = require('luxon')
const { Store } = require('./store')

class Timer {
  #store

  constructor() {
    this.#store = new Store('timers')
  }

  get length() {
    switch (this.mode) {
      case 'season':
        return 5+1
      case 'hell':
        return 10+1
    }
  }

  get store() {
    return this.#store
  }

  get timers() {
    return {
      start: this.start.toISODate(),
      end: this.end.toISODate(),
    }
  }

  get reset() {
    return this.diff.toFormat("d 'days,' h 'hours, and' m 'minutes'")
  }

  async set(date) {
    this.start = DateTime.fromISO(date)
    this.end = this.start.plus({ day: this.length })

    await this.store.set(this.mode, {
      start: this.start.toISODate(),
      end: this.end.toISODate()
    })

    return this.getDiff()
  }

  async get(mode) {
    this.mode = mode
    let { start, end } = await this.store.get(mode) || { start: null, end: null }

    this.start = DateTime.fromISO(start)
    this.end = DateTime.fromISO(end)

    return this.getDiff()
  }

  async getDiff() {
    let now = DateTime.local().setZone('UTC+8')
    this.diff = this.end.diff(now)
    if (this.diff.as('days') < 0) {
      await this.set(this.end.toISODate())
      return this.getDiff()
    }

    return this
  }
}

module.exports = {
  timer: new Timer()
}
