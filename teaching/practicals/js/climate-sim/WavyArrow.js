// JavaScript Document

function WavyArrow( parent, x, y, height, spread, thickness, colour ) {
	this.x = x;
	this.y = y;
	this.height = height;
	this.spread = spread;
	
	this.container = parent.g();
	
	
	var arrowHead = this.container.polyline([0,0, 3,1.5, 0,3, 0.75,1.5])
	.attr({
		fill: colour,
		"stroke-width" : 5
	});
	var arrowHeadMarker = arrowHead.marker(0, 0, 3, 3, 0.75, 1.5),
		pathString = this.createWavyPath( x, y, this.height, this.spread);
	
	this.arrow = this.container.path( pathString )
	var style = {
		"stroke" : colour,
		"fill" : "none",
  		"stroke-width" : thickness,
		"stroke-dasharray" : "5 5",
		'stroke-dashoffset' : 0,
		"marker-end" : arrowHeadMarker
	};
	this.setAttributes( style );
}



WavyArrow.prototype.getX = function() {
	return this.x;
}
WavyArrow.prototype.getY = function() {
	return this.y;
}
WavyArrow.prototype.getHeight = function() {
	return this.height;
}
WavyArrow.prototype.setThickness = function( value ) {
	this.arrow.attr({ "stroke-width" : value });
}
WavyArrow.prototype.setHeight = function( height ) {
	var pathString = this.createWaveyPath( this.getX(), this.getY(), height );
	this.arrow.attr({ "d" : pathString });
}
WavyArrow.prototype.setRotation = function( angle ) {
	var t = new Snap.Matrix() 
	t.rotate(angle, this.getX(), this.getY()); 
	this.arrow.transform(t);
}
WavyArrow.prototype.setAttributes = function( attr ) {
	this.arrow.attr( attr );
}

WavyArrow.prototype.createWavyPath = function( x, y, height, spread ) {
	var curveHeight = 50,
		curveY1 = curveHeight/7,
		curveY2 = curveHeight/5,
		curveY3 = curveHeight/2,
		curveSpread = spread,
		numCurves = Math.abs(height)/curveHeight,
		pathString = "M" + x + "," + y;

	for(var i = 0; i < numCurves; i++) {
		pathString += "c0,-"+curveY1+" -"+curveSpread+",-"+curveY2+" -"+curveSpread+",-"+curveY3+" ";
		pathString += "c0,-"+curveY1+"  "+curveSpread+",-"+curveY2+"  "+curveSpread+",-"+curveY3+" ";
	}
	return pathString;
}

WavyArrow.prototype.destroy = function() {
	this.arrow.remove();
	this.container.remove();
}
