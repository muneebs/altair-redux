/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { all, fork, takeLatest } from 'redux-saga/effects'
import { UserTypes } from 'action_types'
import * as Tasks from 'sagas/user/tasks'

const loginRequestWatcher = function * loginRequestWatcher () {
  yield takeLatest(UserTypes.LOGIN_REQUEST, Tasks.login)
}

const confirmationRequestWatcher = function * confirmationRequestWatcher () {
  yield takeLatest(UserTypes.CONFIRMATION_REQUEST, Tasks.confirm)
}

const signOutRequestWatcher = function * signOutRequestWatcher () {
  yield takeLatest(UserTypes.SIGN_OUT_REQUEST, Tasks.signOut)
}

const sessionTokenRequestWatcher = function * sessionTokenRequestWatcher () {
  yield takeLatest(UserTypes.SESSION_TOKEN_REQUEST, Tasks.subscribeToAuthChange)
}

const root = function * root () {
  yield (all([
    fork(loginRequestWatcher),
    fork(confirmationRequestWatcher),
    fork(signOutRequestWatcher),
    fork(sessionTokenRequestWatcher)
  ]))
}

export default root
