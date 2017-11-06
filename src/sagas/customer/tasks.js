/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { eventChannel } from 'redux-saga'
import { call, put, take } from 'redux-saga/effects'
import { CustomerActions } from 'actions'
import { CustomerTypes } from 'action_types'

function createCustomerSnapshotListener (query) {
  return eventChannel(emit => {
    const unsubscribe = query.onSnapshot({
      next: async(snapshot) => {
        const removed = []
        snapshot.docChanges.forEach(doc => {
          if (doc.type === 'removed') {
            removed.push(doc.id)
          }
        })
        const docs = await Promise.all(snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }))
        emit({
          added: docs,
          removed: removed
        })
      },
      error: (error) => {
        throw error
      }
    })
    return () => {
      unsubscribe()
    }
  })
}

export const createCustomer = function * createCustomer (action) {
  try {
    yield call(CustomerActions.createCustomer, action.customer)
  } catch (error) {
    yield put(CustomerActions.createCustomerFailure(error))
  }
}

export const deleteCustomer = function * deleteCustomer (action) {
  try {
    yield call(CustomerActions.deleteCustomer, action.customerId)
    yield put({ type: CustomerTypes.DELETED_CUSTOMER, customerId: action.customerId })
    yield put(CustomerActions.deleteCustomerSuccess())
  } catch (error) {
    yield put(CustomerActions.deleteCustomerFailure(error))
  }
}

export const customers = function * customers () {
  try {
    const query = yield call(CustomerActions.customers)
    const snapshot = yield call(createCustomerSnapshotListener, query)
    while (true) {
      const { added, removed } = yield take(snapshot)
      yield put({
        type: CustomerTypes.RECEIVED_CUSTOMERS,
        data: {
          customers: added
        }
      })
      yield put(CustomerActions.customersSuccess())
      if (removed.length > 0) {
        yield put({
          type: CustomerTypes.DELETED_CUSTOMERS,
          data: { removed }
        })
        yield put(CustomerActions.deleteCustomerSuccess())
      }
    }
  } catch (error) {
    yield put(CustomerActions.customersFailure(error))
  }
}
