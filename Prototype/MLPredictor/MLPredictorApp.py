import os
from warnings import filterwarnings
from flask import Flask, json, request, make_response, jsonify, current_app
import pandas as pd
# from sklearn.preprocessing import LabelEncoder
# from sklearn.model_selection import train_test_split
import pickle
from datetime import timedelta
from functools import update_wrapper

app = Flask(__name__)

model = None

def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, list):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, list):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            h['Access-Control-Allow-Credentials'] = "true"
            h['Content-Type'] = "application/json;charset=UTF-8"
            h['Content-type'] = "application/json;charset=UTF-8"
            if headers is not None:
                h['Access-Control-Allow-Headers'] = "GET,POST,OPTIONS,DELETE,PUT"
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator



@app.route('/', methods=["GET"])
# @app.route('/', methods=["GET", "OPTIONS"])
# @crossdomain(origin='*')
def hello_world():
	return 'This is the MLPredictor '


# @app.route('/loadmodel', methods=["GET"])
# def loadModel():
#     global model
#     # picklePath = request.json["picklePath"]
#     picklePath = "MLP_Iris.pkl"

#     with open(picklePath, "rb") as pkl:
#         model = pickle.load(pkl)

#     res = {"status": 200, "message": "Loaded model successfully"}

#     return jsonify(res)


picklePath = "MLP_Iris.pkl"
with open(picklePath, "rb") as pkl:
	model = pickle.load(pkl)

print(model)


@app.route('/predict', methods=["POST"])
# @app.route('/predict', methods=["POST", "OPTIONS"])
@crossdomain(origin='*')
def predict():
	newData = request.data
	newData = json.loads(newData)
	# newData = newData["data"]

	print(newData)
	
	if model == None:
		return jsonify({"status": 404, "message": "please load model before predicting"})

	res = model.predict(newData)

	print(res)

	resp = {"predictionOutput": list(res)}

	return jsonify(resp)


if __name__ == '__main__':
	app.run(debug=True, host='localhost', port=8383)
