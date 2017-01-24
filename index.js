(function() {
	/* createHTMLDocument polyfill */

	var impl = document.implementation;
	if (!impl) throw new Error("document.implementation is missing");
	var proto = impl.__proto__ || DOMImplementation && DOMImplementation.prototype;
	if (!proto) return; // use native
	var fun = impl.createHTMLDocument;
	if (fun && fun.maxRetry) return;

	function polyfillFun(str) {
		var doc = document.cloneNode(false);
		var html = doc.createElement('html');
		doc.appendChild(html);
		html.appendChild(doc.createElement('head'));
		html.appendChild(doc.createElement('body'));
		return doc;
	}

	function createHTMLDocument(str) {
		var doc, tries = 0;
		if (str == null) str = "";
		while (!doc && tries < impl.createHTMLDocument.maxRetry) {
			try {
				doc = fun.call(this, str);
			} catch(ex) {
			}
			tries++;
		}
		if (!doc) throw new Error("createHTMLDocument failed\ntry increasing document.implementation.createHTMLDocument.maxRetry");
		return doc;
	}

	if (!fun || document.documentMode == 11) {
		// force IE11 to use our version
		fun = polyfillFun;
	}

	createHTMLDocument.maxRetry = 10;
	proto.createHTMLDocument = createHTMLDocument;
})();



(function() {
	if (document.createDocumentFragment && document.createDocumentFragment.maxRetry) return;
	var proto = document.__proto__ || Document && Document.prototype;
	if (!proto) return;

	function createDocumentFragment() {
		var copy;
		var tries = 0;
		while (tries++ < createDocumentFragment.maxRetry) {
			try {
				copy = this.importNode(fragment, true);
			} catch(ex) {
			}
			if (copy && copy.ownerDocument.nodeType == Node.DOCUMENT_NODE) {
				break;
			}
		}
		if (!copy) throw new Error("createDocumentFragment failed\ntry increasing document.createDocumentFragment.maxRetry");
		return copy;
	}
	createDocumentFragment.maxRetry = 1000;

	var fragment = (function() {
		var tries = 0;
		var frag;
		while (tries++ < createDocumentFragment.maxRetry) {
			try {
				frag = document.createDocumentFragment();
				if (frag.ownerDocument.nodeType == Node.DOCUMENT_NODE) {
					break;
				}
			} catch(ex) {
			}
		}
		if (!frag) throw new Error("createDocumentFragment initialization failed\ntry increasing document.createDocumentFragment.maxRetry");
		return frag;
	})();

	proto.createDocumentFragment = createDocumentFragment;
})();
