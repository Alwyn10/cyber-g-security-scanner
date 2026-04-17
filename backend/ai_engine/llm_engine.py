def generate_explanation(issue, code):
    if issue["type"] == "SQL Injection":
        return {
            "explanation": "User input is directly concatenated into a SQL query, which can allow attackers to manipulate the query.",
            "fix": "Use parameterized queries or prepared statements instead of string concatenation."
        }

    elif issue["type"] == "Hardcoded Secret":
        return {
            "explanation": "Hardcoding passwords in source code can expose sensitive data if the code is leaked.",
            "fix": "Store secrets in environment variables or secure vaults."
        }

    elif issue["type"] == "Unsafe Execution":
        return {
            "explanation": "Using eval() allows execution of arbitrary code, which is dangerous.",
            "fix": "Avoid eval() and use safer alternatives."
        }

    return {
        "explanation": "Potential issue detected.",
        "fix": "Review the code manually."
    }