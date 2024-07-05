export class OverrideIsNotAllowed extends Error {
  constructor () {
    super('Tried to override existing key registration without "override" being set to true!')
  }
}

export class CalledWithUnknownHandlerKey extends Error {
  constructor (handlerKey: string) {
    super(`Tried to call unknown handler with key "${handlerKey}"`)
  }
}
