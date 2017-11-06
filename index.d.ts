/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

import * as firebase from "firebase";
import {Action, Reducer, Store} from "redux";

export type GeoPoint = {
  latitude: number;
  longitude: number;
}

export type Address = {
  address: string;
  location?: GeoPoint;
  postalCode?: string;
  city?: string;
  province?: string;
  country?: string;
}

export type Customer = {
  firstName: string;
  lastName: string;
  idNumber: string;
  address: Address;
}

export interface UserActions {
  loginRequest(phoneNumber: string, recaptureResult: string): Action & {
    phoneNumber: string,
    recaptureResult: string
  };

  confirmationRequest (confirmationResult: firebase.auth.ConfirmationResult, code: string): Action & {
    confirmationResult: firebase.auth.ConfirmationResult,
    code: string
  };

  signOutRequest(): Action;

  getSessionTokenRequest(): Action;
}

export interface AppActions {
  appInitStarted();

  appInitFinished();
}

export interface CustomerActions {
  createCustomerRequest(customer: Customer): Action & {
    customer: Customer
  };

  deleteCustomerRequest(customerId: string): Action & {
    customerId: string
  };

  customersRequest(): Action;
}

export interface SearchActions {
  searchCustomersRequest(query: string): Action & {
    query: string
  };
}

export function configureStore(storage: Object, firebaseConfig: Object, rrfConfig: Object, appReducer?: Reducer): Store;

export namespace sagaMiddleware {
  export function run(...sagas);
}

export namespace sagas {
  const prototype = {};
}
