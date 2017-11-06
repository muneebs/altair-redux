/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { AppTypes } from 'action_types'

export function appInitStarted () {
  return {
    type: AppTypes.APP_INIT_STARTED
  }
}

export function appInitFinished () {
  return {
    type: AppTypes.APP_INIT_FINISHED
  }
}
