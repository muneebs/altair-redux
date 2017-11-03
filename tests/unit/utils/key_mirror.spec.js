/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import keyMirror from 'utils/key_mirror'

describe('key_mirror spec', () => {
  it('should create a key mirror of an object with a prefix', () => {
    const TEST_OBJECT = keyMirror({
      THIS_TEST: null
    }, '@@myprefix/')
    expect(TEST_OBJECT.THIS_TEST).to.equal('@@myprefix/THIS_TEST')
  })

  it('should create a key mirror of an object with no prefix', () => {
    const TEST_OBJECT = keyMirror({
      THIS_TEST: null
    })
    expect(TEST_OBJECT.THIS_TEST).to.equal('THIS_TEST')
  })
})
