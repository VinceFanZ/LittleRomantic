/// <reference path="../global.d.ts" />

console.log(111)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept(() => {
    // or use this instead of dispose()
    // window.location.reload();
  })

  module.hot.dispose(() => {
    window.location.reload()
  })
}
