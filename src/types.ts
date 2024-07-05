export interface DomainOpts<T extends DomainCall> {
  defaultHandler?: Handler<T>
  allow?: {
    // Allow/Disallow calling Domain.register()
    // with already registered key.
    overrideRegistrations?: boolean
    // Allow/Disallow calling Domain.call()
    // with unknown key/call.
    callUnknown?: boolean
  }
}

export type Handler<T extends DomainCall> = (domainCall: T) => unknown | Promise<unknown>
export type Pred<T extends DomainCall> = (domainCall: T) => boolean

export type RegistrationKeyRaw = string | number

export type RegistrationKey<T extends DomainCall> = (
  RegistrationKeyRaw | Pred<T>
)

export interface DomainCall {
  key?: RegistrationKeyRaw
}
