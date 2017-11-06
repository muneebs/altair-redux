/*
 * @flow
 *
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { UserTypes } from 'action_types'
import firebase from 'firebase'
import type { Action } from 'redux'

/**
 * Perform login with firebase phone auth.
 *
 * @public
 * @param {string} phoneNumber - phone number in international format, i.e +27821234567
 * @param {firebase.auth.RecaptchaVerifier} recaptureResult - recapture verification token
 * @returns {{type: string, phoneNumber: string, recaptureResult: string}}
 */
export function loginRequest (phoneNumber: string, recaptureResult: firebase.auth.RecaptchaVerifier): Action &
  { phoneNumber: string, recaptureResult: string } {
  return {
    type: UserTypes.LOGIN_REQUEST,
    phoneNumber,
    recaptureResult
  }
}

/**
 * Login successful, update the redux state.
 *
 * @param {string} verificationId - the firebase.auth.ConfirmationResult.verificationId
 * @returns {{type: string, payload: firebase.auth.ConfirmationResult}}
 */
export function loginSuccess (verificationId: string): Action {
  return {
    type: UserTypes.LOGIN_SUCCESS,
    payload: verificationId
  }
}

/**
 * Login failure, update the redux state.
 *
 * @param {Error} error - reason for failure.
 * @returns {{type: string, error: Error}}
 */
export function loginFailure (error): Action & { error: Error } {
  return {
    type: UserTypes.LOGIN_FAILURE,
    error
  }
}

/**
 * Called by the redux saga to perform the login, this does not modify the redux state.
 *
 * @private - should only be called from the user saga, the client side should never invoke this function.
 * @param {string} phoneNumber - phone number in international format, i.e +27821234567
 * @param {firebase.auth.RecaptchaVerifier} recaptureResult - recapture verification token
 * @returns {firebase.Promise.<firebase.auth.ConfirmationResult>}
 */
export function login (phoneNumber: string, recaptureResult: firebase.auth.RecaptchaVerifier): Promise<firebase.auth.ConfirmationResult> {
  const {getFirebase} = require('react-redux-firebase')
  const firebase = getFirebase()
  return firebase.auth().signInWithPhoneNumber(phoneNumber, recaptureResult)
}

export function confirmationRequest (code: string): Action & {
  confirmationResult: Function, code: string
} {
  return {
    type: UserTypes.CONFIRMATION_REQUEST,
    code
  }
}

export function confirmationSuccess (): Action {
  return {
    type: UserTypes.CONFIRMATION_SUCCESS
  }
}

export function confirmationFailure (error: Error): Action & { error: Error } {
  return {
    type: UserTypes.CONFIRMATION_FAILURE,
    error
  }
}

export function confirm (verificationId: string, code: string): Promise<firebase.auth.UserCredential> {
  const {getFirebase} = require('react-redux-firebase')
  const firebase = getFirebase()
  const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code)
  return firebase.auth().signInWithCredential(credential)
}

/**
 * Perform signOut
 *
 * @returns {{type: string}}
 */
export function signOutRequest (): Action {
  return {
    type: UserTypes.SIGN_OUT_REQUEST
  }
}

/**
 * SignOut success - modify the redux state.
 *
 * @returns {{type: string}}
 */
export function signOutSuccess (): Action {
  return {
    type: UserTypes.SIGN_OUT_SUCCESS
  }
}

/**
 * SignOut failure - modify the redux state.
 *
 * @param {Error} error - reason for failure.
 * @returns {{type: string, error: Error}}
 */
export function signOutFailure (error: Error): Action & { error: Error } {
  return {
    type: UserTypes.SIGN_OUT_FAILURE,
    error
  }
}

/**
 * Called by the redux saga to perform the signOut request, this does not modify the redux state.
 *
 * @private
 * @returns {firebase.Promise.<void>}
 */
export function signOut (): Promise<void> {
  const {getFirebase} = require('react-redux-firebase')
  const firebase = getFirebase()
  return firebase.auth().signOut()
}

// export function getSessionToken (): Promise<User, Error> {
//   return (dispatch) => {
//     const {getFirebase} = require('react-redux-firebase')
//     const firebase = getFirebase()
//     return new Promise((resolve, reject) => {
//       firebase.auth().onAuthStateChanged(async (user) => {
//         if (user) {
//           const profile = await firebase.firestore().collection('users').doc(user.uid).get()
//           dispatch({
//             type: UserTypes.SESSION_TOKEN_SUCCESS,
//             payload: {
//               ...user,
//               ...profile
//             }
//           })
//           dispatch({
//             type: UserTypes.RECEIVED_ME,
//             payload: {
//               ...user,
//               ...profile
//             }
//           })
//           return resolve({
//             ...user,
//             ...profile
//           })
//         }
//         dispatch({
//           type: UserTypes.SESSION_TOKEN_FAILURE,
//           payload: null
//         })
//         return reject(new Error('Authentication required'))
//       })
//     })
//   }
// }

export function getSessionTokenRequest (): Action {
  return {
    type: UserTypes.SESSION_TOKEN_REQUEST
  }
}

export function getSessionTokenSuccess (): Action {
  return {
    type: UserTypes.SESSION_TOKEN_SUCCESS
  }
}

export function getSessionTokenFailure (error: Error): Action & { error: Error } {
  return {
    type: UserTypes.SESSION_TOKEN_FAILURE,
    error
  }
}
