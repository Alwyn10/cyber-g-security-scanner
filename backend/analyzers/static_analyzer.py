import re

def detect_issues(code):
    issues = []
    lines = code.split("\n")

    for i, line in enumerate(lines, start=1):

        # Hardcoded password
        if re.search(r'password\s*=\s*["\'].*["\']', line):
            issues.append({
                "type": "Hardcoded Secret",
                "severity": "High",
                "message": "Hardcoded password detected",
                "line": i
            })

        # SQL Injection
        if re.search(r'(SELECT|INSERT|UPDATE|DELETE).*?\+.*', line, re.IGNORECASE):
            issues.append({
                "type": "SQL Injection",
                "severity": "Critical",
                "message": "Possible SQL injection via string concatenation",
                "line": i
            })

        # Unsafe eval
        if "eval(" in line:
            issues.append({
                "type": "Unsafe Execution",
                "severity": "High",
                "message": "Use of eval() is dangerous",
                "line": i
            })

    return issues