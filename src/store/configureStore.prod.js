/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createActionBuffer from 'redux-action-buffer'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { autoRehydrate, persistStore } from 'redux-persist'
import { REHYDRATE } from 'redux-persist/constants'
import serviceReducer from '../reducers'
import firebase from 'firebase'
import 'firebase/firestore'
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'
import { AppActions } from 'actions'
import Config from 'Config'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware({
  onError: (error) => {
// eslint-disable-next-line no-console
    console.log('saga error', error)
  }
})

// eslint-disable-next-line immutable/no-let
let middleware = [
  thunk,
  thunk.withExtraArgument(getFirebase),
  sagaMiddleware,
  createActionBuffer(REHYDRATE)
]

function createReducer (...reducers) {
  return combineReducers(Object.assign({}, ...reducers))
}

/**
 * ## configureStore
 * @param {Object} storage - redux-persist storage
 * @param {Object} firebaseConfig - firebase configuration
 * @param {Object} rrfConfig - react-redux-firebase config
 * @param {Object} algoliaConfig - optional algolia configuration
 * @param {Object} appReducer - optional appReducer
 * @return {Object} store
 */
export function configureStore (storage, firebaseConfig, rrfConfig, algoliaConfig = {}, appReducer) {
  firebase.initializeApp(firebaseConfig)
  firebase.firestore()

  // allow the firestore to work offline
  firebase.firestore().enablePersistence()

  Config.config = {
    algolia: algoliaConfig,
    firebase: firebaseConfig
  }

  const store = createStore(createReducer(serviceReducer, appReducer),
    // eslint-disable-next-line no-undefined
    undefined,
    compose(
      reactReduxFirebase(firebase, rrfConfig),
      reduxFirestore(firebase),
      autoRehydrate({log: false}),
      applyMiddleware(...middleware)
    )
  )
  persistStore(store, {storage: storage, blacklist: ['requests']})
  store.dispatch(AppActions.appInitStarted())
  return store
}

export {
  sagaMiddleware
}
