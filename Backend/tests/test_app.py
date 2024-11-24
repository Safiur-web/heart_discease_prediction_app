import unittest
import json
import io
from Server import app, df, colms

class TestServer(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Create a test client
        cls.client = app.test_client()
        cls.client.testing = True

    def test_send_endpoint(self):
        """Test the `/` endpoint."""
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("data", data)
        self.assertEqual(len(data["data"]), len(colms))
        for item in data["data"]:
            self.assertIn("col", item)
            self.assertIn("mean", item)

    def test_accept_endpoint_valid_data(self):
        """Test the `/accept` endpoint with valid data."""
        input_data = [50, 1, 130, 200, 0, 0, 150, 0, 2.3, 0, 0, 1, 1]
        response = self.client.post(
            "/accept",
            data=json.dumps(input_data),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("data", data)
        self.assertIsInstance(data["data"], list)
        self.assertTrue(len(data["data"]) > 0)

    def test_accept_endpoint_missing_values(self):
        """Test the `/accept` endpoint with missing values."""
        input_data = [50, "", 130, "", 0, 0, "", 0, 2.3, "", "", 1, 1]
        response = self.client.post(
            "/accept",
            data=json.dumps(input_data),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("data", data)
        self.assertIsInstance(data["data"], list)

    def test_csv_endpoint_valid_file(self):
        """Test the `/csv` endpoint with a valid CSV file."""
        csv_data = io.StringIO(
            "age,sex,cp,trestbps,chol,fbs,restecg,thalach,exang,oldpeak,slope,ca,thal\n"
            "50,1,130,200,0,0,150,0,2.3,0,0,1,1\n"
            "60,1,140,220,0,0,160,0,3.0,1,0,2,2"
        )
        response = self.client.post(
            "/csv",
            data={"myFile": (csv_data, "test.csv")}
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("data", data)
        self.assertIsInstance(data["data"], list)

    def test_csv_endpoint_invalid_file(self):
        """Test the `/csv` endpoint with an invalid file."""
        invalid_file = io.BytesIO(b"Not a CSV content")
        response = self.client.post(
            "/csv",
            data={"myFile": (invalid_file, "test.txt")}
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["data"], "wrong file type")

    def test_csv_endpoint_invalid_columns(self):
        """Test the `/csv` endpoint with a CSV file having invalid columns."""
        csv_data = io.StringIO(
            "wrong_col1,wrong_col2,wrong_col3\n"
            "1,2,3\n"
            "4,5,6"
        )
        response = self.client.post(
            "/csv",
            data={"myFile": (csv_data, "test_invalid.csv")}
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["data"], "enter a valid csv file")

if __name__ == "__main__":
    unittest.main()
