/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import { AppTypes } from 'action_types'
import type { Action } from 'redux'

export default function initialized (state = false, action: Action): boolean {
  switch (action.type) {
    case AppTypes.APP_INIT_STARTED:
      return { initialized: false }

    case AppTypes.APP_INIT_FINISHED:
      return { initialized: true }

    default:
      return state
  }
}
