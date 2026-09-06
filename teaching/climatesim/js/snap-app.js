// JavaScript Document
function debug( message ) {
	console.log( message );
}

var paper = Snap("#cs-canvas");
// Create the sky gradient
paper.rect(0, 0, 1000, 500).attr({
  fill: 'L(0, 0, 0, 500)#98d8e3-#c4e1cf'
});

// Create the landscape with gradient
paper.path("M 0,500 0,1000 1000,1000 1000,500 c 0,0 -1000,-50 -1000,-13.02947 z").attr({
  fill: 'L(0, 500, 0, 1000)#98c052-#2f9343',
  filter: paper.filter(Snap.filter.blur(3, 3))
});

// Create the sun
var sunX = 850,
	sunY = 50,
	sunRayStartX = sunX+20, 
	sunRayStartY = sunY+60, 
	cloudLayerX = sunRayStartX-130, 
	cloudLayerY = sunRayStartY+120,
	groundEndX = cloudLayerX-275, 
	groundEndY = cloudLayerY+255;
	
new Sun(paper, sunX, sunY, 40);

// Create the 
var cloudScape = new CloudScape( paper, { x: 0, y: 175, width: 1000, height: 150} );
var industrialCentre = new IndustrialCentre( paper );
//industrialCentre.setCO2Value(0.1);
var cowHerd = new CowHerd( paper, { x: 0, y: 525, width: 600, height: 300} );

var solarRadiation = new SolarRadiation( paper, sunRayStartX, sunRayStartY, 
												cloudLayerX, cloudLayerY,
												groundEndX, groundEndY )

var irRadiation = new InfraredRays( paper, 200, groundEndY, cloudLayerY-groundEndY);


// Add border around canvas
paper.rect(0, 0, 1000, 1000)
.attr({
  strokeWidth: 10,
  stroke: '#666',
  "fill-opacity": 0
});

/**
 * Forwards on the new setting for total cows to the cow heard object.
 */
function setTotalCows( value ) {
	cowHerd.setTotalCows( value );
}
/**
 * Forwards on the new setting for CO2 value to the industrial centre object.
 */
function setCO2Value( value ) {
	industrialCentre.setCO2Value( value );
}
/**
 * Forwards on the new setting for cloud fraction value to the cloudscape object.
 */
function setCloudFraction( value ) {
	cloudScape.setCloudFraction( value );
}
/**
 * Forwards on the new setting for albido value to the cloudscape object.
 */
function setCloudAlbido( value ) {
	cloudScape.setCloudAlbido( value );
}
