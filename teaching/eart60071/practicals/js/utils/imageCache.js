/**
 * imageCache.js - image caching framework.
 * Zoltan Hawryluk - http://www.useragentman.com/
 * MIT License.
 */
/*
This JavaScript library is intended to make image caching as simple as possible.  The syntax is:

var s=["images/1.jpg", "images/2.jpg", "images/3.jpg"]; // or any array of image URLs
imageCache.pushArray(s, loadImageEvent, loadAllEvent);

loadImageEvent is a callback that fires everytime an image is loaded.
loadAllEvents is a callback that fires when all images are loaded.

More info can be found at http://www.useragentman.com/blog/?p=4329

Heavily modified by Stuart Anderson 17/06/2013

*/

var imageCache = new function () {
	/* Configure to be either object or indexed array
	 * Operating in array mode will return an indexed array of Images 
	 * which could be useful for rendering on a canvas.
	 */
	var cacheType = "object"; 
	
	var me = this;

	var cache = [];
	var root = document.location.href.split('/');

	root.pop();
	root = root.join('/') + '/';

	me.push = function (key, src, loadEvent) {

		if(undefined === cache[key]) {
			 // Select Object based or Array based storage
			cache[key] = (cacheType === "array") ? new Array() : [];
		}
		if (!src.match(/^http/)) {
			src = root + src;
		} 

		var item = new Image();

		
		if (cache[key][src] && loadEvent) {
			loadEvent(src);
		} else {
			if (loadEvent) {
				item.onload = loadEvent;
				item.onerror = loadEvent;
			}
			 // Add Image as either object property or Array element
			if( cacheType === "array" ) {
				cache[key].push(item);
			}
			else {
				cache[key][src]=item;
			}
		}
		item.src = src;
	}

	me.pushArray = function (key, array, imageLoadEvent, imagesLoadEvent) {
		var numLoaded = 0;
		var src = array[numLoaded];
		var arrayLength = array.length;
		for (var i=0; i<arrayLength; i++) { 
			me.push(key, array[i], function (e) {
				if (imageLoadEvent) {
					if(!e) {
						e = {};
					}
					e.src = src;
					e.val = numLoaded;
					imageLoadEvent(e);
				}
				numLoaded++;
				src = array[numLoaded];
				if (imagesLoadEvent && numLoaded == arrayLength) {
					setTimeout(function () {
						imagesLoadEvent(new Object);
					}, 1)

				}
			})
		}
		
		// In array mode, we return an indexed Array of the Image objects
		if(cacheType === "array") {
			return cache[key];
		}
	}
	
	me.clearCache = function (key) {
		if(cacheType === "array") {
			var arrayLength = cache[key].length;
			for(var i=0; i<arrayLength; i++) {
				cache[key][i] = null;
				delete cache[key][i];
			}
		}
		else {
			for(var propertyName in cache[key]) {
				cache[key][propertyName] = null;
				delete cache[key][propertyName];
			}
		}
		
		cache[key] = null;
		delete cache[key];
	}

}
