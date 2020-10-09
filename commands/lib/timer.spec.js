let { DateTime } = require('luxon');
let { Timer } = require('./timer');

describe('test season timers', () => {
  let timer;
  let now = DateTime.local();
  let sixDaysAgo = now.minus({ day: 6 }).startOf('day').toISODate();

  beforeEach(async () => {
    timer = new Timer('season');
    await timer.load()
  })

  it('should return no timer', async () => {
    timer.start = null
    timer.end = null

    let res = await timer.getDiff();
    expect(res).toMatch('season timer not set');
  })

  it('should load timers', async () => {
    await timer.set(sixDaysAgo);
    timer.start = null
    timer.end = null

    await timer.load()

    expect(timer.start).not.toBeNull()
    expect(timer.end).not.toBeNull()
  })

  it('should reset timers', async () => {
    await timer.set(sixDaysAgo);
    let res = await timer.get();
    expect(res).toMatch('4 days');
  })
})
