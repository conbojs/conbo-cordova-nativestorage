# NativeStorage classes for hybrid apps using ConboJS

This library contains persistent storage classes for hybrid ConboJS apps using
`cordova-plugin-nativestorage`, as an alternative to ConboJS's built-in 
`LocalStorage` related classes.

* `NativeHash` is a direct replacement for `LocalHash`; and
* `NativeList` is a direct replacement for `LocalList`

Any data currently saved to `LocalStorage` by a `LocalHash` or `LocalList` will
automatically be migrated to `NativeStorage` on first use, assuming you use the
same `name` option.

## Installation

```
cordova plugin add cordova-plugin-nativestorage
npm i conbo-cordova-nativestorage
```

## Usage

See documentation for `LocalStorage` related classes at https://conbo.mesmotronic.com/
