![logo](./assets/logo.png)
# Altair Redux

The project purpose is to demonstrate how redux can be used to consolidate an apps storage, utilities and logic between mobile clients (react-native) and web clients (react).

[Redux](http://redux.js.org/docs/introduction/) is the backbone for this project and many of the design decisions and patterns stem from it.

Altair is a simple customer management application I built as a coding test for [Redblade Software](http://www.redblade.io).

# Requirements
- [Firebase](https://firebase.google.com) - a realtime database for web/mobile applications created by Google Inc.
- [Algolia Search](https://algolia.com) - used to index our firebase data store and to provide fulltext search.
- [NodeJS](https://www.nodejs.org) (8.7.0)



# Usage
### Web usage
To hook up an application to the altair-redux store:

```
import { configureStore } from 'altair-redux';
```
```
import localForage from 'localforage';
```

Acquire your firebase web config from the [firebase console](https://console.firebase.google.com).

```
// firebase configuration
const config = {
	apiKey: '',
	authDomain: '',
	databaseURL: '',
	projectId: '',
	storageBucket: '',
	messagingSenderId: ''
}
```

```
const store = configureStore(
  localForage,
  config,
  {
    userProfile: 'users',
    useFirestoreForProfile: true
  },
  {
    appId: 'ALGOLIA_APP_ID'
  }
);
```

### React native usage

```
import { AsyncStorage } from 'react-native';
```
```
import { configureStore } from 'altair-redux';
```
```
const store = configureStore(AsyncStorage, {}, {
	enableRedirectHandling : false,
	userProfile : 'users',
	useFirestoreForProfile : true
}, { appId: 'ALGOLIA_APP_ID' });
```
