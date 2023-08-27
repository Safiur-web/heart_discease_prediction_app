# heart_discease_prediction_app

* Developed a comprehensive full-stack machine learning web application designed to predict occurrences of heart disease.
* Implemented an end-to-end heart disease classifier that encompasses three distinct machine learning models: KNeighborsClassifier, LogisticRegression, and RandomForestClassifier. The * most effective model was subsequently chosen for integration into the application's backend.
* Employed Mlflow to monitor and document the progression of machine learning experiments, enhancing the analysis of model performance and facilitating comparisons between different approaches.
* Ensured meticulous dataset versioning and management through the utilization of DVC (Data Version Control), contributing to the reproducibility and consistency of data preprocessing and model training procedures.
* To mitigate the common "works on my machine" dilemma that often arises due to variations in development environments, both the frontend and backend components were encapsulated within Docker containers.
    * The frontend was Dockerized, securing its dependencies and configurations within a containerized environment.
    * The backend was similarly Dockerized, providing an isolated environment tailored for the deployment of the heart disease classifier.

# Deployed Here
[Live Link](https://condescending-ritchie-ab03db.netlify.app/)

# Download the repository and install the required packages:

Clone this repo

For frontend 

1. `npm install`
2. `npm start`

For Backend

1. `cd Backend`
2. `pip3 install -r requirements.txt`
3. `python Server.py`


For Docker

* Frontend
  
     * Development
  
       docker build -t react .
           
       docker run --name react -p 3000:3000 react

     * Production
  
       docker build -t react_pro .
  
       docker run --name react_proc -p 3000:80 react_pro

* Backend
  
1. `docker build -t back .`
2. `docker run --name back_c -p 8000:8000 back`


<!--- https://user-images.githubusercontent.com/64213233/137638706-02a6f5cc-8f3e-49df-9c74-f1046f3bbe62.mp4 --->

# Demo 

https://user-images.githubusercontent.com/64213233/217737206-39bfe852-6787-48e4-a49b-dce71f4fbc26.mp4
