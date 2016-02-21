var currentScrollPos; // holds the currentScrollPos
var colorSectionArray = []; // holds the set of colorSection objects
var currentSection; // holds the # of the current section (really for debugging right?)
var currentColor; // holds the current color as a string

$(document).ready(function(){

	// Am I in?
	console.log('revised.js running');

	// How many sections?
	var numberOfSections = $('section').length;
	console.log('number of sections:' + numberOfSections);

	// Actually, instead of using that array to just hold the hex values
	// create an array of objects and populate certain properties about them

	// Iterate over each section and assign certain values
	for(var i = 0; i < numberOfSections; i++){

		// create a colorSection
		colorSectionArray[i] = new colorSection();

		// assign the section number
		colorSectionArray[i].sectionNumber = i+1;

		// grab the top pixel value
		colorSectionArray[i].sectionTop = $('section:nth-of-type('+(i+1)+')').offset().top;

		// grab the height of the section in px
		colorSectionArray[i].sectionHeight = $('section:nth-of-type('+(i+1)+')').outerHeight();

		// grab its hex value, as displayed on the HTML element
		colorSectionArray[i].hex = $('section:nth-of-type('+(i+1)+')').data("hex");

		console.log('Section #' + colorSectionArray[i].sectionNumber + ' is color ' + colorSectionArray[i].hex + ', is located at ' + colorSectionArray[i].sectionTop + ', and has height ' + colorSectionArray[i].sectionHeight + '.');

	}

	// Now let's convert those hex values and populate the 'r,g,b' values
	for(var j = 0; j < colorSectionArray.length; j++) {
		
		// assign the result values to the colorSection object
		colorSectionArray[j].r = hexToRgb(colorSectionArray[j].hex).r;
		colorSectionArray[j].g = hexToRgb(colorSectionArray[j].hex).g;
		colorSectionArray[j].b = hexToRgb(colorSectionArray[j].hex).b;

		// proof it
		console.log('Section #' + colorSectionArray[j].sectionNumber + ' with hex ' + colorSectionArray[j].hex + 'has rgb values of (' + colorSectionArray[j].r + ', ' + colorSectionArray[j].g + ', ' + colorSectionArray[j].b + ').' );

	}

	// Find the increments for each section
	GetDifferenceSetIncrement();

	// Initialize the color
	InitializePageColor();

});

// On scroll, get the height
$(document).scroll(function(){

	GetScrollPos();
	SetColor(currentSection-1);

});


// Class constructor for colorSection object
function colorSection(sectionNumber, hex, r, g, b, sectionTop, sectionHeight, increment) {

	this.sectionNumber = sectionNumber;
	this.hex = hex;
	this.r = r;
	this.g = g;
	this.b = b;
	this.sectionTop = sectionTop;
	this.sectionHeight = sectionHeight;
	this.increment = increment;

}

// Hex to RGB Conversion
// From http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function GetScrollPos() {

	currentScrollPos = $('nav').offset().top;
	console.log('currentScrollPos: ' + currentScrollPos);

	// which section am I in?
	for (var k = 0; k < colorSectionArray.length; k++) {

		if (currentScrollPos > colorSectionArray[k].sectionTop && currentScrollPos <= (colorSectionArray[k].sectionTop + colorSectionArray[k].sectionHeight)) {

			currentSection = colorSectionArray[k].sectionNumber;
			console.log('Current section is ' + currentSection);

		}

	}

}


function GetDifferenceSetIncrement() {

	// for each section, find the rgb difference
	// perform calculations
	// and set the increment value in the object
	for (var l = 0; l < colorSectionArray.length-1; l++) {

		// find the difference
		var diff = [
			colorSectionArray[l+1].r - colorSectionArray[l].r,
			colorSectionArray[l+1].g - colorSectionArray[l].g,
			colorSectionArray[l+1].b - colorSectionArray[l].b
		];

		// DEBUG
		console.log('Diff is ' + diff);

		// divide the difference by the section height to get the increment
		// and assign it back to the object
		colorSectionArray[l].increment = [
			(diff[0] / colorSectionArray[l].sectionHeight),
			(diff[1] / colorSectionArray[l].sectionHeight),
			(diff[2] / colorSectionArray[l].sectionHeight)
		];

		// DEBUG
		console.log('Incr is ' + colorSectionArray[l].increment);


	}

}

function InitializePageColor() {

	currentColor = 'rgb('+colorSectionArray[0].r+','+colorSectionArray[0].g+','+colorSectionArray[0].b+')';
	console.log(currentColor);
	$('body').css('background-color',currentColor);

}

function SetColor(thisSection) {

	// variable to store the difference between the top of the section and the scrollposition
	// so we know how much increment to add
	var topDiff = currentScrollPos - colorSectionArray[thisSection].sectionTop;
	console.log('topDiff = ' + topDiff);

	// Set the page color: pixels times increment
	var currentR = (colorSectionArray[thisSection].r + (topDiff * colorSectionArray[thisSection].increment[0])).toFixed(0);
	var currentG = (colorSectionArray[thisSection].g + (topDiff * colorSectionArray[thisSection].increment[1])).toFixed(0);
	var currentB = (colorSectionArray[thisSection].b + (topDiff * colorSectionArray[thisSection].increment[2])).toFixed(0);

	currentColor = 'rgb('+currentR+','+currentG+','+currentB+')';
	console.log(currentColor);
	$('body').css('background-color',currentColor);

}
