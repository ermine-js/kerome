# kerome

kerome is a library for developing browser extensions, offering convenient communication mechanisms and APIs.

## Caution

**This project is still in development, and not ready for production.**

## Usage

```typescript

// in background service worker
import kerome from 'kerome'

kerome.listen({
  // options
}).then(() => {
  console.log('kerome is listening')
})
```

```typescript
// in sandboxed page
import kerome from 'kerome'

kerome.connect({
  // options
}).then(() => {
  console.log('kerome is connected')

  // then you can use kerome APIs
  const tabs = await kerome.tabs.query({ active: true })

  // or add event listeners
  kerome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log('tab updated', tabId, changeInfo, tab)
  })
})
```

## Develop
  
  ```bash
  git clone git@github.com:ermine-js/kerome.git
  cd kerome
  pnpm i
  pnpm dev
  ```

## Test
  
  ```bash
    pnpm test
  ```
