const { DateTime } = require('luxon')
const { til } = require('./til')

describe('test til', () => {
  let start = "2020-10-08"
  let expired = DateTime.local().startOf('day').minus({ days: 6 })

  it('should set timer', async () => {
    let res = await til.setTimer('season', start)
    expect(res).toBe(start)
  })

  it('should be good', async () => {
    let reset = await til.getTimers()
    console.log(reset)
  })
})
