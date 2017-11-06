/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { UserTypes, CustomerTypes, SearchTypes } from 'action_types'
import { isEmpty } from 'lodash'

function handleReceivedCustomers (customers, action) {
  const newCustomers = action.data.customers
  const nextCustomers = {...customers}

  for (const newCustomer of Object.values(newCustomers)) {
    // only change the stored customers if it's changed since we last recieved it
    if (!newCustomers[newCustomer.id] || newCustomers[newCustomer.id].updatedAt < newCustomer.updatedAt) {
      // eslint-disable-next-line immutable/no-mutation
      nextCustomers[newCustomer.id] = newCustomer
    }
  }

  return {customers: nextCustomers}
}

function handleReceivedCustomer (customers, action) {
  const customer = action.data
  const nextCustomers = {
    ...customers,
    [customer.id]: customer
  }

  return {customers: nextCustomers}
}

function deleteCustomers (customers, action) {
  const nextCustomers = {...customers}
  action.data.removed.map(id => {
    delete nextCustomers[id]
  })
  return {customers: nextCustomers}
}

function deleteCustomer (customers, action) {
  const nextCustomers = {...customers}
  delete nextCustomers[action.customerId]
  return {customers: nextCustomers}
}

function handleSearchResults (action) {
  const newCustomers = action.data

  if (!isEmpty(newCustomers)) {
    return {customers: newCustomers}
  }
  return {customers: {}}
}

function handleCustomers (customers = {}, action) {
  switch (action.type) {
    case SearchTypes.CLEAR_CUSTOMER_SEARCH_RESULTS:
      return {
        customers: {}
      }
    case CustomerTypes.RECEIVED_CUSTOMER:
      return handleReceivedCustomer(customers, action)
    case CustomerTypes.RECEIVED_CUSTOMERS:
      return handleReceivedCustomers(customers, action)
    case CustomerTypes.DELETED_CUSTOMERS:
      return deleteCustomers(customers, action)
    case CustomerTypes.DELETED_CUSTOMER:
      return deleteCustomer(customers, action)
    case SearchTypes.RECEIVED_SEARCH_CUSTOMERS:
      return handleSearchResults(action)
    case UserTypes.SIGN_OUT_SUCCESS:
      return {
        customers: {}
      }
    default:
      return {
        customers
      }
  }
}

export default function (state = {}, action) {
  const {customers} = handleCustomers(state.customers, action)

  const nextState = {
    customers
  }

  if (state.customers === nextState.customers) {
    return state
  }

  return nextState
}
