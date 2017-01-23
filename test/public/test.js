console.log("test.js");
Page.setup(function(state) {
	console.log("setup");
	var root = document;
	var newdoc, frag;
	try {
		var root = document;
		newdoc = root.implementation.createHTMLDocument("");
	} catch(ex) {
		console.error("A", ex);
		throw ex;
	}
	try {
		frag = appendFragStr(newdoc, "<link href='' />\ntoto<p>test</p>");
	} catch(ex) {
		console.error("B", ex);
		throw ex;
	}
//	document.addEventListener('click', function() {
//		state.query.clicked = true;
//		Page.replace(state);
//	});
	return new Promise(function(resolve, reject) {
		try {
			appendFragStr(frag.ownerDocument, "<link href='' />\ntoto<p>test2</p>");
		} catch(ex) {
			console.error("C", ex);
			throw ex;
		}
		resolve();
	}).then(function() {
		if (window.goterror) return;
		setTimeout(function() {
			try {
				document.location.reload();
			} catch(ex) {
				console.log("Cannot reload");
			}
		}, 200);
	});
});

Page.build(function() {
	console.log("build");
});

Page.patch(function() {
	console.log("patch");
	var frag = appendFragStr(document.implementation.createHTMLDocument("sdq"), "<link href='' />\ntoto<p>test 3</p>");
});


function appendFragStr(doc, str) {
	var frag;

	var newdoc = doc.implementation.createHTMLDocument("disconnected");
	frag = newdoc.createDocumentFragment();

	var div = frag.ownerDocument.createElement("div");
	div.innerHTML = str;

	while (div.firstChild) frag.appendChild(div.firstChild);

	document.body.appendChild(frag.ownerDocument == document ? frag : document.importNode(frag, true));

	return frag;
}
