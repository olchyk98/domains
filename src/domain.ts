import { findLast, isNil } from 'ramda'
import { CalledWithUnknownHandlerKey, OverrideIsNotAllowed } from './errors'
import { DomainCall, DomainOpts, Handler, Pred, RegistrationKey } from './types'

export class Domain<T extends DomainCall> {
  private opts: DomainOpts<T>
  private keyRegistrations: Record<string | number, Handler<T>>
  private handlerRegistrations: [Pred<T>, Handler<T>][]

  constructor (opts: DomainOpts<T> = {}) {
    this.opts = opts
    this.handlerRegistrations = []
    this.keyRegistrations = {}
  }

  register (key: RegistrationKey<T>, handler: Handler<T>): void {
    if (typeof key === 'function') {
      this.handlerRegistrations.push([ key, handler ])
    } else {
      if (key in this.keyRegistrations && !this.opts.allow?.overrideRegistrations) {
        throw new OverrideIsNotAllowed()
      }
      this.keyRegistrations[key] = handler
    }
  }

  private findHandler (call: T): Handler<T> | null {
    if (!isNil(call.key)) {
      const handler = this.keyRegistrations[call.key]
      return handler ?? null
    } else {
      const registration = findLast(([ pred ]) => pred(call), this.handlerRegistrations)
      return registration?.[1] ?? null
    }
  }

  call (call: T): unknown {
    const handler = this.findHandler(call)
    if (isNil(handler) && !this.opts.allow?.callUnknown) {
      throw new CalledWithUnknownHandlerKey(call.key?.toString() ?? 'undefined')
    }
    if (isNil(handler) && !isNil(this.opts.defaultHandler)) {
      return this.opts.defaultHandler(call)
    }
    return handler?.(call)
  }
}
