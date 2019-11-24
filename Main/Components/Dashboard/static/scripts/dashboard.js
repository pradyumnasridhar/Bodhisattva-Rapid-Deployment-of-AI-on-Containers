healthDiv = null;
failedComponents = [];
numModelsDeployed = 0;
graphInstancesStats = null;
dataInstancesStats = [];

function fetchNumHits() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			output = xhr.responseText;
			output = JSON.parse(output);
			resp = output["status"];
			if(resp == 200 || resp == "success") {
				div = document.getElementById("num-hits");
				div.innerHTML = output["message"];
				setTimeout(() => {
					fetchNumHits();
				}, 2000);
			}
			else {
				;
			}
		}
	}
	xhr.open('POST', '/api/webapp-clicks');
	xhr.setRequestHeader('Content-type', 'application/json');
	req = {
		"tenantId": token["tenantId"]
	}
	xhr.send(JSON.stringify(req));
}

function fetchNumActiveUsers() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			output = xhr.responseText;
			output = JSON.parse(output);
			resp = output["status"];
			if(resp == 200 || resp == "success") {
				div = document.getElementById("num-active-users");
				div.innerHTML = output["message"];
				setTimeout(function() {
					fetchNumActiveUsers();
				}, 2000);
			}
			else {
				;
			}
		}
	}
	xhr.open('POST', '/api/active-users');
	xhr.setRequestHeader('Content-type', 'application/json');
	req = {
		"tenantId": token["tenantId"]
	}
	xhr.send(JSON.stringify(req));
}

function fetchNumModelsDeployed1() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			output = xhr.responseText;
			output = JSON.parse(output);
			resp = output["status"];
			if(resp == 200 || resp == "success") {
				numModelsDeployed = output["message"];
				fetchNumModelsDeployed2();		
			}
			else {
				;
			}
		}
	}
	xhr.open('POST', '/api/pre-trained-models-by-tenant');
	xhr.setRequestHeader('Content-type', 'application/json');
	req = {
		"tenantId": token["tenantId"]
	}
	xhr.send(JSON.stringify(req));
}

function fetchNumModelsDeployed2() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			output = xhr.responseText;
			output = JSON.parse(output);
			resp = output["status"];
			if(resp == 200 || resp == "success") {
				numModelsDeployed += output["message"];
				div = document.getElementById("num-models-deployed");
				div.innerHTML = numModelsDeployed;
				setTimeout(() => {
					fetchNumModelsDeployed1();
				}, 2000);
			}
			else {
				;
			}
		}
	}
	xhr.open('POST', '/api/tenant-trained-models-deployed');
	xhr.setRequestHeader('Content-type', 'application/json');
	req = {
		"tenantId": token["tenantId"]
	}
	xhr.send(JSON.stringify(req));
}

function fetchNumPredictions() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			output = xhr.responseText;
			output = JSON.parse(output);
			resp = output["status"];
			if(resp == 200 || resp == "success") {
				div = document.getElementById("num-predictions");
				div.innerHTML = output["message"];
				setTimeout(() => {
					fetchNumPredictions();
				}, 2000);
			}
			else {
				;
			}
		}
	}
	xhr.open('POST', '/api/total-predictions');
	xhr.setRequestHeader('Content-type', 'application/json');
	req = {
		"tenantId": token["tenantId"]
	}
	xhr.send(JSON.stringify(req));
}

function updateComponents() {
	console.log("updateComponents");

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			output = xhr.responseText;
			output = JSON.parse(output);
			resp = output["status"];
			if(resp == 200 || resp == "success") {
				results = output["message"];
				l = results.length;
				healthDiv.innerHTML = "";
				for (i=0; i<l; i++) {
					component = results[i];

					failureStatus = 0;
					if ($.inArray(component["ComponentId"], failedComponents) != -1) {
						failureStatus = 1;
					}

					confs = {
						"health": ["healthy", "dead"],
						"icon": ["check", "close"]
					}

					compDiv = document.createElement("div");
					compDiv.className = "col-md-3 component-div component-div-" + confs["health"][failureStatus];
					compDiv.id = "component-" + component["ComponentId"];
					h1 = document.createElement("h1");
					h1.className = "col-md-3";
					icon = document.createElement("i");
					icon.className = "fa fa-" + confs["icon"][failureStatus] + " health-status-icon " + confs["health"][failureStatus];
					h1.appendChild(icon);
					h3 = document.createElement("h3");
					h3.className = "col-md-9";
					h3.innerHTML = component["ComponentName"];
					compDiv.appendChild(h1);
					compDiv.appendChild(h3);

					healthDiv.appendChild(compDiv);
				}
				setTimeout(() => {
					updateFailedComponents();
				}, 2000);
			}
			else {
				;
			}
		}
	}
	xhr.open('POST', '/api/get-tenant-components');
	xhr.setRequestHeader('Content-type', 'application/json');
	req = {
		"tenantId": token["tenantId"]
	}
	xhr.send(JSON.stringify(req));
}

