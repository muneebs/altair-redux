/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

/* eslint-disable no-unused-vars */
process.env.NODE_ENV = 'test'

const chai = require('chai')
const sinon = require('sinon')
const chaiAsPromised = require('chai-as-promised')
const sinonChai = require('sinon-chai')
const JSDOM = require('jsdom').JSDOM
const FirebaseServer = require('firebase-server')
const Firebase = require('firebase')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const WebSocket = require('ws')
const dom = new JSDOM('<!doctype html><html><body></body></html>')

new FirebaseServer(5000, 'localhost.firebaseio.test', { // eslint-disable-line no-new
  users: {
    Iq5b0qK2NtgggT6U3bU6iZRGyma2: {
      displayName: 'Tester'
    }
  }
})

// Chai Plugins
chai.use(chaiAsPromised)
chai.use(sinonChai)

// globals
global.Firebase = Firebase
global.expect = chai.expect
global.sinon = sinon
global.chai = chai
global.window = dom.window
global.document = global.window.document
global.navigator = global.window.navigator
// needed to fix "Error: The XMLHttpRequest compatibility library was not found." from Firebase auth
global.XMLHttpRequest = XMLHttpRequest
// needed to fix: "FIREBASE WARNING: wss:// URL used, but browser isn't known to support websockets.  Trying anyway."
global.WebSocket = WebSocket

// Firebase Instance Setup (fake instance connected to firebase-server)
const fbConfig = global.fbConfig = {
  apiKey: 'asdf', // placeholder
  authDomain: 'asdf', // placeholder
  databaseURL: 'ws://127.0.1:5000',
  storageBucket: 'asdf', // placeholder
  messagingSenderId: 'asdf' // placeholder
}

// Swallow firebase reinitialize error (useful when using watch)
try {
  Firebase.initializeApp(fbConfig)
} catch (err) {}

global.firebase = Object.defineProperty(Firebase, '_', {
  value: {
    watchers: {},
    authUid: null,
    config: Object.assign(
      {},
      fbConfig,
      {
        userProfile: 'users',
        enableRedirectHandling: false // disabled due to lack of http/https
      }
    )
  },
  writable: true,
  enumerable: true,
  configurable: true
})
