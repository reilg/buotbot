const { til } = require('./til')

describe('testing til', () => {
  it('should be good', () => {
    let start = "2020-09-26"
    let end = "2020-10-02"
    let reset = til.getAll()
    console.log(`${reset.guild}`)
  })
})
