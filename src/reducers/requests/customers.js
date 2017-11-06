/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { combineReducers } from 'redux'
import { CustomerTypes } from 'action_types'
import { handleRequest, initialRequestState } from './helpers'

/**
 *
 * @param {Object} state
 * @param {Action} action
 * @returns {{status}|{status, error}|*}
 */
function createCustomer (state = initialRequestState(), action) {
  return handleRequest(
    CustomerTypes.CREATE_CUSTOMER_REQUEST,
    CustomerTypes.CREATE_CUSTOMER_SUCCESS,
    CustomerTypes.CREATE_CUSTOMER_FAILURE,
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
function deleteCustomer (state = initialRequestState(), action) {
  return handleRequest(
    CustomerTypes.DELETE_CUSTOMER_REQUEST,
    CustomerTypes.DELETE_CUSTOMER_SUCCESS,
    CustomerTypes.DELETE_CUSTOMER_FAILURE,
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
function allCustomers (state = initialRequestState(), action) {
  return handleRequest(
    CustomerTypes.CUSTOMERS_REQUEST,
    CustomerTypes.CUSTOMERS_SUCCESS,
    CustomerTypes.CUSTOMERS_FAILURE,
    state,
    action
  )
}

export default combineReducers({
  createCustomer,
  deleteCustomer,
  allCustomers
})
