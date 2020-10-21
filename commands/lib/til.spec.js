const { til } = require('./til')

describe('testing til', () => {
  let season, hell

  beforeEach(async () => {
    season = await til.set('season', '2020-10-17')
    hell = await til.set('hell', '2020-10-15')
  })

  it('set season timers', async () => {
    let timers = await til.getAll()
    expect(timers.color).toBeDefined()
    expect(timers.fields.length).toBe(2)
  })
})
