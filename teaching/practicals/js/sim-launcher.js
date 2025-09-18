// JavaScript Document

Config.animations = getParameterByName("anims") == "true";


/***
 *** jQuery bootstrapping
 ***/
$(function() {
	
	var albedoSlider = null,
		allSliders = $( "#cs-controls .cs-slider" ),
		ch4OutputField = $( "#cs-control-ch4 .cs-output" ),
		co2OutputField =	$( "#cs-control-co2 .cs-output" ),
		cloudOutputField = $( "#cs-control-cloud .cs-output" ),
		albedoOutputField = $( "#cs-control-albedo .cs-output" ),
		oldValues = {},
		thermometerReading = $( "#cs-surfacetemp .cs-thermometer .cs-reading" ),
		thermometerAlcohol = $( "#cs-surfacetemp .cs-thermometer .cs-alcohol" ),
		thermometerValueC = $( "#cs-surfacetemp .cs-valueC" ),
		thermometerValueK = $( "#cs-surfacetemp .cs-valueK" ),
		commentaryBox = $( "#cs-commentary" ),
		maxTemp = calculateAtmosphericChanges( 
					Config.atmosphere["ch4"].max, 
					Config.atmosphere["co2"].max, 
					Config.atmosphere["cloud"].max, 
					Config.atmosphere["albedo"].min 
				).globalSurfaceTemp,
		minTemp = calculateAtmosphericChanges(
					Config.atmosphere["ch4"].min, 
					Config.atmosphere["co2"].min, 
					Config.atmosphere["cloud"].max, 
					Config.atmosphere["albedo"].max 
				).globalSurfaceTemp;
	
	// Initialise...
	if( isInternetExplorer() ) {	
		$("#page-warning-notice").show();
	}
	initialise();






	/**
	 * Builds the jqueryui elements and initialises the values for the simulation.
	 * See also config.js
	 */
	function initialise() {

		createSlider( "ch4", updateCH4 );
		createSlider( "co2", updateCO2 );
		createSlider( "cloud", updateCloudFraction );
		albedoSlider = createSlider( "albedo", updateAlbido );
		
		updateCH4( Config.atmosphere["ch4"].initial );
		updateCO2( Config.atmosphere["co2"].initial );
		updateCloudFraction( Config.atmosphere["cloud"].initial );
		updateAlbido( Config.atmosphere["albedo"].initial );
		
		setCommentaryText( Config.commentary.initial );
		
		$(window).resize(function() {
			resize();
		});	
		resize();
	}
	
	
	
	
	
	/**
	 * Create a jqueryui slider.
	 */
	function createSlider( name, slideEventCallBack ) {
		var slider = $( "#cs-control-" +  name + " .cs-slider").slider({
			min: Config.atmosphere[name].min,
			max: Config.atmosphere[name].max,
			value: Config.atmosphere[name].initial,
			step: Config.atmosphere[name].step,
			orientation: "vertical",
			slide: function( event, ui ) {	
				slideEventCallBack( ui.value );
			}
		});
		return slider;
	}
	
	
	/**
	 * Set the text to appear in the commentary box
	 */
	function setCommentaryText( text ) {
		if( commentaryBox ) {
			commentaryBox.html( text );
		}
	}
	
	
	/**
	 * Updates the scene for changes to the CH4 value
	 */
	function updateCH4( sliderValue ) {
		var totalCows = Math.round((sliderValue-0.5)/0.5);
		setTotalCows( totalCows );
		updateOutputs( "ch4", sliderValue );
	}
	/**
	 * Updates the scene for changes to the CO2 value
	 */
	function updateCO2( sliderValue ) {
		var relativeCo2 = (sliderValue - Config.atmosphere["co2"].min) / (Config.atmosphere["co2"].max - Config.atmosphere["co2"].min );
		setCO2Value( relativeCo2.toFixed(1) );
		updateOutputs( "co2", sliderValue );
	}
	/**
	 * Updates the scene for changes to the cloudy fraction value
	 */
	function updateCloudFraction( sliderValue ) {
		var totalClouds = sliderValue/0.1;
		setCloudFraction( totalClouds );
		
		var albedoEnabled = (sliderValue == 0) ? "disable" : "enable";
		if( albedoSlider ) {
			albedoSlider.slider( albedoEnabled );
		}
		updateOutputs( "cloud", sliderValue );
	}
	/**
	 * Updates the scene for changes to the albrido value
	 */
	function updateAlbido( sliderValue ) {
		setCloudAlbido( sliderValue );
		updateOutputs( "albedo", sliderValue );
	}
	
	/**
	 * Updates all outputs in response to changes to one of CH4, CO2, cloud fraction and albido
	 */
	function updateOutputs( type, newValue ) {
		
		var commentaryText = null;
		if( oldValues && oldValues[type] > newValue ) {
			commentaryText = Config.commentary[type].decreasing;
		}
		else {
			commentaryText = Config.commentary[type].increasing;
		}
		oldValues[type] = newValue;
		setCommentaryText( commentaryText );
		
		// Update the output readings and calculation
		updateReadings();
	}
	
	/**
	 * Updates the temperature output readings, animates the thermometer and applies some
	 * changes to the overall scene to reflect changes in radiation.
	 */
	function updateReadings() {
		var ch4ppm = oldValues["ch4"],
			co2ppm = oldValues["co2"],
			cloudFraction = oldValues["cloud"],
			albedo = oldValues["albedo"];
			
		var output = calculateAtmosphericChanges( ch4ppm, co2ppm, cloudFraction, albedo );
		
		// Calculate a percentage height to set the thermometer alcohol
		var	_temp = output.globalSurfaceTemp, 
			_maxTemp, 
			_minTemp,
			offset,
			range,
			alcoholColor;
		
		// To handle to vastly different swings in value, two ranges are used, below the range is condensed
		// This emphasises the above zero reading which is where most of the action takes place
		if( output.globalSurfaceTemp >= 273.15 ) {
			_minTemp = 273;
			_maxTemp = maxTemp;
			range = 90;
			offset = 8; // Must total the below zero settings for range and offset
			alcoholColor = Config.alcoholColor.warm;
		}
		else {
			_minTemp = 0;
			_maxTemp = 273;
			range = 5;
			offset = 3;
			alcoholColor = Config.alcoholColor.cold;
		}
		
		var percentage = offset + ( ( ( _temp - _minTemp ) / ( _maxTemp - _minTemp ) ) * range );

		// Update the thermometer reading
		thermometerReading.animate( { 
			"height" : percentage+"%",
			},{
				"duration" : 400,
				"easing" : "linear",
				"queue" : false // makes changes more responsive
			}
		);
		// Update the thermometer alcohol color to indicate low tempertures
		thermometerAlcohol.animate( { 
			"background-color" : alcoholColor
			},{
				"duration" : 400,
				"easing" : "linear",
				"queue" : false // makes changes more responsive
			}
		);
		
		// Update the thermometer reading values
		thermometerValueC.html( (output.globalSurfaceTemp - 273.15).toFixed(1) + "&deg;C");
		thermometerValueK.html( "(" + output.globalSurfaceTemp.toFixed(1) + "&deg;K)");
		
		// Update the slider value fields
		ch4OutputField.html( ch4ppm.toFixed(2) + "ppm");
		co2OutputField.html( co2ppm  + "ppm");
		cloudOutputField.html( (cloudFraction * 100)  + "%" );
		albedoOutputField.html( (albedo * 100) + "%" );
		
		// Change the amount of solar radiation reflected and refracted
		var solarRadiationValue = cloudFraction ?  (cloudFraction+albedo)/2 : 0
		solarRadiation.setRadiationRefraction( solarRadiationValue );
		
		// Change the amount of IR radiation absorped by atmosphere - CH4 is 25x more powerful than CO2, but there is more C02 as ppm
		var ch4Contribution = (ch4ppm - Config.atmosphere.ch4.min) / (Config.atmosphere.ch4.max - Config.atmosphere.ch4.min);
		var co2Contribution = (co2ppm - Config.atmosphere.co2.min) / (Config.atmosphere.co2.max - Config.atmosphere.co2.min);
		ch4Contribution *= 2; // Assumpt CH4 gives twice the temperature increase than CO2
		
		var irAbsorptionValue = (ch4Contribution + co2Contribution) / 3;
		irRadiation.setIRAbsoptionLevel( irAbsorptionValue.toFixed(1) );
	}
	
	/**
	 * The calculation for the change to the atmospheric conditions in response to changes of
	 * CH4, CO2, cloud and albedo.
	 */
	function calculateAtmosphericChanges( ch4ppm, co2ppm, cloudFraction, albedo ) {

		var SOLAR_FLUX=1368,
			SIGMA_S=0.0000000567,
			PATM=100000,
			ALBEDO_CLEAR=0.15 // SURFACE ALBEDO
		
		// CALCULATE THE NEW ALBEDO
		var ALBEDO_P = cloudFraction * albedo + (1 - cloudFraction)*ALBEDO_CLEAR;
		
		/* ENERGY BALANCE - I.E. EQUATE IN-COMING SOLAR FLUX ACROSS A DISK 
    	 * TO ENERGY EMITTED OVER A SPHERE.
    	 * CALCULATE THE EFFECTIVE TEMPERATURE 
		 */
		var TEFF = Math.pow( (SOLAR_FLUX/4*(1-ALBEDO_P)/SIGMA_S), 0.25 );

		// SPECIFY THE PARTIAL PRESSURE OF CO2, H20 AND METHANE
		var ECO2 = co2ppm * 0.000001*PATM;
		var EH2O = 100 * 0.18; // PASCALS
		var ECH3 = ch4ppm * 0.000001*PATM;

		// CALCULATE THE OPTICAL DEPTH DUE TO CO2, H20 AND METHANE
		var TAU_CO2 = 0.029*Math.pow( ECO2, 0.5 );
		var TAU_H2O = 0.087*Math.pow( EH2O, 0.5 );
		var TAU_CH3 = 0.029*25*Math.pow( ECH3, 0.5 ); // ASSUME CH3 IS 25 TIMES MORE EFFECTIVE GREENHOUSE GAS THAN CO2
		
		var TAU = TAU_CO2 + TAU_H2O + TAU_CH3; // TOTAL OPTICAL DEPTH OF ABSORBING GASES
		var TSURFACE= TEFF*Math.pow( (1 + 0.75*TAU), 0.25 ); // MULTIPLY BY 4TH ROOT OF EMISSIVITY

		return { 
			plantaryAlbedo : ALBEDO_P, 
			effectiveTemp : TEFF, 
			globalSurfaceTemp : TSURFACE
		};		
	}
	

	
	/**
	 * Dynamically set the size and layout of the components to aid the overall responsive design.
	 */
	function resize() {
		
		var climateSim = $("#climate-sim"),
			canvas = $("svg#cs-canvas"),
			container = $("#cs-canvas-container"),
			controls = $("#cs-controls"),
			commentaryBox = $("#cs-commentary"),
			thermometer = $("#cs-surfacetemp .cs-thermometer"),
		 	windowWidth = $(window).width(),
			windowHeight = $(window).height(),
			minHeight = 260,
			canvasMinSize = minHeight,
			canvasSize = canvasMinSize;
			
		// Adjust sizing for landscape orientation
		if( windowWidth > Config.breakpoint ) {
			
			// Set the width of the canvas to accommodate the sliders in vertical orientation 
			canvasMinSize = minHeight;
			canvasSize = Math.min( ( windowWidth - 370), ( windowHeight - 320 ) );

			// Shift the orientation of the sliders dynamically
			
			// Vertical orientation
			allSliders.each(function() {
				var slider = $(this);
				slider.slider( "option", "orientation", "vertical" );
				// Need to clear left style on slider handle after 
				//orientation change else is misaligned (jqueryui bug?)
				$(".ui-slider-handle", slider).css( "left", "" );
				
				slider.css({ 
					"height" : canvasSize - 30,
					"width" : ""
				});
			});
			
			
			$( ".cs-control", controls ).each(function() {
				var label = $( ".cs-label", $(this) ).detach();
				label.insertAfter( $(".cs-slider", $(this)) );
			});
			controls.detach().insertAfter( container );
			
			container.css({
				"margin-left" : "",
			});
			
			climateSim.css( "width", canvasSize + 350 );
		}
		
		// Adjust sizing for portrait orientation
		else {
			// Set the width of the canvas to accommodate the sliders in horizontal orientation
			canvasMinSize = 200;
			canvasSize = Math.min( ( windowWidth - 200 ), ( windowHeight - 240 ));
			
			
			// Horizontal orientation
			allSliders.slider( "option", "orientation", "horizontal" )
				.css({
					"height" : "",
					"width" : canvasSize - 170,
				});
				
			
			
			$( ".cs-control", controls ).each(function() {
				var label = $( ".cs-label", $(this) ).detach();
				label.prependTo($(this));
			});
			controls.detach().insertAfter( canvas );
			
			container.css({
				"margin-left" : 140,
			});
			
			climateSim.css( "width", canvasSize + 140 );
		}
		
		
		// Set the overall canvas size and layout of other key elements
		canvas.css({
			"min-width" : canvasMinSize,
			"min-height" : canvasMinSize,
			"width" :  canvasSize,
			"height" :  canvasSize
		});
		
		// Set the container to behave responsively
		container.css({
			"min-width" : canvasMinSize,
			"width" : canvasSize,
		});
		
		// Set the container to behave responsively
		thermometer.css({
			"height" :  canvasSize - 120
		});
		
		
		
		// Once the overal size has been set, carry out any post canvas sizing layout 
		

		// Set the commentary box to adjust to fix height at best size relative to width
		commentaryBoxWidth = commentaryBox.width();
		requiredTextArea = ( windowWidth > Config.breakpoint ) ? 85000 : 150000;
		commentaryBox.css({
			"height" : (requiredTextArea/commentaryBoxWidth)
		});
	}
	
	
	
	function debug( message ) {
		console.log( message );
	}
});

