numPredictors = 1;
finalNumPredictors = 1;

$("#num-predictors").knob({
	change : function (value) {
		// console.log("change : " + Math.round(value));
		numPredictors = Math.round(value);
	}, // this is the change
});

function deployPredictors(event) {
	console.log("deployPredictors");
	event.preventDefault();

	if (numPredictors == 0) {
		alert("You cannot deploy 0 predictors!");
		return;
	}

	$(".deploypred-alert").each(function() {
		$(this).css("display", "none");
	});

	loading = document.getElementById("deploypred-loading");
	loading.style.display = "inline";

	finalNumPredictors = numPredictors;

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			output = xhr.responseText;
			output = JSON.parse(output);
			resp = output["status"];
			if(resp == 200 || resp == "success") {
				predCount = document.getElementById("predictor-count");
				predCount.innerHTML = finalNumPredictors.toString();

				modelIdSpan = document.getElementById("model-id");
				modelIdSpan.innerHTML = modelId.toString();

				deployPredsButton = document.getElementById("deploy-predictors-button");
				deployPredsButton.disabled = true;

				$(".deploypred-alert").each(function() {
					$(this).css("display", "none");
				});

				alertBox = document.getElementById("deploypred-alert-success");
				alertBox.style.display = "inline-block";
			}
			else {
				$(".deploypred-alert").each(function() {
					$(this).css("display", "none");
				});
				alertBox = document.getElementById("deploypred-alert-failure");
				alertBox.innerHTML = deployPredictorsFailureMessage + "<strong>" + output["message"] + "</strong>";
				alertBox.style.display = "inline-block";
			}
			loading.style.display = "none";
		}
	}
	xhr.open('POST', '/api/start-predictors');
	xhr.setRequestHeader('Content-type', 'application/json');
	req = {
		"token": token,
		"modelId": modelId,
		"numPredictors": finalNumPredictors
	}
	xhr.send(JSON.stringify(req));
}