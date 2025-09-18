// JavaScript Document

function Cow( parent, x, y, scale ) {
	
	this.cowIsFrozen = false;

	this.parent = parent;
	this.x = x;
	this.y = y;
	this.scale = scale;
	this.headOffset = scale*30;
	this.burpFrequencyFrom = 4000;
	this.burpFrequencyTo = 10000;
	
	this.dims = {
		width: Math.round(125*scale + 25)
	}
	this.dims.height = Math.round(this.dims.width*0.729)
	
	// Create the group container for the Cow elements
	this.cow = this.parent.g();
	
	// Cache the SVG image components of the Cow
	var _this = this;

	var imgURLs = [
		Config.assets+'cow/cow_body.svg',
		Config.assets+'cow/cow_jaw.svg',
		Config.assets+'cow/cow_head_jawless.svg',
		Config.assets+'cow/cow_head_jawless_startled.svg',
		Config.assets+'burp/burp_cloud.svg'
		
	];
	imageCache.pushArray("cow", imgURLs, null,
	function(e) {
		_this.createCow( _this.parent, _this.x, _this.y, _this.scale );
	});
}

Cow.prototype.createCow = function( parent, x, y, scale ) {

	this.cowBody = this.cow.image(Config.assets+'cow/cow_body.svg', 0, 0, this.dims.width, this.dims.height);
	this.cowHead = this.cow.g();
	this.cowJaw = this.cowHead.image(Config.assets+'cow/cow_jaw.svg', 0, this.headOffset, this.dims.width, this.dims.height);
	this.cowFace = this.cowHead.image(Config.assets+'cow/cow_head_jawless.svg', 0, this.headOffset, this.dims.width, this.dims.height);
	this.burpCloud = this.cow.image(Config.assets+'burp/burp_cloud.svg',
					 this.dims.width*0.8, 
					 this.dims.height*0.7, 
					 this.dims.width*1.2, 
					 this.dims.height*1.2)
					 .attr({ opacity: 0});
	
	
	var scaleTransform = new Snap.Matrix(); 
	scaleTransform.scale(0.1); 
	this.cowBody.transform(scaleTransform);
	this.cowJaw.transform(scaleTransform);
	this.cowFace.transform(scaleTransform);
	
	scaleTransform.scale(1); 
	this.cowBody.animate({ transform: scaleTransform }, 500, mina.backout);
	this.cowJaw.animate({ transform: scaleTransform }, 500, mina.backout);
	this.cowFace.animate({ transform: scaleTransform }, 500, mina.backout);
		
	/* Animations */
	var _this = this;
	
	if( Config.animations ) {
		chewingTheCudLoop();
	}
	
	function chewingTheCudLoop() {
		var jawSpeed = Math.round(1000*Math.random() + 500);
		_this.cowJaw.animate({ 
			x: Math.round(scale*8*Math.random() + 5), 
			y: _this.headOffset + Math.round(scale*4*Math.random() + -1)
		}, jawSpeed, 
		null, 
		chewingTheCudLoop);
	}
	
	this.addTo( parent );
	this.moveTo(x, y);
	
	//this.setFrozen( true );
	this.startAutoBurper();
}

Cow.prototype.setFrozen = function( isFrozen ) {
	this.cowIsFrozen = isFrozen;
	if( this.isFrozen() ) {
		this.cow.attr({
			filter : this.parent.filter(Snap.filter.grayscale(1))
		});
	}
	else {
		this.startAutoBurper();
	}
}
Cow.prototype.isFrozen = function() {
	return this.cowIsFrozen;
}
Cow.prototype.startAutoBurper = function() {
	var variance = this.burpFrequencyTo - this.burpFrequencyFrom;
	this.randomFrequency = Math.round((variance*Math.random()) + this.burpFrequencyFrom);
	this.burp();
}

Cow.prototype.burp = function() {
	if( this.isFrozen() ) {
		// Do not animate burping
		return;
	}
	var _this = this;
	var startled = function() { _this.setStartled( true ); }
	var burping = function() { _this.expellCH4(); }
	var headLowered = function() { _this.lowerHead(500); }
	var destartled = function() { _this.setStartled( false ); }
	var doBurp = function() { _this.burp(); }

	this.raiseHead(500);
	setTimeout(startled, 500);
	setTimeout(burping, 1000);
	setTimeout(headLowered, 2500);
	setTimeout(destartled, 2500);
	// Total time 2500 ms
	
	// Loop the animation
	setTimeout( doBurp, this.randomFrequency );
}


Cow.prototype.raiseHead = function( duration ) {

	this.cowHead.animate({
        transform: "t0,-" + this.headOffset,    
    	}, 
		duration, mina.easeout
	);
	
	this.headRaised = true;
}

Cow.prototype.lowerHead = function( duration ) {

	this.cowHead.animate({
		transform: "t0,0",
		}, 
		duration, mina.easein
	);
	
	this.headRaised = false;
}

Cow.prototype.isStartled = function() {
	return this.isStartled;
}
Cow.prototype.setStartled = function( isStartled ) {
	this.isStartled = isStartled;
	
	if( isStartled ) {
		this.cowFace.remove();
			this.cowFace = this.cowHead.image(Config.assets+'cow/cow_head_jawless_startled.svg', 
			0, this.headOffset, 
			this.dims.width, this.dims.height);
	}
	else {
		this.cowFace.remove();
		this.cowFace = this.cowHead.image(Config.assets+'cow/cow_head_jawless.svg', 
			0, this.headOffset, 
			this.dims.width, this.dims.height);
	}
}

Cow.prototype.expellCH4 = function( duration ) {
	var _this = this;
	
	// Set initial burp cloud state
	var t = new Snap.Matrix();
	t.translate(0, 0); 
	_this.burpCloud.transform(t);
	this.burpCloud.attr({
		opacity: 0.9
	});
			
	// Set the position to move it to and animate
	var x = this.dims.width*0.2,
		y = this.dims.height*1.5;
	
	this.burpCloud.animate({
			transform: "t"+x+",-" + y,
		}, 
		2300, mina.easein,
		function() {
			_this.burpCloud.animate({
				opacity: 0
			}, 
			200);
		}
	);
}


Cow.prototype.moveTo = function( x, y ) {
	this.x = x;
	this.y = y;
	
	// Groups can only be moved by applying a transform action
	var t = new Snap.Matrix() 
	t.translate(x, y); 
	this.cow.transform(t);
}

/**
 * Adds this Cow to the given parent
 */
Cow.prototype.addTo = function( parent ) {
	parent.add( this.cow );
}

/**
 * Simply detaches the Cow from the DOM/parent
 */
Cow.prototype.remove = function() {
	return this.cow.remove();
}

Cow.prototype.destroy = function() {
	// Stop all animations then remove
	this.cowHead.stop();
	this.cowJaw.stop();
	this.burpCloud.stop();
	this.cow.remove();
}


Cow.prototype.getX = function() {
	return this.x;
}
Cow.prototype.getY = function() {
	return this.y;
}
Cow.prototype.toString = function() {
	return "Cow: x=" + this.getX() + ", y=" + this.getY();
}