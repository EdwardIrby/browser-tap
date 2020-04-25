export const nextFrame = () =>
  new Promise(resolve => requestAnimationFrame(() => resolve()))

const tag = 'test-fixture'
/**
 * @param {String} str
 */
export const fixture = async str => {
  // Verify test-fixture is defined and str is a String
  !!customElements.get(tag) ||
    customElements.define(tag, class extends HTMLElement {})
  await customElements.whenDefined(tag)
  if (typeof str !== 'string') throw new Error('Invalid template provided')
  // Create new test-fixture and append to dom along with test-fixture removal function
  const wrapper = document.createElement(tag)
  document.body.appendChild(wrapper)
  const cleanup = () => wrapper.remove()
  // Create a template from the str argument and append to it's light dom so the slot can move it into isolation
  const template = document.createElement('template')
  template.innerHTML = str
  wrapper.appendChild(template.content.cloneNode(true))
  // wait for next animation tick just in case
  await nextFrame()
  return Object.freeze({ wrapper, cleanup })
}
