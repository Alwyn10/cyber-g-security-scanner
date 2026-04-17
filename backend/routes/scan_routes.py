from flask import Blueprint, request, jsonify
from services.analyzer_service import analyze_code

scan_bp = Blueprint('scan', __name__)

@scan_bp.route('/', methods=['POST'])
def scan():
    data = request.get_json()
    code = data.get("code")

    result = analyze_code(code)

    return jsonify(result)