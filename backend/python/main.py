import numpy as np
from flask import Flask, request, jsonify
from keras.models import load_model
from PIL import Image
from io import BytesIO
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/get-predict-result": {"origins": "http://localhost:5173", "methods": ["POST"]}})

model = load_model("./models/alexnetmodel_v2.h5")

class_to_country = {
    0: "Brazil",
    1: "Canada",
    2: "Finland",
    3: "Japan",
    4: "United-Kingdom",
    5: "United_States",
}

def preprocess_image(image):    
    image = image.resize((227, 227))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

@app.route("/get-predict-result", methods=["POST"])
def get_predict_result():
    file = request.files["image"]
    img = Image.open(BytesIO(file.read()))
    img = preprocess_image(img)
    predictions = model.predict(img)
    predicted_class_index = np.argmax(predictions)
    predicted_country = class_to_country.get(predicted_class_index, "Unknown")
    return jsonify({"predicted_country": predicted_country})

if __name__ == "__main__":
    app.run(debug=True)