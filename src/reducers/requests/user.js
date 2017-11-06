/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { combineReducers } from 'redux'
import { UserTypes } from 'action_types'
import { handleRequest, initialRequestState } from './helpers'

/**
 *
 * @param {Object} state
 * @param {Action} action
 * @returns {{status}|{status, error}|*}
 */
function login (state = initialRequestState(), action) {
  return handleRequest(
    UserTypes.LOGIN_REQUEST,
    UserTypes.LOGIN_SUCCESS,
    UserTypes.LOGIN_FAILURE,
    state,
    action
  )
}

/**
 *
 * @param {Object} state
 * @param {Action} action
 * @returns {{status}|{status, error}|*}
 */
function getSessionToken (state = initialRequestState(), action) {
  return handleRequest(
    UserTypes.SESSION_TOKEN_REQUEST,
    UserTypes.SESSION_TOKEN_SUCCESS,
    UserTypes.SESSION_TOKEN_FAILURE,
    state,
    action
  )
}

/**
 *
 * @param {Object} state
 * @param {Action} action
 * @returns {{status}|{status, error}|*}
 */
function confirmationResult (state = initialRequestState(), action) {
  return handleRequest(
    UserTypes.CONFIRMATION_REQUEST,
    UserTypes.CONFIRMATION_SUCCESS,
    UserTypes.CONFIRMATION_FAILURE,
    state,
    action
  )
}

export default combineReducers({
  login,
  getSessionToken,
  confirmationResult
})
