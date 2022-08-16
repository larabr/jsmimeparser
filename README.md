This is a fork of [mozilla-comm/jsmime](https://github.com/mozilla-comm/jsmime) that has been updated to include the changes made in [mozilla/releases-comm-central](https://github.com/mozilla/releases-comm-central/tree/master/mailnews/mime/jsmime) (incl. UTF-7 support).
Further, the library now uses ES6 modules.  


Code Layout
===========

JSMime is a MIME parsing and composition library that is written completely in
JavaScript using ES6 functionality and WebAPIs (where such APIs exist). There
are a few features for which a standardized WebAPI does not exist; for these,
external JavaScript libraries are used.

The MIME parser consists of three logical phases of translation:

1. Build the MIME (and pseudo-MIME) tree.
2. Convert the MIME tree into a list of body parts and attachments.
3. Use the result to drive a displayed version of the message.

The first stage is located in `mimeparser.js`. The latter stages have yet to be
implemented.

Dependencies
============

This code depends on the following ES6 features and Web APIs:
* ES6 imports
* ES6 generators
* ES6 Map and Set
* ES6 @@iterator support (especially for Map and Set)
* ES6 let
* ES6 let-destructuring
* ES6 const
* Typed arrays (predominantly Uint8Array)
* btoa, atob (found on global Windows or WorkerScopes)
* TextDecoder
