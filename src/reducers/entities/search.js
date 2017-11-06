/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { combineReducers } from 'redux'
import { SearchTypes, UserTypes } from 'action_types'

function results (state = [], action) {
  switch (action.type) {
    case SearchTypes.RECEIVED_SEARCH_CUSTOMERS: {
      return action.data
    }

    case UserTypes.SIGN_OUT_SUCCESS:
      return []

    default:
      return state
  }
}

export default combineReducers({
  results
})
