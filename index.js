(function() {
	/* createHTMLDocument polyfill */

	var impl = document.implementation;
	if (!impl) throw new Error("document.implementation is missing");
	var proto = impl.__proto__ || DOMImplementation && DOMImplementation.prototype;
	if (!proto) return; // use native
	if (impl.createHTMLDocument && impl.createHTMLDocument.maxRetry) return;

	// just always use our polyfill
	var mother = document.cloneNode(false);
	var html = mother.createElement('html');
	mother.appendChild(html);
	html.appendChild(mother.createElement('head'));
	html.appendChild(mother.createElement('body'));

	function createHTMLDocument(str) {
		var copy, tries = 0;
		while (!copy && tries < impl.createHTMLDocument.maxRetry) {
			try {
				copy = mother.cloneNode(true);
			} catch(ex) {
			}
			tries++;
		}
		if (!copy) throw new Error("createHTMLDocument failed\ntry increasing document.implementation.createHTMLDocument.maxRetry");
		if (str != null) copy.title = str;
		return copy;
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
