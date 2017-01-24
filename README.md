# create-html-document-polyfill

createHTMLDocument polyfill, with createDocumentFragment IE fix.

## Why

- because old browsers don't have a disconnected document like the one
  provided by createHTMLDocument

- because these are very clever polyfills :)

- because some IE 11 versions are full of shit


## Usage

Simply drop the file before anything using those functions.


## Compatibility

No automatic tests yet, but manually tested in real-life situation on:
- IE 9/10/11
- Edge 13/14
- Firefox, Chrome, Safari
- Android (Nexus 6,9 Galaxy S5)
- iPhone, iPad (fails on iPad 2, workd on iPad 3)
- Opera (fails on 12.16)
- 
