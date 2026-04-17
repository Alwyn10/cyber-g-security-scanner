def calculate_risk(issues):
    score = 0

    severity_weights = {
        "Low": 1,
        "Medium": 2,
        "High": 3,
        "Critical": 5
    }

    for issue in issues:
        score += severity_weights.get(issue["severity"], 0)

    if score >= 8:
        level = "Critical"
    elif score >= 5:
        level = "High"
    elif score >= 3:
        level = "Medium"
    else:
        level = "Low"

    return {
        "score": score,
        "level": level
    }