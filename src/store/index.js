/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

/* eslint-disable global-require, no-process-env, immutable/no-mutation */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod.js')
} else {
  module.exports = require('./configureStore.dev.js')
}

/* eslint-enable global-require, no-process-env, immutable/no-mutation */