function updateFailedComponents() {
	console.log("updateFailedComponents");

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			output = xhr.responseText;
			output = JSON.parse(output);
			resp = output["status"];
			if(resp == "failed") {
				results = output["message"];
				l = results.length;
				failedComponents = [];
				for (i=0; i<l; i++) {
					component = results[i];
					failedComponents.push(component[0]);
				}
				// console.log(failedComponents);
			}
			else {
				;
			}
			updateComponents();
		}
	}
	xhr.open('POST', '/api/get-health');
	xhr.setRequestHeader('Content-type', 'application/json');
	req = {
		"token": token
	}
	xhr.send(JSON.stringify(req));
}

function initStatsGraph() {
	console.log("initStatsGraph");

	graphInstancesStats = Morris.Bar({
		element: 'graph-instances-stats',
		xkey: 'instance',
		ykeys: ['cpu', 'memory'],
		labels: ['CPU', 'Memory'],
		data: dataInstancesStats,
		barRatio: 0.4,
		barColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
		xLabelAngle: 20,
		hideHover: 'auto',
		resize: true
	});
	updateStatsGraph1();
}

function updateStatsGraph1() {
	console.log("updateStatsGraph1");

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			output = xhr.responseText;
			output = JSON.parse(output);
			resp = output["status"];
			if(resp == 200 || resp == "success") {
				data = output["message"];
				dataInstancesStats = [];
				for (var componentName in data) {
					t = {
						instance: componentName,
						cpu: data[componentName]["cpu"],
						memory: data[componentName]["memory"]
					};
					dataInstancesStats.push(t);
				}
				// console.log(dataInstancesStats);
				
				updateStatsGraph2();
			}
			else {
				;
			}
		}
	}
	xhr.open('POST', '/api/get-docker-stats');
	xhr.setRequestHeader('Content-type', 'application/json');
	// xhttp.setRequestHeader('Access-Control-Request-Headers', 'content-type');
	// xhttp.setRequestHeader('Access-Control-Request-Method', 'POST');
	req = {
		"tenantId": token["tenantId"],
		"componentType": "WebRole"
	}
	xhr.send(JSON.stringify(req));
}

function updateStatsGraph2() {
	console.log("updateStatsGraph2");

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			output = xhr.responseText;
			output = JSON.parse(output);
			resp = output["status"];
			if(resp == 200 || resp == "success") {
				data = output["message"];
				for (var componentName in data) {
					t = {
						instance: componentName,
						cpu: data[componentName]["cpu"],
						memory: data[componentName]["memory"]
					};
					dataInstancesStats.push(t);
				}
				// console.log(dataInstancesStats);

				updateStatsGraph3();
			}
			else {
				;
			}
		}
	}
	xhr.open('POST', '/api/get-docker-stats');
	xhr.setRequestHeader('Content-type', 'application/json');
	// xhttp.setRequestHeader('Access-Control-Request-Headers', 'content-type');
	// xhttp.setRequestHeader('Access-Control-Request-Method', 'POST');
	req = {
		"tenantId": token["tenantId"],
		"componentType": "WorkerRole"
	}
	xhr.send(JSON.stringify(req));
}

function updateStatsGraph3() {
	console.log("updateStatsGraph3");

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			output = xhr.responseText;
			output = JSON.parse(output);
			resp = output["status"];
			if(resp == 200 || resp == "success") {
				data = output["message"];
				for (var componentName in data) {
					t = {
						instance: componentName,
						cpu: data[componentName]["cpu"],
						memory: data[componentName]["memory"]
					};
					dataInstancesStats.push(t);
				}
				// console.log(dataInstancesStats);

				graphInstancesStats.setData(dataInstancesStats);

				setTimeout(function() {
					updateStatsGraph1();
				}, 2000);
			}
			else {
				;
			}
		}
	}
	xhr.open('POST', '/api/get-docker-stats');
	xhr.setRequestHeader('Content-type', 'application/json');
	// xhttp.setRequestHeader('Access-Control-Request-Headers', 'content-type');
	// xhttp.setRequestHeader('Access-Control-Request-Method', 'POST');
	req = {
		"tenantId": token["tenantId"],
		"componentType": "MLPredictor"
	}
	xhr.send(JSON.stringify(req));
}


function initElements() {
	healthDiv = document.getElementById("health-div");
}

$(document).ready(function() {
	initElements();
	
	fetchNumHits();
	fetchNumActiveUsers();
	fetchNumModelsDeployed1();
	fetchNumPredictions();

	updateFailedComponents();

	initStatsGraph();
});
