import { is, propEq } from 'ramda'
import { Domain, DomainCall } from '..'

const isString = is(String)

interface MediaUploaderCall extends DomainCall {
  type: 'video' | 'audio' | 'other'
  href: string
}

// init
const mediaUploaderDomain = new Domain<MediaUploaderCall>({
  allow: {
    callUnknown: false,
    overrideRegistrations: false,
  },
})

// register with predicates
mediaUploaderDomain.register(propEq('type', 'video'), (call) => {
  return `Uploading video "${call.href}"`
})

mediaUploaderDomain.register(propEq('type', 'audio'), (call) => {
  return `Uploading audio "${call.href}"`
})

mediaUploaderDomain.register(propEq('type', 'other'), (call) => {
  return `Uploading other "${call.href}"`
})

// register with keys
mediaUploaderDomain.register('multiband', (call) => {
  return `Uploading multiband "${call.href}"`
})

// call
const videoResult = mediaUploaderDomain.call({ href: 'video123', type: 'video' })
const audioResult = mediaUploaderDomain.call({ href: 'audio123', type: 'audio' })
const otherResult = mediaUploaderDomain.call({ href: 'other123', type: 'other' })
const multibandResult = mediaUploaderDomain.call({ href: 'multiband', type: 'video', key: 'multiband' })

if (isString(videoResult) && isString(audioResult) && isString(otherResult) && isString(multibandResult)) {
  console.log({ videoResult, audioResult, otherResult, multibandResult })
} else {
  console.log('The implementation seems to be messed up, according to the type predicate.')
}
