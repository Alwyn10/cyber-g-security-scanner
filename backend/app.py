from flask import Flask
from flask_cors import CORS
from routes.scan_routes import scan_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(scan_bp, url_prefix='/scan')

if __name__ == "__main__":
    app.run(debug=True)