from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import pickle



load_clf = pickle.load(open('models/Logistic_Regression.pkl', 'rb'))


app = Flask(__name__)
CORS(app)

# print("version", sklearn.__version__)

df = pd.read_csv("data/heart-disease-problem.csv")
X = df.drop("target", axis=1)
data = []
colms = []

for col in X.columns:
    X[col].mean()
    colms.append(col)
    data.append({"col": col,
                 "mean":  X[col].mean()})



@app.route("/",  methods=["get"])
def send():
    return jsonify({"data": data})


@app.route("/accept", methods=["post"])
def accept():
    data = request.get_json()

    for i in range(len(data)):
        if(data[i] == ""):
            data[i] = df[colms[i]].mean()

    data = [[float(i) for i in data]]
    pred = load_clf.predict(data)
    pred = pred.tolist()
    return jsonify({"data": pred})


@app.route("/csv", methods=["post", "get"])
def csv_check():

    inp_col = []

    try:
        f = request.files["myFile"]

        dfx = pd.read_csv(f)

        if(dfx.isnull().sum().sum() > 0):
            dfx = dfx.fillna(df.mean())
        for col in dfx.columns:
            inp_col.append(col)
    except:
        return jsonify({"data": "wrong file type"})

    if(inp_col == colms):
        try:
            pred = load_clf.predict(dfx)
            pred = pred.tolist()
            return jsonify({"data": pred})

        except:

            return jsonify({"data": "eror occurs model cannot predict"})
    else:
        return jsonify({"data": "enter a valid csv file"})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)


#For runing Flask App (Method1)
# set FLASK_APP=Server.py
# flask run


#For runing Flask App (Method2)
# flask --app Server run


#For runing Flask App (Method3)
# python Server.py


#docker
#docker build -t back .
#docker run --name back_c -p 8000:8000 back

