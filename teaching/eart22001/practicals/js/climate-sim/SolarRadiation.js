// JavaScript Document

function SolarRadiation( parent, sunStartX, sunStartY, cloudLayerX, cloudLayerY, groundEndX, groundEndY ) {
	this.parent = parent;
	this.sunStartX = sunStartX;
	this.sunStartY = sunStartY;
	this.cloudLayerX = cloudLayerX;
	this.cloudLayerY = cloudLayerY;
	this.groundEndX = groundEndX;
	this.groundEndY = groundEndY;
	
	this.arrowStyle = { 
		"opacity" : 0.8,
		"stroke-dasharray" : "5 5",
		"stroke-dashoffset" : 0
	};
	
	
	var sourceThickness = 30,
		// Calculate the start of the next arrow so it sits just in front of first (is dependent on arrow thickness)
		theta = (cloudLayerX-sunStartX) / (cloudLayerY-sunStartY);
		
	this.groundRayStartX = sunStartX + ( theta * ( (cloudLayerY-sunStartY) + (sourceThickness*2)) ),
	this.groundRayStartY = sunStartY +  ((cloudLayerY-sunStartY) + (sourceThickness*2));
	
	
	
	// The source ray emitted from the sun
	this.sourceSunRay = this.createRay( this.sunStartX, this.sunStartY, this.cloudLayerX, this.cloudLayerY, sourceThickness );

	// Ray that gets through cloud cover and gets to ground
	this.groundSunRay = this.createRay( this.groundRayStartX, this.groundRayStartY, this.groundEndX, this.groundEndY, 15 );
	
	this.reflectedRays = [];
}



SolarRadiation.prototype.setRadiationRefraction = function( value ) {
	
	var cloudRefraction = true,
		sourceSunRayThickness = 30,
		cloudRayThickness = null,
		refractedRayThickness = null;
		
	if( value == 1 ) {
		cloudRefraction = true;
		cloudRayThickness = 0;
		refractedRayThickness = 30;
	}
	else if( value >= 0.9 && value < 1 ) {
		cloudRayThickness = 2;
		refractedRayThickness = 25;
	}
	else if( value >= 0.8 && value < 0.9 ) {
		cloudRayThickness = 4;
		refractedRayThickness = 20;
	}
	else if( value >= 0.7 && value < 0.8 ) {
		cloudRayThickness = 6;
		refractedRayThickness = 18;
	}
	else if( value >= 0.6 && value < 0.7 ) {
		cloudRayThickness = 10;
		refractedRayThickness = 16;
	}
	else if( value >= 0.5 && value < 0.6 ) {
		cloudRayThickness = 15;
		refractedRayThickness = 15;
	}
	else if( value >= 0.4 && value < 0.5 ) {
		cloudRayThickness = 18;
		refractedRayThickness = 12;
	}
	else if( value >= 0.3 && value < 0.4 ) {
		cloudRayThickness = 20;
		refractedRayThickness = 8;
	}
	else if( value >= 0.2 && value < 0.3 ) {
		cloudRayThickness = 22;
		refractedRayThickness = 6;
	}
	else if( value > 0.1 && value < 0.2 ) {
		cloudRayThickness = 22;
		refractedRayThickness = 3;
	}
	else {
		cloudRefraction = false;
	}
	
	if( cloudRefraction ) {
		// The source ray emitted from the sun
		this.sourceSunRay.setCoordinatePoints( [this.sunStartX, this.sunStartY, this.cloudLayerX, this.cloudLayerY] );
		
		// Ray that gets through cloud cover and gets to ground
		this.groundSunRay.setAttributes({ "display" : "inline" }); // show
		this.groundSunRay.setThickness( cloudRayThickness, true );
		
		
		// Create some reflected rays
		this.createReflectedRays( this.groundRayStartX, this.groundRayStartY, 200, 2, refractedRayThickness );
	}
	else {
		// The source ray emitted from the sun
		this.sourceSunRay.setCoordinatePoints( [this.sunStartX, this.sunStartY, this.groundEndX, this.groundEndY] );
		
		// Hide the ray that gets through cloud cover and gets to ground
		this.groundSunRay.setAttributes({ "display" : "none" }); // hide
		
		// Clear any reflected rays
		this.clearReflectedRays();
	}
	
}

SolarRadiation.prototype.createRay = function( x1, y1, x2, y2, thickness ) {
	var arrow = new Arrow(this.parent, x1, y1, x2, y2, thickness, '#fcea24' );
	arrow.setAttributes( this.arrowStyle );
	return arrow;
}


SolarRadiation.prototype.createReflectedRays = function( originX, originY, length, quantity, thickness ) {
	this.clearReflectedRays();
	for(var i = 0; i < quantity; i++) {
		var reflectedRay = new Arrow(this.parent, originX, originY, originX, originY+length, thickness, '#fcea24' );
		reflectedRay.setAttributes( this.arrowStyle );
		
		var angleStart = (i%2) ? 157.5 : 180;
		reflectedRay.setRotation( angleStart + Math.random()*22.5 );
		
		this.reflectedRays.push(reflectedRay);
	}
}
SolarRadiation.prototype.clearReflectedRays = function() {
	// Clear out old refracted rays
	var existingRayCount = this.reflectedRays.length
	for(var i = 0; i < existingRayCount; i++) {
		this.reflectedRays[i].destroy();
	}
}

