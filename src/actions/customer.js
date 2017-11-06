/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { CustomerTypes } from 'action_types'
import type { Customer } from '../../index'
import type { Action } from 'redux'

/**
 * Create a new customer.
 *
 * @param {Customer} customer - the customer object
 * @returns {{type: string, customer: Customer}}
 */
export function createCustomerRequest (customer: Customer): Action & { customer: Customer } {
  return {
    type: CustomerTypes.CREATE_CUSTOMER_REQUEST,
    customer
  }
}

export function createCustomerSuccess (): Action {
  return {
    type: CustomerTypes.CREATE_CUSTOMER_SUCCESS
  }
}

export function createCustomerFailure (error: Error): Action & { error: Error } {
  return {
    type: CustomerTypes.CREATE_CUSTOMER_FAILURE,
    error
  }
}

export function createCustomer (customer: Customer): Promise<Customer, Error> {
  const {getFirebase} = require('react-redux-firebase')
  const firebase = getFirebase()
  const user = firebase.auth().currentUser
  return firebase.firestore().collection('customers').add({
    ...customer,
    createdBy: user.uid
  })
}

export function deleteCustomerRequest (customerId: string): Action & { customerId: string } {
  return {
    type: CustomerTypes.DELETE_CUSTOMER_REQUEST,
    customerId
  }
}

export function deleteCustomerSuccess (): Action {
  return {
    type: CustomerTypes.DELETE_CUSTOMER_SUCCESS
  }
}

export function deleteCustomerFailure (error: Error): Action & { error: Error } {
  return {
    type: CustomerTypes.DELETE_CUSTOMER_FAILURE,
    error
  }
}

export function deleteCustomer (customerId: string): Promise<void> {
  const {getFirebase} = require('react-redux-firebase')
  const firebase = getFirebase()
  return firebase.firestore().collection('customers').doc(`${customerId}`).delete()
}

export function customersRequest (): Action {
  return {
    type: CustomerTypes.CUSTOMERS_REQUEST
  }
}

export function customersSuccess (): Action {
  return {
    type: CustomerTypes.CUSTOMERS_SUCCESS
  }
}

export function customersFailure (error: Error): Action {
  return {
    type: CustomerTypes.CUSTOMERS_FAILURE,
    error
  }
}

export function customers () {
  const {getFirebase} = require('react-redux-firebase')
  const firebase = getFirebase()
  const user = firebase.auth().currentUser
  return firebase.firestore().collection('customers').where('createdBy', '==', user.uid)
}

export async function getCustomerById (id: string) {
  const {getFirebase} = require('react-redux-firebase')
  const firebase = getFirebase()
  const doc = await firebase.firestore().collection('customers').doc(id).get()
  return doc.data()
}
