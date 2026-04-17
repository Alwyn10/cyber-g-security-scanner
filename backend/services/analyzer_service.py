from analyzers.static_analyzer import detect_issues
from services.risk_service import calculate_risk
from ai_engine.llm_engine import generate_explanation

def analyze_code(code):
    issues = detect_issues(code)

    # 🔥 THIS PART IS CRITICAL
    for issue in issues:
        ai_data = generate_explanation(issue, code)
        issue["ai_explanation"] = ai_data["explanation"]
        issue["suggested_fix"] = ai_data["fix"]

    risk = calculate_risk(issues)

    return {
        "issues": issues,
        "risk": risk
    }