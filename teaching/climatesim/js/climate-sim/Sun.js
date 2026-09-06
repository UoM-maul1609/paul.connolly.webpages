// JavaScript Document
function Sun( parent, x, y, radius ) {
	this.x = x;
	this.y = y;
	
	// Create the sun
	this.sun = parent.g();
	
	
	this.moveTo( x, y );


	var sunCore = this.sun.circle(radius, radius, radius).attr({
		 fill: '#fcea24',
		 filter: paper.filter(Snap.filter.blur(5, 5))
	});
	
	
	var sunHalo = this.sun.circle(radius, radius, radius*2).attr({
	  fill: "r()rgb(252,234,36)-rgba(152,216,227,0.5)"
	});
	
	
	// Recusive - callback runs function indefinitely
	if( Config.animations ) {
		sunPulseAnimLoop();
	}
	function sunPulseAnimLoop() {
		Snap.animate(0, 2, function (val) {
			if( val <= 1 ) {
				// Fade low to high alpha gradient
				sunHalo.attr({
					fill: "r()rgb(252,234,36)-rgba(152,216,227,"+val+")"
				});
			}
			else {
				// Fade back high to low alpha gradient
				sunHalo.attr({
					fill: "r()rgb(252,234,36)-rgba(152,216,227,"+(2-val)+")"
				});
			}
		}, 3000, sunPulseAnimLoop); 
	};
}

Sun.prototype.getX = function() {
	return this.x;
}
Sun.prototype.getY = function() {
	return this.y;
}
Sun.prototype.moveTo = function( x, y ) {
	this.x = x;
	this.y = y;
	
	// Groups can only be moved by applying a transform action
	var t = new Snap.Matrix() 
	t.translate(x, y); 
	this.sun.transform(t);
}