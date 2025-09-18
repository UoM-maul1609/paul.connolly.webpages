// JavaScript Document
var Config = {};

// App URL locations
Config.baseUrl = ".";
Config.assets = Config.baseUrl+'/assets/';

// Point at which layout snaps to portrain mode (see CSS media queries as well
Config.breakpoint = 980;

// The initial settings for the four variables
Config.atmosphere = { 
	ch4: { min: 0.75, max: 5, step: 0.25, initial: 1.75 },
	co2: { min: 280, max: 1000, step: 15, initial: 385 },
	cloud: { min: 0, max: 1, step: 0.1, initial: 0.7 },
	albedo: { min: 0, max: 1, step: 0.1, initial: 0.4 }
};

// Show extra animations by default?
Config.animations = false;

// Thermomenter alcohol colors
Config.alcoholColor = {
	warm: "#db3f02",
	cold: "#6495ED"
};

// The caption text as raw HTML
Config.commentary = {
	
	initial: "<p>Imagine the following scenario <strong>cows</strong> are grazing in a field and there is a large <strong>power station</strong> in the distance. There are no clouds in the sky so a lot of <strong>sunlight</strong> can penetrate through the atmosphere. A certain fraction of that sunlight is reflected back by the surface and some heat is also emitted as <strong>infrared</strong>.</p><br />"+
	"<p class='instruction'><strong>Move the sliders to change the properties of the atmosphere and observe the affect on the surface temperature.</strong></p>",
	
	ch4: {
		increasing : "<p><strong>An increase in CH<sub>4</sub> (methane) concentration</strong></p>"+
		"<p>Since methane absorbs infrared radiation (heat from the earth) it is said to 'trap' heat and so the <strong>earth's surface temperature also increases</strong>. Some sources of methane in the atmosphere are: cows belching and methane from the ground sources (for example from peat, when frozen soil melts or from landfill sites).</p>",
		decreasing : "<p><strong>A decrease in CH<sub>4</sub> (methane) concentration</strong></p>"+
		"<p>A decrease in methane concentration will reduce the absorption of infrared radiation (less heat will be `trapped') and so the <strong>earth's surface temperature will decrease</strong>. Gas phase chemistry reactions are responsible for reducing methane concentrations in the atmosphere.</p>"
	},
	
	co2: {
		increasing : "<p><strong>An increase in CO<sub>2</sub> (carbon dioxide) concentration</strong></p>"+
		"<p>Like methane carbon dioxide also absorbs infrared radiation (heat from the earth) and so an increase in CO<sub>2</sub> will cause the <strong>earth's surface temperature to go up</strong>. The main increases in carbon dioxide in earth's atmosphere are due to the burning of fossil fuels (coal, petroleum and gas) by humans.</p>",
		decreasing : "<p><strong>A decrease in CO<sub>2</sub> (carbon dioxide) concentration</strong></p>"+
		"<p>A reduction in CO<sub>2</sub> in earth's atmosphere will cause the <strong>earth's surface temperature to decrease</strong>. Use of renewable energy, recycling and reusing food containers all have the potential to reduce atmospheric CO<sub>2</sub> emissions.</p>"
	},
	
	cloud: {
		increasing :"<p><strong>An increase in cloud fraction</strong></p>"+
		"<p>As clouds generally act to reflect sunlight an increase in cloud fraction (the fraction of the planet covered with clouds) will cause a strong <strong>reduction in the earth's surface temperature</strong>. However, at night clouds can create a slight warming effect because they also emit some infrared heat towards the surface.</p>",
		decreasing :"<p><strong>A decrease in cloud fraction</strong></p>"+
		"<p>A decrease in cloud fraction means that less sunlight is reflected and hence an <strong>increase in earth's surface temperature</strong>. Scientists are trying to understand how the cloud fraction may change as the climate warms due to increases in carbon dioxide.</p>"
	},
	
	albedo : {
		increasing : "<p><strong>An increase in cloud albedo</strong></p>"+
		"<p>The cloud <em>albedo</em> is the fraction of incident sunlight that is reflected by the cloud. As this fraction increases more sunlight is reflected and goes into space; therefore, we get a <strong>decrease in the earth's surface temperature</strong>. Clouds are made of tiny water drops (and sometimes ice crystals) the more drops and crystals there are the higher the albedo is, examples of this are in pollution trails from ships, which appear whiter than normal clouds.</p>",
		decreasing : "<p><strong>A decrease in cloud albedo </strong></p>"+
		"<p>A decrease in cloud albedo results in an <strong>increase in earth's surface temperature</strong>.</p>"
		
	}
}