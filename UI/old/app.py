from flask import Flask, render_template, url_for
import json
app = Flask(__name__)
 
data = ""
@app.route('/', methods=['GET', 'POST'])
def main():
    return render_template('index.html')

@app.route('/models', methods=['GET', 'POST'])
def main2():
    return render_template('models.html')

@app.route('/typesofmodels', methods=['GET', 'POST'])
def main3():
    return render_template('typesofmodels.html')

@app.route('/existingmodels', methods=['GET', 'POST'])
def main4():
    return render_template('existingmodels.html')

@app.route('/datainput', methods=['GET', 'POST'])
def main5():
    return render_template('datainput.html')

with open("hyperparameters.json") as file:
		data = json.load(file)
		print(data)
		
@app.route('/getjsondata', methods=['GET','POST'])
def main6():
	return render_template('hyperparameters.html')

@app.route('/gotjsondata',methods=['GET','POST'])
def main7():
	return render_template('starttraining.html')

			


if __name__ == "__main__":
    app.run(debug=True)


#with open("hyperparameters.json",'w') as file:
	#		d = json.loads(d)
	#		json.dump(d,file)
