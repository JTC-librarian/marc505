function formatContentsField(vm) {
/*************************************************************************************/
/***********  SETTINGS  ****************************************************/
/*************************************************************************************/
	var level_1_array = ["part", "pt.", "section"];
	var level_2_array = ["chapter", "ch."];
	var intro_phrases_array = ["contents:", "detailed contents:", "includes:", "machine generated contents note:"];
	var max_chapters = 80;
	var level_1_opening_tag = '<li class="jtc-contents-1">';
	var level_1_closing_tag = '</li>';
	var level_2_opening_tag = '<li class="jtc-contents-2">';
	var level_2_closing_tag = '</li>';
	var undelimited_opening_tag = '<p class="jtc-contents-undelimited">';
	var undelimited_closing_tag = '</p>'
/*************************************************************************************/
/***********  BASIC SECTION  ****************************************************/
/*************************************************************************************/
	startFormatting(vm);

function startFormatting(vm) {
	var contents = populateContentsFromPNX(vm);
	contents = removeIntroductoryPhrases(contents);
	var delimiter = identifyDelimiter(contents);
	console.log(delimiter);
	if (delimiter === "semicolon") {
		contents = contents.replaceAll(";", " -- ")
		delimiter = "doubledash";
	}
	if (delimiter === "doubledash") {
		contents = tidyContents(contents);
		contents = editContents(contents);
		vm.parentCtrl.item.pnx.display.contents = contents;
	}
	else if (delimiter === "html") {
		contents = editHTMLContents(contents);
		vm.parentCtrl.item.pnx.display.contents = contents;
	}
	else {
		// First see if you can find terms like 'chapter' and format on that.
		contents = editNoDelimiterContentsPart1(contents);
		console.log(contents);
		if (contents.search(undelimited_opening_tag) != -1) {
			vm.parentCtrl.item.pnx.display.contents = contents;
		}
		// Secondly, see if you can format based on numeration alone.
		else {
			contents = editNoDelimiterContentsPart2(contents);
			vm.parentCtrl.item.pnx.display.contents = contents;
		}
	}
}

function identifyDelimiter(contents) {
	var delimiter = false;
	if (contents.search("STARTNEW505<") != -1) {
		delimiter = "html";
	}
	else if (contents.search(" -- ") != -1) {
		delimiter = "doubledash";
	}
	if (!delimiter) {
		// Step 1, count semicolons
		var semicolon_array = contents.match(/;/g);
		if (semicolon_array != null) {
			var semicolon_count = semicolon_array.length;
			if (semicolon_count > 1) {
				// Step 2, Check for HTML entities which might distort the picture
				var ampersand_array = contents.match(/&/g);
				if (ampersand_array != null) {
					var ampersand_count = ampersand_array.length;
					var pure_semicolon_count = semicolon_count - ampersand_count;
				}
				else {
					var pure_semicolon_count = semicolon_count
				}
				// Step 3, if non HTML entity semi colons are more than 1, then check frequency
				if (pure_semicolon_count > 3) {
					var word_array = contents.split(" ");
					var word_count = word_array.length;
					var words_per_semicolon = word_count / semicolon_count;
					// Step 4, if one semi colon to every 16 words (under, in fact), then treat semi colon as a dlimiter.
					if (words_per_semicolon < 16) {
						delimiter = "semicolon";
					}
				}
			}
		}
	}
	return delimiter;
}

function tidyContents(contents) {
	contents = contents.replaceAll("STARTNEW505", " -- ");
	while (contents.search("  -- ") != -1) {
		contents = contents.replaceAll("  -- ", " -- ");
	}
	while (contents.search(" --  ") != -1) {
		contents = contents.replaceAll(" --  ", " -- ");
	}
	while (contents.search(" -- -- ") != -1) {
		contents = contents.replaceAll(" -- -- ", " -- ");
	}
	while (contents.substring(0,4) == " -- ") {
		contents = contents.substring(4);
	}
	while (contents.substring(contents.length-4,contents.length) == " -- ") {
		contents = contents.substring(0,contents.length-4);
	}
	return contents;
}

function populateContentsFromPNX(vm) {
	var contentsArray = vm.parentCtrl.item.pnx.display.contents;
	var contentsString = "";
	/* Concatenate the different 505 fields. */
	for (var i=0; i<contentsArray.length; i++) {
		contentsString = contentsString + "STARTNEW505" + contentsArray[i];
	}
	return contentsString;
}

function removeIntroductoryPhrases(contents) {
	for (var i=0; i<intro_phrases_array.length; i++) {
		if (contents.substring(0,intro_phrases_array[i].length).toLowerCase() == intro_phrases_array[i]) {
			contents = contents.substring(intro_phrases_array[i].length);
		}
	}
	return contents;
}
/*************************************************************************************/
/***********  NO DELIMITER EDITS  ****************************************************/
/*************************************************************************************/
function editNoDelimiterContentsPart1(contents) {
	contents = contents.replaceAll("STARTNEW505", " ");
	for (var i=0; i<level_1_array.length; i++) {
		var level_1_term = level_1_array[i];
		var regexp = new RegExp(`(${level_1_term} [0-9])`, "gi");
		contents = contents.replaceAll(regexp, undelimited_opening_tag + '$1');
	}
	for (var i=0; i<level_2_array.length; i++) {
		var level_2_term = level_2_array[i];
		var regexp = new RegExp(`(${level_2_term} [0-9])`, "gi");
		contents = contents.replaceAll(regexp, undelimited_opening_tag + '$1');
	}
	var contents_array = contents.split(undelimited_opening_tag);
	if (contents_array.length > 1) {
		var newContentsString = '';
		for (var i=0; i<contents_array.length; i++) {
			newContentsString = newContentsString + undelimited_opening_tag + contents_array[i] + undelimited_closing_tag
		}
		return newContentsString;
	}
	else {
		return contents;
	}
}

function editNoDelimiterContentsPart2(contents) {
	if (contents.search('1. ') != -1 && contents.search('2. ') != -1 && contents.search('3. ') != -1 && contents.search('4. ') != -1) {
		contents = contents.replaceAll(/([0-9]{1,2}\. )/g, undelimited_opening_tag + '$1');
	}
	var contents_array = contents.split(undelimited_opening_tag);
	if (contents_array.length > 1) {
		var newContentsString = '';
		for (var i=0; i<contents_array.length; i++) {
			newContentsString = newContentsString + undelimited_opening_tag + contents_array[i] + undelimited_closing_tag
		}
		return newContentsString;
	}
	else {
		return contents;
	}
}
/*************************************************************************************/
/***********  HTML EDITS HERE  *******************************************************/
/*************************************************************************************/
function editHTMLContents(contents) {
	contents = contents.replaceAll("STARTNEW505", "");
	contents = contents.replaceAll("<P>", "<p>");
	contents = contents.replaceAll("<P ", "<p ");
	contents = contents.replaceAll("</P>", "</p>");
	contents = contents.replaceAll("<B>", "<b>");
	contents = contents.replaceAll("</B>", "</b>");
	contents = contents.replaceAll("<I>", "<i>");
	contents = contents.replaceAll("</I>", "</i>");
	contents = contents.replaceAll("<STRONG>", "<strong>");
	contents = contents.replaceAll("</STRONG>", "</strong>");
	contents = contents.replaceAll("<OL>", "<ol>");
	contents = contents.replaceAll("<OL ", "<ol ");
	contents = contents.replaceAll("</OL>", "</ol>");
	contents = contents.replaceAll("<LI>", "<li>");
	contents = contents.replaceAll("<LI ", "<li ");
	contents = contents.replaceAll("</LI>", "</li>");
	contents = contents.replaceAll("<UL>", "<ul>");
	contents = contents.replaceAll("<UL ", "<ul ");
	contents = contents.replaceAll("</UL>", "</ul>");
	contents = contents.replaceAll("<BR>", "<br>");
	contents = contents.replaceAll("<BR ", "<br ");
	contents = contents.replaceAll("</BR>", "</br>");
	contents = contents.replaceAll("<SPAN>", "<span>");
	contents = contents.replaceAll("<SPAN ", "<span ");
	contents = contents.replaceAll("</SPAN>", "</span>");
	return contents
}
/*************************************************************************************/
/***********  START BLOCK FOR DOUBLE HYPHEN DELIMITER ********************************/
/*************************************************************************************/
function removeEmptyElements(contentsArray, newContentsArray) {
	var contentsElement;
	var contentsArrayLength = contentsArray.length;
	for (var i=0; i<contentsArrayLength; i++) {
		contentsElement = contentsArray[i];
		while (contentsElement.substring(0,1) == " ") {
			contentsElement = contentsElement.substring(1);
		}
		if (contentsElement.length != 0) {
			newContentsArray.push(contentsElement);
		}
	}
	return newContentsArray;
}

function isLevel1Element(newContentsElement){
	var level_1_match = false;
	var level_1_element;
	for (var i=0; i<level_1_array.length; i++) {
		level_1_element = level_1_array[i] + " ";
		if (newContentsElement.substring(0,level_1_element.length).toLowerCase() == level_1_element) {
			level_1_match = true;
		}
	}
	return level_1_match;
}

function isLevel2Element(newContentsElement){
	var level_2_match = false;
	var level_2_element;
	for (var i=0; i<level_2_array.length; i++) {
		level_2_element = level_2_array[i] + " ";
		if (newContentsElement.substring(0,level_2_element.length).toLowerCase() == level_2_element) {
			level_2_match = true;
		}
	}
	return level_2_match;
}

function populateHierarchyDict(newContentsArray, hierarchyDict){
	hierarchyDict.level_1 = 0;
	hierarchyDict.level_2 = 0;
	hierarchyDict.level_3 = 0;
	var newContentsArrayLength = newContentsArray.length;
	var newContentsElement;
	for (var i=0; i<newContentsArrayLength; i++) {
		var match = false;
		newContentsElement = newContentsArray[i];
/* Check first if a level 1 element */
		if (isLevel1Element(newContentsElement)) {
			hierarchyDict.level_1 = hierarchyDict.level_1 + 1;
			match = true;
		}
/* Then check if a level 2 element */
		if (match === false) {
			if (isLevel2Element(newContentsElement)) {
				hierarchyDict.level_2 = hierarchyDict.level_2 + 1;
				match = true;
			}
		}
/* Otherwise assign as a level 3 element */
		if (match === false) {
			hierarchyDict.level_3 = hierarchyDict.level_3 + 1;
		}
	}
	return hierarchyDict;
}

function createNewContents1(newContentsArray) {
	var newContentsString = "";
	var newContentsArrayLength = newContentsArray.length;
	var newContentsElement;
	for (var i=0; i<newContentsArrayLength; i++) {
		newContentsElement = newContentsArray[i];
		if (isLevel1Element(newContentsElement)) {
			newContentsString = newContentsString + level_1_opening_tag + newContentsElement + level_1_closing_tag;
		}
		else if (isLevel2Element(newContentsElement)) {
			newContentsString = newContentsString + level_2_opening_tag + newContentsElement + level_2_closing_tag;
		}
		else {
			newContentsString = newContentsString + " -- " + newContentsElement;
		}
	}
	return newContentsString;
}

function createNewContents2(newContentsArray) {
	var newContentsString = "";
	var newContentsArrayLength = newContentsArray.length;
	var newContentsElement;
	for (var i=0; i<newContentsArrayLength; i++) {
		newContentsElement = newContentsArray[i];
		if (isLevel1Element(newContentsElement)) {
			newContentsString = newContentsString + level_1_opening_tag + newContentsElement + level_1_closing_tag;
		}
		else {
			newContentsString = newContentsString + " -- " + newContentsElement;
		}
	}
	return newContentsString;
}

function createNewContents3(newContentsArray) {
	var newContentsString = "";
	var newContentsArrayLength = newContentsArray.length;
	var newContentsElement;
	for (var i=0; i<newContentsArrayLength; i++) {
		newContentsElement = newContentsArray[i];
		if (isLevel1Element(newContentsElement)) {
			newContentsString = newContentsString + level_1_opening_tag + newContentsElement + level_1_closing_tag;
		}
		else {
			newContentsString = newContentsString + level_2_opening_tag + newContentsElement + level_2_closing_tag;
		}
	}
	return newContentsString;
}

function createNewContents4(newContentsArray) {
	var newContentsString = "";
	var newContentsArrayLength = newContentsArray.length;
	var newContentsElement;
	for (var i=0; i<newContentsArrayLength; i++) {
		newContentsElement = newContentsArray[i];
		if (isLevel2Element(newContentsElement)) {
			newContentsString = newContentsString + level_1_opening_tag + newContentsElement + level_1_closing_tag;
		}
		else {
			newContentsString = newContentsString + " -- " + newContentsElement;
		}
	}
	return newContentsString;
}

function createNewContents5(newContentsArray) {
	var newContentsString = "";
	var newContentsArrayLength = newContentsArray.length;
	var newContentsElement;
	for (var i=0; i<newContentsArrayLength; i++) {
		newContentsElement = newContentsArray[i];
		if (isLevel2Element(newContentsElement)) {
			newContentsString = newContentsString + level_1_opening_tag + newContentsElement + level_1_closing_tag;
		}
		else {
			newContentsString = newContentsString + level_2_opening_tag + newContentsElement + level_2_closing_tag;
		}
	}
	return newContentsString;
}

function createNewContents6(newContentsArray) {
	var newContentsString = "";
	var newContentsArrayLength = newContentsArray.length;
	var newContentsElement;
	for (var i=0; i<newContentsArrayLength; i++) {
		newContentsElement = newContentsArray[i];
		newContentsString = newContentsString + " -- " + newContentsElement;
	}
	return newContentsString;
}

function createNewContents7(newContentsArray) {
	var newContentsString = "";
	var newContentsArrayLength = newContentsArray.length;
	var newContentsElement;
	for (var i=0; i<newContentsArrayLength; i++) {
		newContentsElement = newContentsArray[i];
		newContentsString = newContentsString + level_1_opening_tag + newContentsElement + level_1_closing_tag;
	}
	return newContentsString;
}

function editContents(contents) {
	var contentsArray = contents.split(" -- ");
	var newContentsArray = [];
	newContentsArray = removeEmptyElements(contentsArray, newContentsArray);
	console.log(newContentsArray);
	var hierarchyDict = {};
	hierarchyDict = populateHierarchyDict(newContentsArray, hierarchyDict);
	console.log(hierarchyDict);
	var newContents;
	if (hierarchyDict.level_1 > 1 && hierarchyDict.level_2 > 1) {
		newContents = createNewContents1(newContentsArray);
	}
	else if (hierarchyDict.level_1 > 1 && hierarchyDict.level_3 > max_chapters) {
		newContents = createNewContents2(newContentsArray);
	}
	else if (hierarchyDict.level_1 > 1) {
		newContents = createNewContents3(newContentsArray);
	}
	else if (hierarchyDict.level_2 > 1 && hierarchyDict.level_3 > max_chapters) {
		newContents = createNewContents4(newContentsArray);
	}
	else if (hierarchyDict.level_2 > 1) {
		newContents = createNewContents5(newContentsArray);
	}
	else if (hierarchyDict.level_3 > max_chapters) {
		newContents = createNewContents6(newContentsArray);
	}
	else {
		newContents = createNewContents7(newContentsArray);
	}
	while (newContents.substring(0,4) == ' -- ') {
		newContents = newContents.substring(4);
	}
	while (newContents.search(level_1_closing_tag + ' -- ') != -1) {
		newContents = newContents.replaceAll(level_1_closing_tag + ' -- ', level_1_closing_tag);
	}
	while (newContents.search(level_2_closing_tag + ' -- ') != -1) {
		newContents = newContents.replaceAll(level_2_closing_tag + ' -- ', level_2_closing_tag);
	}
	return newContents;
}
/***********************************************************************************/
/***********  END BLOCK FOR DOUBLE HYPHEN DELIMITER ********************************/
/***********************************************************************************/
}