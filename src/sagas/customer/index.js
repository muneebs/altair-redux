/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { all, fork, takeLatest } from 'redux-saga/effects'
import { CustomerTypes } from 'action_types'
import * as Tasks from './tasks'

const createCustomerRequestWatcher = function * createCustomerRequestWatcher () {
  yield takeLatest(CustomerTypes.CREATE_CUSTOMER_REQUEST, Tasks.createCustomer)
}

const deleteCustomerRequestWatcher = function * deleteCustomerRequestWatcher () {
  yield takeLatest(CustomerTypes.DELETE_CUSTOMER_REQUEST, Tasks.deleteCustomer)
}

const customersRequestWatcher = function * customersRequestWatcher () {
  yield takeLatest(CustomerTypes.CUSTOMERS_REQUEST, Tasks.customers)
}

const root = function * root () {
  yield (all([
    fork(createCustomerRequestWatcher),
    fork(deleteCustomerRequestWatcher),
    fork(customersRequestWatcher)
  ]))
}

export default root
