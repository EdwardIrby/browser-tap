import { fixture } from '../dist'
import { test } from 'zora'

test('fixture helpers', async t => {
  const { wrapper, cleanup } = await fixture('<p>random text</p>')
  t.equal(wrapper.innerHTML, '<p>random text</p>')
  cleanup()
  t.equal(document.querySelector('test-fixture'), null)
})
