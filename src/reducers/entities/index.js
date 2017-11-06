/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { combineReducers } from 'redux'

import user from './user'
import app from './app'
import search from './search'
import customers from './customers'

export default combineReducers({
  user,
  app,
  search,
  customers
})
