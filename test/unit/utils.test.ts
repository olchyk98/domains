import { Domain, createDomain } from '../../src'

describe('utils', () => {
  describe('#createDomain', () => {
    it('should create domain with opts', () => {
      const domain = createDomain()
      expect(domain instanceof Domain).toEqual(true)
    })
  })
})
