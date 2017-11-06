/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { all, fork, throttle } from 'redux-saga/effects'
import { SearchTypes } from 'action_types'
import * as Tasks from 'sagas/search/tasks'

const searchCustomersRequest = function * searchCustomersRequest () {
  yield throttle(500, SearchTypes.SEARCH_CUSTOMERS_REQUEST, Tasks.searchCustomers)
}

const root = function * root () {
  yield (all([
    fork(searchCustomersRequest)
  ]))
}

export default root
