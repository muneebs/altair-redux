/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { eventChannel, END } from 'redux-saga'
import { select, take, call, put } from 'redux-saga/effects'
import { UserActions } from 'actions'
import { UserTypes } from 'action_types'
import { isEmpty } from 'lodash'

function createAuthChannel () {
  return eventChannel(emit => {
    const {getFirebase} = require('react-redux-firebase')
    const firebase = getFirebase()
    const unsubscribe = firebase.auth().onAuthStateChanged({
      next: (user) => {
        if (user) {
          emit(user)
        } else {
          emit('')
        }
      },
      error: (error) => {
        emit(END)
        throw error
      }
    })

    return () => {
      unsubscribe()
    }
  })
}

export const login = function * login (args) {
  try {
    const confirmationResult = yield call(UserActions.login, args.phoneNumber, args.recaptureResult)
    yield put(UserActions.loginSuccess(confirmationResult.verificationId))
  } catch (error) {
    yield put(UserActions.loginFailure(error))
  }
}

export const confirm = function * confirm (args) {
  try {
    const state = yield select()
    const verificationId = state.entities.user.verificationId
    if (!isEmpty(verificationId)) {
      yield call(UserActions.confirm, verificationId, args.code)
      yield put(UserActions.confirmationSuccess())
    }
  } catch (error) {
    yield put(UserActions.confirmationFailure(error))
  }
}

export const signOut = function * signOut () {
  try {
    yield call(UserActions.signOut)
    yield put(UserActions.signOutSuccess())
  } catch (error) {
    yield put(UserActions.signOutFailure(error))
  }
}

export const subscribeToAuthChange = function * sessionTokenListener () {
  try {
    const authChannel = yield call(createAuthChannel)
    while (true) {
      try {
        const result = yield take(authChannel)
        if (!isEmpty(result)) {
          yield put({ type: UserTypes.RECEIVED_ME, data: result.toJSON() })
          yield put(UserActions.getSessionTokenSuccess())
        } else {
          yield put(UserActions.getSessionTokenFailure(new Error('Authentication required')))
        }
      } catch (error) {
        yield put(UserActions.getSessionTokenFailure(error))
      }
    }
  } catch (error) {
// eslint-disable-next-line no-console
    console.log('unable to create auth subscription', error)
  }
}
