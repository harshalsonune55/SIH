from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow Chrome extension requests

# Load trained model
clf = joblib.load("rf_model.pkl")
features = ['cnt_connections', 'failed_ratio', 'avg_status', 'domain_entropy', 'domain_age_days', 'ip_rep']

@app.route("/check", methods=["POST"])
def check():
    try:
        data = request.json
        # ensure all features exist
        X = pd.DataFrame([data])[features]
        score = clf.predict_proba(X)[0, 1]
        return jsonify({"score": float(score), "threat": score > 0.7})
    except Exception as e:
        # if something breaks, return JSON (not HTML)
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    # Run on port 9000 (make sure extension calls this port)
    app.run(host="0.0.0.0", port=9000)
