/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { SearchTypes } from 'action_types'
import algoliasearch from 'algoliasearch'
import request from 'superagent'
import Config from 'Config'

export function searchCustomersRequest (query: string) {
  return {
    type: SearchTypes.SEARCH_CUSTOMERS_REQUEST,
    query
  }
}

export function searchCustomersSuccess () {
  return {
    type: SearchTypes.SEARCH_CUSTOMERS_SUCCESS
  }
}

export function searchCustomersFailure (error: Error) {
  return {
    type: SearchTypes.SEARCH_CUSTOMERS_FAILURE,
    error
  }
}

/**
 * Perform search on Algolia.
 *
 * @param {string} query - the search query
 * @returns {Promise<Array<Object>>} search results
 */
export function search (query: string) {
  const client = algoliasearch(Config.config.algolia.appId, Config.config.algolia.searchKey)
  const index = client.initIndex('customers')

  return index.search(query)
}

export function generateSearchKey () {
  const {getFirebase} = require('react-redux-firebase')
  const firebase = getFirebase()
  return firebase.auth().currentUser.getIdToken(true).then(token => {
    return request.get(`https://us-central1-${Config.config.firebase.projectId}.cloudfunctions.net/getSearchKey/`)
      .set('Authorization', `Bearer ${token}`)
  }).then(response => {
    return response.body
  }).then(data => {
    return data.key
  })
}

export function clearSearchResults () {
  return {
    type: SearchTypes.CLEAR_CUSTOMER_SEARCH_RESULTS
  }
}
