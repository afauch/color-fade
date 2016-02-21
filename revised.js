



$(document).ready(function(){

	// Am I in?
	console.log('revised.js running');

	// How many sections?
	var numberOfSections = $('section').length;
	console.log('number of sections:' + numberOfSections);

	// Create an array to hold the set of objects
	var colorSectionArray = [];

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
		console.log('Section #' + colorSectionArray[j].sectionNumber + ' with hex ' + colorSectionArray[j].hex + 'has rgb values of (' + colorSectionArray[j].r + ', ' + colorSectionArray[j].g + ', ' + colorSectionArray[j].b + ').' )

	}

});



// Class constructor for colorSection object
function colorSection(sectionNumber, hex, r, g, b, sectionTop, sectionHeight) {

	this.sectionNumber = sectionNumber;
	this.hex = hex;
	this.r = r;
	this.g = g;
	this.b = b;
	this.sectionTop = sectionTop;
	this.sectionHeight = sectionHeight;

}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


