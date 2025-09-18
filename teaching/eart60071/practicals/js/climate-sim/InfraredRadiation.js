// JavaScript Document

function InfraredRays( parent, originX, originY, radiatingHeight ) {
	this.parent = parent;
	this.originX = originX;
	this.originY = originY;
	
	this.groundArrowParams = {
		originX : originX-50,
		originY : originY+60,
		height : -(radiatingHeight),
		spread : 30,
		thickness: 12,
		absorptionHeight : -(radiatingHeight+40),
		absorptionSize : 20
	}
	this.skyArrowParams = {
		originX : this.groundArrowParams.originX,
		originY : this.groundArrowParams.absorptionHeight-20,
		height : -150,
		spread : 30,
		thickness: 5
	}
	this.scatteredRaysParams = {
		originX : this.groundArrowParams.originX,
		originY : this.groundArrowParams.absorptionHeight,
		height : 100,
		spread : 10,
		thickness: 3
	}
	this.scatteredRays = [];
	
	
	this.groundArrow = this.createIRSource( this.groundArrowParams );
	this.skyArrow = this.createIRSource( this.skyArrowParams );
	this.groundArrowAbsorptionPoint = this.createAbsorptionPoint( this.groundArrowParams );
	this.createScatteredRays( this.scatteredRaysParams, 8 );
}

InfraredRays.prototype.setIRAbsoptionLevel = function( value ) {

	var cloudRayThickness = null,
		scatteredRayThickness = null,
		scatteredRayQuantity = null,
		absorptionPointOpacity = null;
		
	if( value == 1 ) {
		cloudRayThickness = 4,
		absorptionPointOpacity = 1,
		scatteredRayThickness = 8,
		scatteredRayQuantity = 12;
	}
	else if( value >= 0.9 && value < 1 ) {
		cloudRayThickness = 4,
		absorptionPointOpacity = 0.8,
		scatteredRayThickness = 8,
		scatteredRayQuantity = 12;
	}
	else if( value >= 0.8 && value < 0.9 ) {
		cloudRayThickness = 5,
		absorptionPointOpacity = 0.8,
		scatteredRayThickness = 7,
		scatteredRayQuantity = 8;
	}
	else if( value >= 0.7 && value < 0.8 ) {
		cloudRayThickness = 6,
		absorptionPointOpacity = 0.6,
		scatteredRayThickness = 6,
		scatteredRayQuantity = 8;
	}
	else if( value >= 0.6 && value < 0.7 ) {
		cloudRayThickness = 7,
		absorptionPointOpacity = 0.6,
		scatteredRayThickness = 5,
		scatteredRayQuantity = 8;
	}
	else if( value >= 0.5 && value < 0.6 ) {
		cloudRayThickness = 8,
		absorptionPointOpacity = 0.5,
		scatteredRayThickness = 4,
		scatteredRayQuantity = 8;
	}
	else if( value >= 0.4 && value < 0.5 ) {
		cloudRayThickness = 8,
		absorptionPointOpacity = 0.5,
		scatteredRayThickness = 4,
		scatteredRayQuantity = 4;
	}
	else if( value >= 0.3 && value < 0.4 ) {
		cloudRayThickness = 9,
		absorptionPointOpacity = 0.4,
		scatteredRayThickness = 3,
		scatteredRayQuantity = 4;
	}
	else if( value >= 0.2 && value < 0.3 ) {
		cloudRayThickness = 10,
		absorptionPointOpacity = 0.4,
		scatteredRayThickness = 2,
		scatteredRayQuantity = 4;
	}
	else if( value > 0.1 && value < 0.2 ) {
		cloudRayThickness = 11,
		absorptionPointOpacity = 0.3,
		scatteredRayThickness = 2,
		scatteredRayQuantity = 4;
	}
	else {
		cloudRayThickness = 12,
		absorptionPointOpacity = 0.3,
		scatteredRayThickness = 2,
		scatteredRayQuantity = 2;
	}


	// Change appearance of IR radiation escaping to space
	this.skyArrow.setThickness( cloudRayThickness, true ); 
	// Change appearance of point of atmospheric absorption
	this.groundArrowAbsorptionPoint.attr({ "opacity" : absorptionPointOpacity });
	// Change appearance of IR radiation scattered in atmosphere
	this.scatteredRaysParams.thickness = scatteredRayThickness;
	this.createScatteredRays( this.scatteredRaysParams, scatteredRayQuantity);
}



InfraredRays.prototype.createIRSource = function( params ) {
	var arrowStyle = { 
		"opacity" : 0.5,
		"stroke-dasharray" : "3 3",
		"stroke-dashoffset" : 0
	};
	
	var arrow = new WavyArrow( 
		this.parent, 
		params.originX, 
		params.originY, 
		params.height, 
		params.spread, 
		params.thickness, 
		'#ff0000' );
		
	arrow.setAttributes(arrowStyle);
	return arrow;
}


InfraredRays.prototype.createAbsorptionPoint = function( params ) {
	var f = this.parent.filter( Snap.filter.blur( params.absorptionSize ) ),
	absorptionPoint = this.parent.circle( 
		params.originX, 
		params.absorptionHeight, 
		params.absorptionSize )
	.attr({
		filter: f,
		fill: "#ff0000",
		opacity: 0.3
	});
	return absorptionPoint;
}

InfraredRays.prototype.createScatteredRays = function( params, quantity ) {
	var arrowStyle = { 
		"opacity" : 0.1,
		"stroke-dasharray" : "3 3",
		"stroke-dashoffset" : 0
	};
	
	
	this.clearScatteredRays();
	for(var i = 0; i < quantity; i++) {
		var scatteredRay = new WavyArrow( 
			this.parent, 
			params.originX, 
			params.originY, 
			params.height, 
			params.spread, 
			params.thickness, 
			'#ff0000' );
			
		scatteredRay.setAttributes( arrowStyle );
		
		var sector  = (i%4),
			angleStart = null;
			
		switch (sector) {
			case(0): 	angleStart = 0
						break;
			case(1): 	angleStart = 195
						break;
			case(2): 	angleStart = 90
						break;
			case(3): 	angleStart = 285
						break;
		}
		scatteredRay.setRotation( angleStart + Math.random()*75 );
		
		this.scatteredRays.push( scatteredRay );
	}
}
InfraredRays.prototype.clearScatteredRays = function() {
	// Clear out old refracted rays
	var existingRayCount = this.scatteredRays.length
	for(var i = 0; i < existingRayCount; i++) {
		this.scatteredRays[i].destroy();
	}
}

InfraredRays.prototype.getOriginX = function() {
	return this.originX;
}
InfraredRays.prototype.getOriginY = function() {
	return this.originY;
}
