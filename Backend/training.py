
import numpy as np 
import pandas as pd
import mlflow
from sklearn.metrics import  accuracy_score, precision_score, recall_score, f1_score
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import pickle
from sklearn.ensemble import RandomForestClassifier
import os

path = "data/heart-disease-problem.csv"



models = {
         "Logistic Regression": LogisticRegression(), 
          "Random Forest": RandomForestClassifier() , 
          "log_ht" : LogisticRegression(solver ='liblinear', penalty = 'l2', C = 1.0 , tol = 1e-05, intercept_scaling = 2.0 ) , 
          "ran_ht" : RandomForestClassifier( n_estimators = 800,
                                              min_samples_split = 2,
                                              min_samples_leaf = 1,
                                              max_features = 'sqrt',
                                              max_depth= 20,
                                              bootstrap= False)  
}


def process():

    df = pd.read_csv("data/heart-disease-problem.csv")

    X = df.drop("target" , axis= 1 )
    y = df["target"]

    X = np.array(X)
    y = np.array(y)

    np.random.seed(42)
    X_train, X_test, y_train, y_test = train_test_split(X, 
                                                    y, 
                                                    test_size = 0.2,
                                                    )
    
    return (X_train, X_test, y_train, y_test )


def eval(X,y,model):

    y_pred = model.predict(X)
    
    return {
        'accuracy': accuracy_score(y, y_pred),
        'precision': precision_score(y, y_pred),
        'recall': recall_score(y, y_pred),
        'f1': f1_score(y, y_pred),
    }



def ml_logs_metrics(metrics,flag = True):

    if(flag == True):
        pre = "val_ "
    else:
        pre = "train_ "

    for name,val in metrics.items():

        met_name = pre + name
        mlflow.log_metric(met_name, val)


def ml_logs_params(params):

    for name,val in params.items():

        mlflow.log_param( name , val)



def fit_and_score():

    
    X_train, X_test, y_train, y_test = process()
    # Random seed for reproducible results
    np.random.seed(42)
    # Make a list to keep model scores
    model_scores = {}
    # Loop through models
    for name, model in models.items():
        # Fit the model to the data

        with mlflow.start_run():
        
            model.fit(X_train, y_train)
    
            # y_pred_train = model.predict(X_train)
            train_metrics = eval(X_train,y_train,model)
            ml_logs_metrics(train_metrics,flag = False)
            

            
            # y_pred_val = model.predict(X_test)
            val_metrics = eval(X_test,y_test,model)
            ml_logs_metrics(val_metrics)

            ml_logs_params(model.get_params())
            
            print("Model Name ",name )
            print(val_metrics)
            print()
            print()
    
            remote_server_uri= "https://dagshub.com/mb16biswas/fullstack_heart_discease_prediction_app.mlflow"
            mlflow.set_tracking_uri(remote_server_uri)

            mlflow.sklearn.log_model(model, name)   

            path = os.path.join("models",name + ".pkl")

            pickle.dump(model, open(path, "wb"))


            model_scores[name] = val_metrics["accuracy"]
    
            
    return model_scores


if __name__  == "__main__" :

    scores = fit_and_score()
    print(scores)





