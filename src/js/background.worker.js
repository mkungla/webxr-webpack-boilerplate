/* eslint-disable no-undef */
self.onmessage = (ev) => {
  console.log('Message received from main script')
  if (!('status' in ev)) {
    const msg = `worker knows that app is ${ev.status}`

    self.postMessage(msg)
  }
}
