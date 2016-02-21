// So the ideal here would be to do a few things.
// Dynamically grab the number of sections in a page (I don't think that would be hard)
// Put a data attributes (in terms of RGB color) into an array (it doesn't matter what size)
// -- (You'd probably start with a 'real' background color, as set in CSS? or maybe this would override it
// So you have an array of colors
// [{255,0,0},{255,255,0},]

// The complex part would be finding the height of each section, right?
// So instead of taking the FULL height of the page;
// You're finding the DIFF with the height of each SECTION
// Your increment changes based on the section

// So the SCROLL logic becomes more complex too
// I don't know if you want a 'state machine'
// Or whether there can be an easy "current increment" based on the current section

// this is probably more than I can bite off for tonight



// ===

// 1. Count number of sections.
// 2. Create two arrays of the same length: 1) hex numbers of each section. 2) 'top' offset of each section (for finding diffs)
// 		** this is starting to feel like I should just create a custom object with several properties
//		** colorSection.hex ... colorSection.r ... colorSection.g ... colorSection.b ... colorSection.top ... maybe colorSection.height
//		** then, work from the ARRAY of 
// 3. Convert hex numbers to RGB values (using regex, essentially): http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
// 4. Create a NEW array











// Global variables

// Starting 'coordinates'
var startR = 150;
var startG = 0;
var startB = 0;

// Ending coordinates (for calculations)
var finishR = 150;
var finishG = 255;
var finishB = 255;

// Total height of the page
var outerHeight;

// The current scroll position
var currentScrollPos;
var currentColor;

// The increment, in the form of an array
var increment;

// On beginning, calculate the total height of the page
$(document).ready(function(){

	// What's the total height?
	outerHeight = $(document).outerHeight();
	console.log('outerHeight is ' + outerHeight);

	// Let's say we want to do ONE transition
	// From the top of the page to the bottom of the page.

	// Start with RED rgb(255,0,0)
	// Turn to YELLOW rgb(255,255,0)

	// Set the initial page color
	currentColor = 'rgb('+startR+','+startG+','+startB+')';
	$('body').css('background-color',currentColor);

	// Get the difference between start and finish,
	// then divide by the total number of pixels.
	// this returns an array of length 3 (i.e. rgb)
	// with the correct increment values to add as you scroll
	// Now, Set color on the page;
	increment = FindIncrement(GetDifference());


});

// On scroll, get the height
$(document).scroll(function(){

	GetScrollPos();
	SetColor();

});

// Find the difference between the start and finish;
function GetDifference() {

	var diffR = finishR - startR;
	var diffG = finishG - startG;
	var diffB = finishB - startB;

	var difference = [diffR, diffG, diffB];
	console.log('Difference: ' + difference[0] + ',' + difference[1] + ',' + difference[2]);

	return difference;

}

function FindIncrement(diffArray) {

	var incrementArray = diffArray;

	//Divide each increment by the number of pixels;

	for(i = 0; i < incrementArray.length; i++) {

		diffArray[i] = diffArray[i] / outerHeight;
		//console.log(diffArray[i]);
	
	}

	return incrementArray;

}

function GetScrollPos() {

	currentScrollPos = $('nav').offset().top;
	console.log('currentScrollPos is ' + currentScrollPos);

}

function SetColor() {

	// Set the page color: pixels times increment

	var currentR = (startR + (currentScrollPos * increment[0])).toFixed(0);
	var currentG = (startG + (currentScrollPos * increment[1])).toFixed(0);
	var currentB = (startB + (currentScrollPos * increment[2])).toFixed(0);

	currentColor = 'rgb('+currentR+','+currentG+','+currentB+')';
	console.log(currentColor);
	$('body').css('background-color',currentColor);

}


// Find the difference between each one
// Divide by the number of pixels; this should be the increment per pixel
// On scroll, add the correct increment











