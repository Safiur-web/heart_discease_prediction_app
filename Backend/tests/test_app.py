import os
import unittest
import json
import io
from Server import app  # Importing the Flask app

class TestServer(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """
        Set up the test client and required data for tests.
        """
        cls.client = app.test_client()  # Create a test client for the app

    def test_home_route(self):
        """
        Test the home route (`/`) to ensure it returns the expected response.
        """
        response = self.client.get("/")  # Send a GET request to the home route
        self.assertEqual(response.status_code, 200)  # Check if the response status is 200
        data = response.get_json()
        self.assertIn("data", data)  # Ensure the response contains the "data" key
        self.assertIsInstance(data["data"], list)  # Ensure "data" is a list

    def test_accept_endpoint_valid_data(self):
        """
        Test the `/accept` endpoint with valid data.
        """
        input_data = [63, 1, 145, 233, 1, 0, 150, 0, 2.3, 0, 0, 1, 1]
        response = self.client.post(
            "/accept",
            data=json.dumps(input_data),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("data", data)
        self.assertIsInstance(data["data"], list)  # Ensure prediction is a list

    def test_accept_endpoint_missing_values(self):
        """
        Test the `/accept` endpoint with missing values.
        """
        input_data = [63, "", 145, "", 1, 0, "", 0, 2.3, "", "", 1, 1]
        response = self.client.post(
            "/accept",
            data=json.dumps(input_data),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("data", data)
        self.assertIsInstance(data["data"], list)  # Ensure prediction is a list

    def test_csv_endpoint_valid_file(self):
        """
        Test the `/csv` endpoint with a valid CSV file.
        """
        csv_data = "age,sex,cp,trestbps,chol,fbs,restecg,thalach,exang,oldpeak,slope,ca,thal\n\
63,1,3,145,233,1,0,150,0,2.3,0,0,1\n"
        response = self.client.post(
            "/csv",
            data={"myFile": (io.BytesIO(csv_data.encode()), "test.csv")},
            content_type="multipart/form-data"
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("data", data)
        self.assertIsInstance(data["data"], list)  # Ensure prediction is a list

    def test_csv_endpoint_invalid_file(self):
        """
        Test the `/csv` endpoint with an invalid file type.
        """
        response = self.client.post(
            "/csv",
            data={"myFile": (io.BytesIO(b"invalid data"), "test.txt")},
            content_type="multipart/form-data"
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("data", data)
        self.assertEqual(data["data"], "wrong file type")  # Ensure proper error message

    def test_csv_endpoint_invalid_columns(self):
        """
        Test the `/csv` endpoint with a CSV file having invalid columns.
        """
        csv_data = "invalid_col1,invalid_col2\n1,2\n"
        response = self.client.post(
            "/csv",
            data={"myFile": (io.BytesIO(csv_data.encode()), "test_invalid.csv")},
            content_type="multipart/form-data"
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("data", data)
        self.assertEqual(data["data"], "enter a valid csv file")  # Ensure proper error message


if __name__ == "__main__":
    unittest.main()
