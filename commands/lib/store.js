const KeyV = require('keyv')

class Store {
  constructor(name) {
    let conn = process.env.REDIS_URL
    if (!name) {
      this.db = new KeyV(conn)
    }

    this.db = new KeyV(conn, { namespace: name })
  }

  async set(key, value) {
    return this.db.set(key, value)
  }

  async get(key) {
    return this.db.get(key)
  }
}

module.exports = {
  Store: Store
}
