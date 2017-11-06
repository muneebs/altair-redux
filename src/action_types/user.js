/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import keyMirror from 'utils/key_mirror'

export default keyMirror({
  LOGIN_REQUEST: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAILURE: null,

  CONFIRMATION_REQUEST: null,
  CONFIRMATION_SUCCESS: null,
  CONFIRMATION_FAILURE: null,

  SIGN_OUT_REQUEST: null,
  SIGN_OUT_SUCCESS: null,
  SIGN_OUT_FAILURE: null,

  SESSION_TOKEN_REQUEST: null,
  SESSION_TOKEN_FAILURE: null,
  SESSION_TOKEN_SUCCESS: null,

  RECEIVED_ME: null,
  RECEIVED_SEARCH_KEY: null
}, '@@altair-redux/')
