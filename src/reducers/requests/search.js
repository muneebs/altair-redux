/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { combineReducers } from 'redux'
import { SearchTypes } from 'action_types'

import { handleRequest, initialRequestState } from './helpers'

function searchCustomers (state = initialRequestState(), action) {
  return handleRequest(
    SearchTypes.SEARCH_CUSTOMERS_REQUEST,
    SearchTypes.SEARCH_CUSTOMERS_SUCCESS,
    SearchTypes.SEARCH_CUSTOMERS_FAILURE,
    state,
    action
  )
}

export default combineReducers({
  searchCustomers
})
