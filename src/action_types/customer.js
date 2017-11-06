/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import keyMirror from 'utils/key_mirror'

export default keyMirror({
  CREATE_CUSTOMER_REQUEST: null,
  CREATE_CUSTOMER_SUCCESS: null,
  CREATE_CUSTOMER_FAILURE: null,

  DELETE_CUSTOMER_REQUEST: null,
  DELETE_CUSTOMER_SUCCESS: null,
  DELETE_CUSTOMER_FAILURE: null,

  CUSTOMERS_REQUEST: null,
  CUSTOMERS_SUCCESS: null,
  CUSTOMERS_FAILURE: null,

  RECEIVED_CUSTOMERS: null,
  RECEIVED_CUSTOMER: null,
  DELETED_CUSTOMER: null,
  DELETED_CUSTOMERS: null
}, '@@redblade-redux/')
