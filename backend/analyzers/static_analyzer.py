import re

def detect_issues(code):
    issues = []

    if re.search(r'password\s*=\s*["\'].*["\']', code):
        issues.append({
            "type": "Hardcoded Secret",
            "severity": "High",
            "message": "Hardcoded password detected"
        })

    if re.search(r'(SELECT|INSERT|UPDATE|DELETE).*\+.*', code, re.IGNORECASE):
        issues.append({
            "type": "SQL Injection",
            "severity": "Critical",
            "message": "Possible SQL injection via string concatenation"
        })

    if "eval(" in code:
        issues.append({
            "type": "Unsafe Execution",
            "severity": "High",
            "message": "Use of eval() is dangerous"
        })

    return issues