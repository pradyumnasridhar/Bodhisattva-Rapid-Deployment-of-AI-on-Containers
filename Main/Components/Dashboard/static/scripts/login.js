signinEmail = null;
signinPassword = null;
signinSubmit = null;
signinLoading = null;
signinSubmitButton = null;

signupName = null;
signupEmail = null;
signupPassword = null;
signupSubmit = null;
signupLoading = null;
signupSubmitButton = null;

function signin(event) {
	event.preventDefault();
	if (signinEmail.value == "") {
		alert("Please enter your email ID.");
		return;
	}
	if (signinPassword.value == "") {
		alert("Please enter password.");
		return;
	}

	signinLoading.style.display = "inline";
	signinSubmitButton.style.display = "none";

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			output = xhr.responseText;
			output = JSON.parse(output);
			resp = output["status"];
			if(resp == 200 || resp == "success") {
				token = output["message"];
				token = JSON.stringify(token);
				localStorage.setItem("token", token);
				window.location = "/dashboard";
			}
			else {
				failureElement = document.createElement("div");
				failureElement.setAttribute("class", "btn-danger");
				// failureElement.setAttribute("href", "#signin");
				failureElement.innerHTML = "Invalid credentials";
				failureElement.style.padding = "8px";
				failureElement.style.margin = "6px";
				failureElement.style.display = "inline-block";
				// signupSubmit.innerHTML = "";
				signinLoading.style.display = "none";
				signinSubmit.appendChild(failureElement);

				setTimeout(() => {
					signinSubmitButton.style.display = "inline";
					failureElement.style.display = "none";
				}, 3000);
			}
		}
	}
	xhr.open('POST', '/api/tenant-login');
	xhr.setRequestHeader('Content-type', 'application/json');
	// xhttp.setRequestHeader('Access-Control-Request-Headers', 'content-type');
	// xhttp.setRequestHeader('Access-Control-Request-Method', 'POST');
	req = {
		"tenantEmailId": signinEmail.value,
		"tenantPassword": signinPassword.value
	}
	xhr.send(JSON.stringify(req));
}

function signup(event) {
	event.preventDefault();
	if (signupName.value == "") {
		alert("Please enter your name.");
		return;
	}
	if (signupEmail.value == "") {
		alert("Please enter your email ID.");
		return;
	}
	if (signupPassword.value == "") {
		alert("Please enter password.");
		return;
	}

	signupLoading.style.display = "inline";
	signupSubmitButton.style.display = "none";

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			output = xhr.responseText;
			output = JSON.parse(output);
			resp = output["status"];
			if(resp == 200 || resp == "success") {
				successElement = document.createElement("a");
				successElement.setAttribute("class", "btn btn-success submit");
				successElement.setAttribute("href", "#signin");
				successElement.innerHTML = "Signup success! Please log in.";
				// signupSubmit.innerHTML = "";
				signupLoading.style.display = "none";
				signupSubmit.appendChild(successElement);
			}
			else {
				;
			}
		}
	}
	xhr.open('POST', '/api/tenant-signup');
	xhr.setRequestHeader('Content-type', 'application/json');
	// xhttp.setRequestHeader('Access-Control-Request-Headers', 'content-type');
	// xhttp.setRequestHeader('Access-Control-Request-Method', 'POST');
	req = {
		"tenantName": signupName.value,
		"tenantEmailId": signupEmail.value,
		"tenantPassword": signupPassword.value
	}
	xhr.send(JSON.stringify(req));
}

function initElements() {
	signinEmail = document.getElementById("signin-email");
	signinPassword = document.getElementById("signin-password");
	signinSubmit = document.getElementById("signin-submit");
	signinLoading = document.getElementById("signin-loading");
	signinSubmitButton = document.getElementById("signin-submit-button");

	signupName = document.getElementById("signup-name");
	signupEmail = document.getElementById("signup-email");
	signupPassword = document.getElementById("signup-password");
	signupSubmit = document.getElementById("signup-submit");
	signupLoading = document.getElementById("signup-loading");
	signupSubmitButton = document.getElementById("signup-submit-button");
}

$(document).ready(function() {
	if (!(localStorage.getItem("token") === null)) {
		window.location = "/dashboard";
	}
	
	initElements();
});