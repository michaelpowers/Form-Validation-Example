/*
 * Form Validation example
 * Copyright Michael Powers 11 June 2017
 *
 * This is based on a school assignment, and serves to demonstrate
 * my ability in JavaScript, HTML5, and CSS3.
 *
 */

// The needed regular expressions
var nameRE = /^[a-zA-Z]+$/;
var addressRE = /^[a-zA-Z0-9\s]+$/;
var zipRE = /\d\d\d\d\d/;
var areaRE = /\d\d\d/;
var phoneRE = /\d\d\d-\d\d\d\d/;
var emailRE = /[a-zA-Z0-9]@[a-zA-Z0-9].[a-zA-Z0-9]/

// This function validates the various text boxes, matching the needed regular expression
// by a string 'kind' passed as an argument.  'notallowed' is an unacceptable string, needed
// for the first and last name fields, as First and Last are default text
function validateText (werk,notallowed,kind) {
	var tester = new RegExp ();

	if	(kind == "nametest") {		tester = nameRE; }
	else if (kind == "addresstest") {	tester = addressRE; }
	else if (kind == "ziptest") {		tester = zipRE; }
	else if (kind == "areacodetest") {	tester = areaRE; }
	else if (kind == "phonetest") {		tester = phoneRE; }
	else if (kind == "emailtest") {		tester = emailRE; }
	if (werk.value != "" && werk.value != notallowed && tester.test (werk.value)) {
		werk.className = "good"; }
	else {
		werk.className = "bad";
	}
}

// Set the first position of the list to the selected two letter USPS state code,
// this first position data is then passed on submit
function getState (stateSelectList) {
	var index = stateSelectList.selectedIndex;
	var value = stateSelectList.options [index].value;

	stateSelectList.options [0].text = stateSelectList.options [index].value;
	stateSelectList.options [0].value = stateSelectList.options [index].value;
	stateSelectList.selectedIndex = 0;
	stateSelectList.className = "good";
}

// Same function, but for shoe size.  (If I had more time, I'd have made it generic and reused the code
// for states and shoe sizes.)
function getShoeSize (shoesizeSelectList) {
	var index = shoesizeSelectList.selectedIndex;
	var value = shoesizeSelectList.options [index].value;

	shoesizeSelectList.options [0].text = shoesizeSelectList.options [index].value;
	shoesizeSelectList.options [0].value = shoesizeSelectList.options [index].value;
	shoesizeSelectList.selectedIndex = 0;
	shoesizeSelectList.className = "good";
}

// As fields are entered correctly, their class changes from bad to good.  Hence, simply counting
// the number of remaining bad fields can be used for validating the form
function countBadFields () {

	return (document.getElementsByClassName ("bad").length);
}

// While the e-mail format is validated on input, a test of similarity is only conducted on submit
function validateEMails () {

	return (document.getElementById ("email").value == document.getElementById ("emailconfirm").value);
}

// A generic function to ensure that one radio button is selected.  This is use for meal preference
// and identifying sex.
function validateRadioButtons (werk) {
	var radios = document.getElementsByName (werk);

	return (radios [0].checked || radios [1].checked || radios [2].checked);
}

// This ensures at least two check boxes are checked.
function validateContactMethod () {
	var total = 0;
	var p = document.getElementById ("phonecheckbox");
	var e = document.getElementById ("emailcheckbox");
	var m = document.getElementById ("mailcheckbox");
	var l = document.getElementById ("linkedincheckbox");

	if (p.checked) { total = total + 1; }
	if (e.checked) { total = total + 1; }
	if (m.checked) { total = total + 1; }
	if (l.checked) { total = total + 1; }
	return (total > 1);
}

// A hard reset of the form, by forcing a reload from the source.
function resetForm () {

	location.reload (true);
}

// Tests all the data, then issues an alert of what is wrong or allows submission to proceed.
function submitForm () {

	var warning = "";

	if (countBadFields () > 0) {
		warning = warning + "Please correct fields still in dashed boxes\n";
	}
	if (!validateEMails ()) {
		warning = warning + "E-mail fields do not match\n";
	}
	if (!validateRadioButtons ("mealpreference")) {
		warning = warning + "Please choose a meal preference\n";
	}
	if (!validateContactMethod ()) {
		warning = warning + "Please choose two or more contact methods\n";
	}
	if (!validateRadioButtons ("sex")) {
		warning = warning + "Please identify your sex, or specify that you decline to answer";
	}
	if (warning != "") {
		alert (warning);
		return (false); }
	else {
		return (true);
	}
}