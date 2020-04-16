# NativeStorage classes for hybrid apps using ConboJS

This library contains persistent storage classes for hybrid ConboJS apps using
`cordova-plugin-nativestorage`, as an alternative to ConboJS's built-in 
`LocalStorage` related classes.

* `NativeHash` is a direct replacement for `LocalHash`; and
* `NativeList` is a direct replacement for `LocalList`

Any data currently saved to `LocalStorage` by a `LocalHash` or `LocalList` with 
the same name will automatically be migrated to `NativeStorage` on first use.

## Installation

```cmd
cordova plugin add cordova-plugin-nativestorage
npm i conbo-cordova-nativestorage
```

## Usage

Use of the classes in this library is almost identical to ConboJS's built-in
`LocalStorage` related classes, see https://conbo.mesmotronic.com/, although
you should wait until the `'ready'` event has fired (usually just a few
milliseconds  after Cordova's `'deviceready'` event) before interacting with
instances of classes in this library, for example:

```js
let list = new NativeList({name:'myList'});
list.addEventListener('ready', () => console.log('Your native list is ready to go!'));
```
