// JavaScript Document
function CloudScape( parent, boundingBox ) {
	this.parent = parent;
	this.boundingBox = boundingBox;
	this.clouds = new Array();
	this.cloudCounter= 0;
	this.albedo = 0;
	
	
	// Create the cloud container
	var blurFilter = paper.filter(Snap.filter.blur(2));
	this.cloudscape = this.parent.g().attr({
		filter: blurFilter
	});
	
	// cache cloud images
	imageCache.push("clouds", Config.assets+'cloud/cloud.svg');

}

CloudScape.prototype.setCloudFraction = function( value ) {
	
	var cloudsLength = this.clouds.length;
	
	if ( value < cloudsLength ) {
		while( this.clouds.length > value ) {
			this.destroyCloud();
		}
	}
	else if ( value > cloudsLength ) {
		while( this.clouds.length < value ) {
			this.createCloud();
		}
	}
}


CloudScape.prototype.createCloud = function() {
	this.cloudCounter++;
	
	// Randomised start point in the sky
	var skyHalf = this.boundingBox.x;
	if( this.cloudCounter%2 != 0 ) {
		skyHalf = this.boundingBox.width/2;
	}
	
	var x = (Math.round(Math.random()*this.boundingBox.width)+skyHalf) - 750;
	var y = Math.round( Math.random() * this.boundingBox.height ) + this.boundingBox.y;
	var cloud = new Cloud(this.cloudscape,x, y, 0.6, this.albedo);
	
	this.clouds.push(cloud);
}
CloudScape.prototype.destroyCloud = function() {
	var dispursed = Math.round( (this.clouds.length-1) * Math.random() );
	this.clouds.splice(dispursed, 1)[0].destroy();
}


CloudScape.prototype.setCloudAlbido = function( value ) {
	this.albedo = value;
	
	var cloudsLength = this.clouds.length; 
	for(var i = 0; i < cloudsLength; i++) {
		this.clouds[i].setAlbedo( value );
	}
}