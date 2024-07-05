# Domains
## ⚠️ This is an example library. There's no way to install it.

Domains is a straightforward utility package designed to help developers create easily linkable managers for various scenarios in their code. Its primary goal is to move away from basic dictionary mappings and repetitive if-statements, promoting cleaner, more extendable code.

## Problem Statement

Imagine you’re building a media manager that processes requests based on the media type and media URL provided. When a request comes in, your job is to determine which handler function to call. Each handler will download and process the file accordingly.

Typically, you might use if-statements for each media type or create a dictionary where each key is a media type and each value is the corresponding handler function. However, this approach can become unwieldy if you need to perform more specific checks, like verifying file size, handling default cases, or making decisions based on unique conditions:

```tsx
const fileTypeToHandlerMap: Record<string, Handler<...>> = {
  mp4: ...,
  mp3: ...,
  docx: ...,
  pdf: ...,
}

function handle () {
  ...
}
```

This approach isn't ideal if you need to perform more specific checks, such as verifying file size, handling default values, dealing with various file types, or even making decisions based on unique conditions like the moon's distance from Earth.

## Domains

Domains allows you to create a single manager for all the cases, then later you can pipe into that manager with your custom handler for specific cases. For example, this scenario would be re-written like this:

```tsx
// > core.ts
const mediaDomain = new Domain() 

// > mp4handler.ts
mediaDomain.register((fileType) => ..., ...)
// or
mediaDomain.register('mp4', ...)

// rest-server.ts
mediaDomain.call({ type: 'mp4', href: '...' })
```

Domains package supports both key/predicate as handler pointers. Also, you have the possibility to provide a default handler for cases, in case something goes wrong.
