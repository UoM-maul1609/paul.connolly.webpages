// JavaScript Document

function Arrow( parent, x1, y1, x2, y2, thickness, colour ) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;	
	
	this.container = parent.g();
	
	
	var arrowHead = this.container.polyline([0,0, 3,1.5, 0,3, 0.75,1.5]).attr({
		fill: colour,
		"stroke-width" : 15
	});
	var arrowHeadMarker = arrowHead.marker(0, 0, 3, 3, 0.75, 1.5);
	
	this.arrow = this.container.polyline([x1, y1, x2, y2]).attr({
		"stroke" : colour,
  		"stroke-width" : thickness,
		"marker-end" : arrowHeadMarker
	});
}

Arrow.prototype.getX1 = function() {
	return this.x1;
}
Arrow.prototype.getY1 = function() {
	return this.y1;
}
Arrow.prototype.getX2 = function() {
	return this.x2;
}
Arrow.prototype.getY2 = function() {
	return this.y2;
}
Arrow.prototype.setCoordinatePoints = function( points ) {
	this.arrow.attr({ "points" : points });
}
Arrow.prototype.setThickness = function( value, doAnimation ) {
	if( doAnimation ) {
		this.arrow.animate({ "stroke-width" : value }, 200 );
	}
	else {
		this.arrow.attr({ "stroke-width" : value });
	}
}
Arrow.prototype.setAttributes = function( attr ) {
	this.arrow.attr( attr );
}
Arrow.prototype.setRotation = function( angle ) {
	var t = new Snap.Matrix() 
	t.rotate(angle, this.getX1(), this.getY1()); 
	this.arrow.transform(t);
}
Arrow.prototype.destroy = function() {
	this.arrow.remove();
	this.container.remove();
}
