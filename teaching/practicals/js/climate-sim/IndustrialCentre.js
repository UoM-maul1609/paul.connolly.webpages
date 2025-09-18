// JavaScript Document
function IndustrialCentre( parent ) {
	this.parent = parent;
	this.buildings = new Array();
	
	// cache the images in preparation for being loaded.
	var imgURLs = [
		Config.assets+'buildings/power-station.svg',
		Config.assets+'buildings/factory.svg'
	];
	imageCache.pushArray("buildings", imgURLs);
}

IndustrialCentre.prototype.setCO2Value = function( value ) {
	
	
	if( value == 0 ) {
		co2Source = [true, false, false];
		co2Frequency = [10000, null, null];
	}
	else if(value > 0 && value <= 0.1) {
		co2Source = [true, false, false];
		co2Frequency = [7500, null, null];
	}
	else if(value > 0.1 && value <= 0.2) {
		co2Source = [true, false, false];
		co2Frequency = [5000, null, null];
	}
	else if(value > 0.2 && value <= 0.3) {
		co2Source = [true, true, false];
		co2Frequency = [5000, 10000, null];
	}
	else if(value > 0.3 && value <= 0.4) {
		co2Source = [true, true, false];
		co2Frequency = [5000, 7500, null];
	}
	else if(value > 0.4 && value <= 0.5) {
		co2Source = [true, true, false];
		co2Frequency = [5000, 5000, null];
	}
	else if(value > 0.5 && value <= 0.6) {
		co2Source = [true, true, true];
		co2Frequency = [5000, 5000, 10000];
	}
	else if(value > 0.6 && value <= 0.7) {
		co2Source = [true, true, true];
		co2Frequency = [5000, 5000, 7500];
	}
	else if(value > 0.7 && value <= 0.8) {
		co2Source = [true, true, true];
		co2Frequency = [5000, 5000, 5000];
	}
	else if(value > 0.8 && value <= 0.9) {
		co2Source = [true, true, true];
		co2Frequency = [4000, 4000, 4000];
	}
	else {
		co2Source = [true, true, true];
		co2Frequency = [3000, 3000, 3000];
	}
	
	// Create any buildings that need creating
	if( co2Source[0] && !this.buildings[0] ) {
		this.buildings[0] = new CO2Source( this.parent, CO2Source.powerStation, 810, 325, 166, 200 );
	}
	if( co2Source[1] && !this.buildings[1] ) {
		this.buildings[1] = new CO2Source( this.parent, CO2Source.factory, 815, 495, 180, 120 );
	}
	if( co2Source[2] && !this.buildings[2] ) {
		this.buildings[2] = new CO2Source( this.parent, CO2Source.factory, 650, 435, 170, 113 );
	}
	
	for(var i = 0; i < 3; i++) {
		// Destroy any buildings that shouldn't be in existance
		if( !co2Source[i] && this.buildings[i] ) {
			this.buildings[i].destroy();
			this.buildings[i] = null;
		}
		
		// For any buildings that remain, set the CO2 frequency
		if( this.buildings[i] ) {
			this.buildings[i].setCO2OutputRate( co2Frequency[i] );
		}
		
	}

}