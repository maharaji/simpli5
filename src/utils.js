
function forEach(iterable, func) {
	Array.prototype.forEach.call(iterable, func);
}

function toArray(iterable) {
	if (iterable instanceof Array) return iterable;
	var arr = Array.prototype.slice.call(iterable);
	if (!arr.length && iterable != null && !('length' in iterable)) return [iterable];
	return arr;
}

function extend(obj, extension, excludeInherited) {
	if (arguments.length == 1) {
		obj = this;
		extension = obj;
	}
	for (var i in extension) {
		if (excludeInherited && !extension.hasOwnProperty(i)) continue;
		
		var getter = extension.__lookupGetter__(i), setter = extension.__lookupSetter__(i);
		if (getter || setter) {
			if (getter) obj.__defineGetter__(i, getter);
			if (setter) obj.__defineSetter__(i, setter);
		} else {
			obj[i] = extension[i];
		}
	}
}

var toFragment = (function() {
	var div = document.createElement('div');
	
	function toFragment(html) {
		var frag = document.createDocumentFragment();
		
		if (html instanceof Node) {
			frag.appendChild(html);
		} else if (typeof html == 'string') {
			div.innerHTML = html;
			while (div.firstChild) {
				frag.appendChild(div.firstChild);
			}
		} else if (html instanceof Array || html instanceof NodeList) {
			for (var i = 0, l = html.length; i < l; i++) {
				frag.appendChild(html[i]);
			}
		}
		return frag;
	}
	
	return toFragment;
})();


function toElement(html) {
	return this.fragment(html).firstChild;
}