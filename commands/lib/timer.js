const { Store } = require('./store')

class Timer {
  modes = [ 'season', 'hell' ]
  length = {
    season: 5,
    hell: 9,
  }
  constructor(mode) {
    switch (mode) {
      case 'season':
      case 'hell':
        this.mode = mode
        break
      default:
        throw Error('mode not supported')
        break
    }

    this.store = new Store(mode)
  }

  async get() {
    await this.store.get(this.mode)
  }

  set() {}

  reset() {}
}

module.exports = {
  Timer: Timer
}
