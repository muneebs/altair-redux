/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { combineReducers } from 'redux'

import type { Action } from 'redux'
import { UserTypes } from 'action_types'
import { REHYDRATE } from 'redux-persist/constants'

function id (state = '', action: Action): string {
  switch (action.type) {
    case UserTypes.RECEIVED_ME: {
      const data = action.data || action.payload
      return data.uid ? data.uid : state
    }

    case UserTypes.SIGN_OUT_SUCCESS:
      return ''

    default:
      return state
  }
}

function name (state = '', action: Action): string {
  switch (action.type) {
    case UserTypes.RECEIVED_ME: {
      const data = action.data || action.payload
      return data.displayName ? data.displayName : state
    }

    case UserTypes.SIGN_OUT_SUCCESS:
      return ''

    default:
      return state
  }
}

function phoneNumber (state = '', action: Action): string {
  switch (action.type) {
    case UserTypes.RECEIVED_ME: {
      const data = action.data || action.payload
      return data.phoneNumber ? data.phoneNumber : state
    }

    case UserTypes.SIGN_OUT_SUCCESS:
      return ''

    default:
      return state
  }
}

function photoURL (state = '', action): string {
  switch (action.type) {
    case UserTypes.RECEIVED_ME:
      const data = action.data || action.payload
      return data.photoURL ? data.photoURL : state

    case UserTypes.SIGN_OUT_SUCCESS:
      return ''

    default:
      return state
  }
}

function verificationId (state = '', action): Object {
  switch (action.type) {
    case UserTypes.LOGIN_SUCCESS:
      return action.payload ? action.payload : state
    case UserTypes.LOGIN_REQUEST:
    case UserTypes.SIGN_OUT_SUCCESS:
    case UserTypes.CONFIRMATION_SUCCESS:
      return ''

    default:
      return state
  }
}

function isAuthenticated (state = false, action): Object {
  switch (action.type) {
    case UserTypes.SESSION_TOKEN_SUCCESS:
      return true
    case REHYDRATE:
    case UserTypes.SESSION_TOKEN_REQUEST:
    case UserTypes.SIGN_OUT_SUCCESS:
    case UserTypes.SESSION_TOKEN_FAILURE:
      return false
    default:
      return state
  }
}

function searchKey (state = '', action): Object {
  switch (action.type) {
    case UserTypes.RECEIVED_SEARCH_KEY:
      return action.payload || action.data
    case UserTypes.SIGN_OUT_SUCCESS:
      return ''

    default:
      return state
  }
}

export default combineReducers({
  id,
  name,
  phoneNumber,
  photoURL,
  verificationId,
  isAuthenticated,
  searchKey
})
