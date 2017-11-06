/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { all, spawn } from 'redux-saga/effects'
import UserSagas from './user'
import CustomerSagas from './customer'
import SearchSagas from './search'

const root = function * root () {
  return yield (
    all([
      spawn(UserSagas),
      spawn(CustomerSagas),
      spawn(SearchSagas)
    ])
  )
}

export default root
