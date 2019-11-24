import json
import pymysql
import requests
from warnings import filterwarnings

meta = json.load(open("meta.json"))
filterwarnings('ignore', category=pymysql.Warning)

def predict(data, dataType, modelId):
	# request LoadBalancer for MLPredictor
	#TODO: change this
	requestData = {	
		"componentType": "MLPredictor",
		"tenantId": meta["TenantId"],
		"modelId": modelId
	}
	predictorIPAddress = requests.post("http://{}/request-instance".format(
            meta["IPAddresses"]["LoadBalancer"]), json=requestData).json()["IPAddress"]
	
	req = {
		"data": data,
		"dataType": dataType
	}

	# call the predict API
	resp = requests.post("http://{}/predict".format(predictorIPAddress), json=req).json()

	if resp["status"] != 200:
		return None
	if "results" not in resp.keys():
		return None
	return resp["results"]

def offloadToWorkerRole(route, data=None):
	# request LoadBalancer for WorkerRole
	requestData = {
		"componentType": "WorkerRole",
		"tenantId": meta["TenantId"]
	}
	workerRoleIPAddress = requests.post("http://{}/request-instance".format(
            meta["IPAddresses"]["LoadBalancer"]), json=requestData).json()["IPAddress"]

	# call the workerrole API
	if data is None:
		resp = requests.post("http://{}/{}".format(workerRoleIPAddress, route))
	else:
		resp = requests.post("http://{}/{}".format(workerRoleIPAddress, route), json=data)

	return resp
