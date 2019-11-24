/* token = {
	"tenantId": 2,
	"encrypted": 2,
	"tenantName": "ppp"
}; */
token = JSON.parse(localStorage.getItem("token"));
tenantId = token["tenantId"];
tenantName = token["tenantName"];

// tenantId = 2;
// tenantId = localStorage.getItem("tenantId");	// TODO: uncomment this after implementing login
// tenantName = "Shreyas Rao";
// tenantName = localStorage.getItem("tenantName");	// TODO: uncomment this after implementing login

function logout(event) {
	event.preventDefault();

	localStorage.removeItem("token");
	window.location = "/";
}

$(document).ready(function() {
	;
});