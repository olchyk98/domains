import { Domain } from '../../src/domain'
import { CalledWithUnknownHandlerKey, OverrideIsNotAllowed } from '../../src/errors'

describe('Domain', () => {
  describe('registration', () => {
    describe('with pred', () => {
      it('should register with pred', () => {
        const domain = new Domain()
        domain.register(() => true, () => 200)
        const result = domain.call({})
        expect(result).toEqual(200)
      })
    })

    describe('with key', () => {
      it('should register with key', () => {
        const domain = new Domain()
        domain.register('other', () => 200)
        const result = domain.call({ key: 'other' })
        expect(result).toEqual(200)
      })

      it('should override registration with key', () => {
        const domain = new Domain({ allow: { overrideRegistrations: true } })
        domain.register('other', () => 200)
        domain.register('other', () => 300)
        const result = domain.call({ key: 'other' })
        expect(result).toEqual(300)
      })

      it('should fail to override registration with key', () => {
        const domain = new Domain()
        domain.register('other', () => 200)
        const fn = () => domain.register('other', () => 300)
        expect(fn).toThrowError(OverrideIsNotAllowed)
      })
    })
  })

  describe('call', () => {
    it('should throw if called with unknown key', () => {
      const domain = new Domain()
      const fn = () => domain.call({ key: 'foobar' })
      expect(fn).toThrowError(CalledWithUnknownHandlerKey)
    })

    it('should fallback to default if unknown key', () => {
      const domain = new Domain({
        defaultHandler: () => 300,
        allow: { callUnknown: true },
      })
      const result = domain.call({ key: 'foobar' })
      expect(result).toEqual(300)
    })

    it('should return undefined if unknown key', () => {
      const domain = new Domain({
        allow: { callUnknown: true },
      })
      const result = domain.call({ key: 'foobar' })
      expect(result).toEqual(undefined)
    })

    it('should call handler by key', () => {
      const domain = new Domain({
        allow: { callUnknown: true },
      })
      domain.register('foobar', () => 300)
      const result = domain.call({ key: 'foobar' })
      expect(result).toEqual(300)
    })

    it('should call last registered handler by pred', () => {
      const domain = new Domain()
      domain.register(() => true, () => 300)
      domain.register(() => true, () => 400)
      const result = domain.call({})
      expect(result).toEqual(400)
    })
  })
})
