FROM python:3.9

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY ./models/Logistic_Regression.pkl ./models/Logistic_Regression.pkl 

COPY ./data/heart-disease-problem.csv ./data/heart-disease-problem.csv

ADD training.py .

ADD Server.py .

EXPOSE 8000

CMD ["python", "Server.py"]


#docker build -t back .
#docker run --name back_c -p 8000:8000 back

