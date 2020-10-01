const { DateTime } = require('luxon')

class Til {
  get seasons() {
    return {
      guild: { start: "2020-09-26", end: "2020-10-02" },
    }
  }

  getAll() {
    const s = this.seasons
    let out = {}

    for (const [typ, period] of Object.entries(s)) {
      out[typ] = this.getReset(period.start, period.end)
    }

    return out
  }

  getReset(start, end) {
    start = DateTime.fromISO(start)
    end = DateTime.fromISO(end).endOf('day')

    let now = DateTime.local()
    let ttr = end.diff(now, ['days', 'hours', 'minutes'])

    return {
      ...ttr.toObject(),
      toString() {
        return ttr.toFormat("d 'days,' h 'hours, and' m 'minutes'")
      },
    }
  }
}

module.exports = {
  Til: Til,
  til: new Til(),
}
