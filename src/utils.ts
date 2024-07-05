import { Domain } from './domain'
import { DomainCall, DomainOpts } from './types'

export function createDomain<T extends DomainCall> (opts: DomainOpts<T> = {}): Domain<T> {
  return new Domain(opts)
}
