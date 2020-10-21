const { timer } = require('./timer')

describe('testing timer', () => {
  const start = '2020-10-17'
  const end = '2020-10-23'

  let season, hell

  beforeEach(async () => {
    season = await timer.get('season')
    await season.set(start)
  })

  it('get season timer', async () => {
    expect(season.timers.end).toBe(end)
  })

  it('set season timer', async () => {
    await season.set('2020-10-23')
    expect(season.timers.end).toBe('2020-10-29')
  })

})
