# create-html-document-polyfill

createHTMLDocument polyfill, with createDocumentFragment IE fix.

## Why

- because old browsers don't have a disconnected document like the one
  provided by createHTMLDocument

- because these are very clever polyfills :)

- because some IE 11 versions are full of shit


## Usage

Simply drop the file before anything using those functions.


### BrowserStack

This project runs its tests on multiple desktop and mobile browsers using [travis BrowserStack addon](https://docs.travis-ci.com/user/browserstack/), sponsored by [BrowserStack](browserstack.com).

[![Browser Stack Logo](https://cloud.githubusercontent.com/assets/131406/22254249/534d889e-e254-11e6-8427-a759fb23b7bd.png)](https://www.browserstack.com/)


## Compatibility

No automatic tests yet, but manually tested in real-life situation on:
- IE 9/10/11
- Edge 13/14
- Firefox, Chrome, Safari
- Android (Nexus 6,9 Galaxy S5)
- iPhone, iPad (fails on iPad 2, workd on iPad 3)
- Opera (fails on 12.16)

Screenshots:
- [take 1](https://www.browserstack.com/screenshots/46a766e4ada9f5ad93a40e085769c68432601026)
