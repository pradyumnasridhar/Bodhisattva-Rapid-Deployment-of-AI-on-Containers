graphUsersOverTime = null;
dataUsersOverTime = [];
graphInstancesActiveTime = null;
dataInstancesActiveTime = [];
// dataInstancesActiveTime = [{instance: "hi", time: 10}];
graphInstancesStats = null;
dataInstancesStats = [];
// dataInstancesStats = [{instance: "hi", cpu: 10, memory: 2.5}];

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
	// xhttp.setRequestHeader('Access-Control-Request-Headers', 'content-type');
	// xhttp.setRequestHeader('Access-Control-Request-Method', 'POST');
	req = {
		"tenantId": token["tenantId"]
	}
	xhr.send(JSON.stringify(req));
}

function initGraph1() {
	now = new Date().getTime();
	graphUsersOverTime = Morris.Line({
		element: 'graph-users-over-time',
		xkey: 'timestamp',
		ykeys: ['value'],
		labels: ['Count'],
		hideHover: 'auto',
		lineColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
		data: dataUsersOverTime,
		resize: true,
		smooth: false
	});
	setTimeout(function() {
		updateGraph1();
	}, 0000);
}

function initGraph2() {
	graphInstancesActiveTime = Morris.Bar({
		element: 'graph-instances-active-time',
		xkey: 'instance',
		ykeys: ['time'],
		labels: ['ActiveTime'],
		data: dataInstancesActiveTime,
		barRatio: 0.4,
		barColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
		xLabelAngle: 35,
		hideHover: 'auto',
		resize: true
	});
	setTimeout(function() {
		updateGraph21();
	}, 1000);
}

function initGraph3() {
	graphInstancesStats = Morris.Bar({
		element: 'graph-instances-stats',
		xkey: 'instance',
		ykeys: ['cpu', 'memory'],
		labels: ['CPU', 'Memory'],
		data: dataInstancesStats,
		barRatio: 0.4,
		barColors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
		xLabelAngle: 35,
		hideHover: 'auto',
		resize: true
	});
	setTimeout(function() {
		updateGraph31();
	}, 2000);
}

function updateGraph1() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			output = xhr.responseText;
			output = JSON.parse(output);
			resp = output["status"];
			if(resp == 200 || resp == "success") {
				div = document.getElementById("num-active-users");
				div.innerHTML = output["message"];

				now = new Date().getTime();
				newData = {
					timestamp: now,
					value: output["message"]
				};
				dataUsersOverTime.push(newData);
				if (dataUsersOverTime.length >= 20) {
					dataUsersOverTime.shift();
				}
				graphUsersOverTime.setData(dataUsersOverTime);
				setTimeout(function() {
					updateGraph1();
				}, 2000);
			}
			else {
				;
			}
		}
	}
	xhr.open('POST', '/api/active-users');
	xhr.setRequestHeader('Content-type', 'application/json');
	// xhttp.setRequestHeader('Access-Control-Request-Headers', 'content-type');
	// xhttp.setRequestHeader('Access-Control-Request-Method', 'POST');
	req = {
		"tenantId": token["tenantId"]
	}
	xhr.send(JSON.stringify(req));
}

function updateGraph21() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			output = xhr.responseText;
			output = JSON.parse(output);
			resp = output["status"];
			dataInstancesActiveTime = [];
			if(resp == 200 || resp == "success") {
				data = output["message"];
				l = data.length;
				for (var i=0; i<l; i++) {
					t = {
						instance: data[i]["ComponentName"],
						time: data[i]["ActiveTime"]
					};
					dataInstancesActiveTime.push(t);
				}
				// console.log(dataInstancesStats);
				
				updateGraph22();
			}
			else {
				;
			}
		}
	}
	xhr.open('POST', '/api/instances-active-time');
	xhr.setRequestHeader('Content-type', 'application/json');
	// xhttp.setRequestHeader('Access-Control-Request-Headers', 'content-type');
	// xhttp.setRequestHeader('Access-Control-Request-Method', 'POST');
	req = {
		"tenantId": token["tenantId"],
		"componentType": "WebRole"
	}
	xhr.send(JSON.stringify(req));
}

function updateGraph22() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			output = xhr.responseText;
			output = JSON.parse(output);
			resp = output["status"];
			if(resp == 200 || resp == "success") {
				data = output["message"];
				l = data.length;
				for (var i=0; i<l; i++) {
					t = {
						instance: data[i]["ComponentName"],
						time: data[i]["ActiveTime"]
					};
					dataInstancesActiveTime.push(t);
				}
				// console.log(dataInstancesStats);

				graphInstancesActiveTime.setData(dataInstancesActiveTime);

				setTimeout(function() {
					updateGraph21();
				}, 2000);
			}
			else {
				;
			}
		}
	}
	xhr.open('POST', '/api/instances-active-time');
	xhr.setRequestHeader('Content-type', 'application/json');
	// xhttp.setRequestHeader('Access-Control-Request-Headers', 'content-type');
	// xhttp.setRequestHeader('Access-Control-Request-Method', 'POST');
	req = {
		"tenantId": token["tenantId"],
		"componentType": "WorkerRole"
	}
	xhr.send(JSON.stringify(req));
}

function updateGraph31() {
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
				
				updateGraph32();
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

function updateGraph32() {
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
					updateGraph31();
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
		"componentType": "WorkerRole"
	}
	xhr.send(JSON.stringify(req));
}


$(document).ready(function() {
	fetchNumHits();
	initGraph1();
	initGraph2();
	initGraph3();
});
