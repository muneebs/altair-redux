/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { call, put, select, all } from 'redux-saga/effects'
import { SearchActions, CustomerActions } from 'actions'
import { SearchTypes } from 'action_types'
import { filter, isEmpty } from 'lodash'

export const searchCustomers = function * searchCustomers (action) {
  try {
    if (isEmpty(action.query)) {
      // reset the customers state
      yield put(SearchActions.clearSearchResults())
      yield put(CustomerActions.customersRequest())
    } else {
      const state = yield select()
      const id = state.entities.user.id
      const response = yield call(SearchActions.search, action.query)
      const results = yield all(filter(response.hits, (hit) => {
        // filter our search results
        return hit.createdBy === id
      }).map((hit) => {
        // get the document from the firestore cache.
        return CustomerActions.getCustomerById(hit.objectID)
      }))
      yield put({ type: SearchTypes.RECEIVED_SEARCH_CUSTOMERS, data: results })
      yield put(SearchActions.searchCustomersSuccess())
    }
  } catch (error) {
    yield put(SearchActions.searchCustomersFailure(error))
  }
}
