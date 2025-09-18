// JavaScript Document

function Cloud( parent, x, y, scale, albedo ) {
	this.x = x;
	this.y = y;
	this.scale = scale;
	this.albedo = albedo;
	
	this.dims = {
		width: Math.round(1100*scale)
	}
	this.dims.height = Math.round(this.dims.width*0.2*scale);
	
	
	this.cloud = parent.g();
	this.addTo( parent );
	
	
	/* Image loading and animations */
	var _this = this,
		cloudImgUrl = Config.assets+'cloud/cloud.svg';
		
	var img = new Image();
	img.src = cloudImgUrl;
	
	
	// Once the image has loaded, set the albedo.  Need to do after load else there is a jump in position
	img.onload = function() {
		// Insert the cloud initially small enough to fit into a small container (fixes rendering bug on webkit)
		_this.cloud.image(cloudImgUrl, 0, 0, 70, 5)
		_this.setAlbedo( _this.albedo );
		
		// Scale back up and move cloud to correct size and position
		var t = new Snap.Matrix() 
		t.translate(_this.getX(), _this.getY()); 
		t.scale(14);
		_this.cloud.transform(t);
		
		
		// Animate the appearence of the cloud so it pops into existence
		_this.cloud.attr({ opacity: 0.1 });
		_this.cloud.animate({ opacity: _this.albedo }, 500, mina.linear);
		
		if( Config.animations ) {
			moveCloud();
		}
	}

	

	function moveCloud() {
		var cloudSpeed = Math.round(Math.random()*40000) + 5000;
		
		// Stagger cloud's initial position
		_this.cloudStartPoint = (_this.cloudStartPoint) ? 0-(_this.dims.width) : _this.getX();
		Snap.animate(_this.cloudStartPoint, 1050, function (val) {
			_this.moveTo( val, _this.getY());
		},
		cloudSpeed,
		moveCloud); 
	}
	
}

/**
 * Set the albedo value - a value from 0.4 to 1
 */
Cloud.prototype.setAlbedo = function( albedo ) {
	this.albedo = albedo;
	
	var brightness = null,
		opacity = null;
	
	if( albedo == 0 ) {
		brightness = 1;
		opacity = 0.05;
	}
	else if(albedo > 0 && albedo <= 0.1) {
		brightness = 1;
		opacity = 0.1;
	}
	else if(albedo > 0.1 && albedo <= 0.2) {
		brightness = 1.1;
		opacity = 0.2;
	}
	else if(albedo > 0.2 && albedo <= 0.3) {
		brightness = 1.2;
		opacity = 0.3;
	}
	else if(albedo > 0.3 && albedo <= 0.4) {
		brightness = 1.3;
		opacity = 0.4;
	}
	else if(albedo > 0.4 && albedo <= 0.5) {
		brightness = 1.4;
		opacity = 0.5;
	}
	else if(albedo > 0.5 && albedo <= 0.6) {
		brightness = 1.5;
		opacity = 0.6;
	}
	else if(albedo > 0.6 && albedo <= 0.7) {
		brightness = 1.6;
		opacity = 0.7;
	}
	else if(albedo > 0.7 && albedo <= 0.8) {
		brightness = 1.7;
		opacity = 0.8;
	}
	else if(albedo > 0.8 && albedo <= 0.9) {
		brightness = 1.8;
		opacity = 0.9;
	}
	else {
		brightness = 1.8;
		opacity = 1;
	}
	
	this.cloud.attr({
		filter: paper.filter(Snap.filter.brightness(brightness)), 
		opacity: opacity
	});
}

Cloud.prototype.moveTo = function( x, y ) {
	this.x = x;
	this.y = y;
	
	// Groups can only be moved by applying a transform action
	var t = new Snap.Matrix() 
	t.translate(x, y);
	t.scale(14); // Note we need to keep transform properties the same as when set up
	this.cloud.transform(t);
}

Cloud.prototype.addTo = function( parent ) {
	parent.add( this.cloud );
}
Cloud.prototype.destroy = function() {
	//return this.cloud.remove();
	
	var _this = this;
	// Stop all CO2 animations then fade and remove
	this.cloud.stop();
	this.cloud.animate({ opacity: 0 }, 1000, mina.backout,
	function() {
		_this.cloud.remove();
	});
}
Cloud.prototype.getX = function() {
	return this.x;
}
Cloud.prototype.getY = function() {
	return this.y;
}
Cloud.prototype.toString = function() {
	return "Cloud: x=" + this.getX() + ", y=" + this.getY();
}