// JavaScript Document
function CowHerd( parent, boundingBox ) {
	this.parent = parent;
	this.boundingBox = boundingBox;
	this.cows = new Array();
}

CowHerd.prototype.setTotalCows = function( value ) {
	var cowsLength = this.cows.length;

	if ( value < cowsLength ) {
		while( this.cows.length > value ) {
			this.destroyCow();
		}
	}
	else if ( value > cowsLength ) {
		while( this.cows.length < value ) {
			this.createCow();
		}
	}
}

CowHerd.prototype.createCow = function() {
	var numCows = this.cows.length,
		coords = null;
	
	if( numCows == 0 ) {
		coords = this.getRandomCoordinates( 0.9 );
	}
	else {

		while(true) {
			coords = this.getRandomCoordinates();
			var isUniquePosition = null;

			for(var i = 0; i < numCows; i++) {
				var cow = this.cows[i];
				// Do the new coordinates clash with any existing object positions?
				isUniquePosition = !(cow.getX() == coords.x && cow.getY() == coords.y);
								
				if(!isUniquePosition) {
					break; // break out of for loop
				}
			}
			if(isUniquePosition) {
				break; // break out of while loop
			}
		}
	}

	var cow = new Cow( this.parent, coords.x, coords.y, coords.scaleFactor );

	this.cows.push(cow);
	numCows++;
	

	// After the new cow has loaded, ensure that the stacking order is updated.
	this.resortCows();

	for(var i = 0; i < numCows; i++) {
		cow = this.cows[i];
		cow.remove();
		cow.addTo( this.parent );
	}
}

CowHerd.prototype.destroyCow = function() {
	var beefPie = Math.round( (this.cows.length-1) * Math.random() );
	this.cows.splice(beefPie, 1)[0].destroy();
}

CowHerd.prototype.resortCows = function () {
	this.cows.sort(function(a,b) {
		return a.getY() - b.getY();
	});
}

CowHerd.prototype.getRandomCoordinates = function( scaleFactor ) {
	scaleFactor = !scaleFactor ? Math.random() : scaleFactor;
	
	// Object separation
	var	sepX = Math.ceil(( (100*Math.random()) + 1 ) /30)*30, 
		sepY = Math.ceil(( (30*Math.random()) + 20 ) /30)*30; 
	
	var coords = {
		x: Math.ceil(( (this.boundingBox.width*Math.random()) + this.boundingBox.x )/sepX)*sepX,
		y: Math.ceil(( (this.boundingBox.height*scaleFactor + this.boundingBox.y) + 1 )/sepY)*sepY,
		scaleFactor: scaleFactor
	};

	return coords;
}