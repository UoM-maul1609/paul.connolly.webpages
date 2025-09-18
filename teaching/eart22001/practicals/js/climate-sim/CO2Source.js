// JavaScript Document
CO2Source.powerStation = 0;
CO2Source.factory = 1;
function CO2Source( parent, type, x, y, width, height ) {
	this.parent = parent;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.setCO2OutputRate( 5000 );
	
	this.building = this.parent.g();
	switch( type ) {
		case( CO2Source.powerStation ):
			this.building.image(Config.assets+'buildings/power-station.svg', 0, 0, width, height);
			
			this.co2Cloud = this.building.image(Config.assets+'co2/co2_cloud.svg',
							 this.width*0.35, 
							 -this.height*0.3, 
							 this.width*0.5, 
							 this.width*0.5);
			// Set the position to move the CO2 cloud to
			this.puffToX = this.width*0.1,
			this.puffToY = this.height*0.5;
							 
			break;
		case( CO2Source.factory ):
			this.building.image(Config.assets+'buildings/factory.svg', 0, 0, width, height);
			this.co2Cloud = this.building.image(Config.assets+'co2/co2_cloud.svg',
							 this.width*0.6, 
							 -this.height*0.35, 
							 this.width*0.4, 
							 this.width*0.4);
			// Set the position to move the CO2 cloud to
			this.puffToX = this.width*0.1,
			this.puffToY = this.height*1;
			break;
	}
	this.co2Cloud.attr({ opacity: 0});
	
	this.moveTo( this.x, this.y );
	
	// Animate the appearence of the building so it pops into existence
	this.building.attr({ opacity: 0.1 });
	this.building.animate({ opacity: 1 }, 500, mina.linear);

	this.puffCO2();
}

CO2Source.prototype.setCO2OutputRate = function( frequency ) {
	this.CO2frequency = frequency + Math.round(1000*Math.random());
}

CO2Source.prototype.puffCO2 = function() {
	var _this = this;
	
	var puffing = function() { _this.animateCO2Puff(); }
	setTimeout(puffing, this.CO2frequency);
	
	var doPuffOfCO2 = function() { _this.puffCO2(); }

	// Loop the animation
	setTimeout( doPuffOfCO2, this.CO2frequency + (Math.round(500*Math.random()) + 250 ) );
}

CO2Source.prototype.animateCO2Puff = function() {
	var _this = this;
	
	// Set initial burp cloud state
	var t = new Snap.Matrix();
	t.translate(0, 0); 
	this.co2Cloud.transform(t);
	this.co2Cloud.attr({
		opacity: 1
	});

	this.co2Cloud.animate({
			transform: "t"+this.puffToX+",-" + this.puffToY,
			opacity: 0.5
		}, 
		_this.CO2frequency, mina.easein,
		function() {
			_this.co2Cloud.animate({
				opacity: 0
			}, 
			200);
		}
	);
}

CO2Source.prototype.destroy = function() {
	var _this = this;
	// Stop all CO2 animations then fade and remove
	this.co2Cloud.stop();
	this.building.animate({ opacity: 0 }, 500, mina.linear,
	function() {
		_this.building.remove();
	});
}

CO2Source.prototype.moveTo = function( x, y ) {
	this.x = x;
	this.y = y;
	
	// Groups can only be moved by applying a transform action
	var t = new Snap.Matrix() 
	t.translate(x, y); 
	this.building.transform(t);
}
CO2Source.prototype.getX = function() {
	return this.x;
}
CO2Source.prototype.getY = function() {
	return this.y;
}
CO2Source.prototype.toString = function() {
	return "PowerStation: x=" + this.getX() + ", y=" + this.getY();
}