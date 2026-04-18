import { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/scan/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setResult(data);
    } catch {
      alert("Backend error");
    }

    setLoading(false);
  };

  const getColor = (severity) => {
    if (severity === "Critical") return "#ff4d4d";
    if (severity === "High") return "#ff914d";
    if (severity === "Medium") return "#ffd84d";
    return "#4dff88";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #020617)",
        display: "flex",
        justifyContent: "center",
        paddingTop: "60px",
        color: "white",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: "900px", padding: "20px" }}>
        
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            textAlign: "center",
            marginBottom: "25px",
            background: "linear-gradient(90deg,#22c55e,#06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Cyber-G Security Scanner
        </motion.h1>

        {/* TEXTAREA */}
        <textarea
          rows="10"
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            background: "#020617",
            color: "white",
            border: "1px solid #1e293b",
            fontFamily: "monospace",
          }}
        />

        {/* BUTTON */}
        <div style={{ textAlign: "center" }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScan}
            style={{
              marginTop: "20px",
              padding: "10px 26px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(90deg,#22c55e,#06b6d4)",
              color: "white",
              cursor: "pointer",
            }}
          >
            {loading ? "Scanning..." : "Scan"}
          </motion.button>
        </div>

        {/* RESULTS */}
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginTop: "35px" }}
          >
            {/* SUMMARY */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <h3>
                Risk: <span style={{ color: "#ff4d4d" }}>{result.risk.level}</span>
              </h3>
              <p>Score: {result.risk.score}</p>
            </div>

            {/* 🔥 CODE DISPLAY WITH HIGHLIGHT */}
            <div
              style={{
                marginBottom: "25px",
                background: "#020617",
                padding: "15px",
                borderRadius: "10px",
                fontFamily: "monospace",
                fontSize: "13px",
              }}
            >
              {code.split("\n").map((line, index) => {
                const lineNumber = index + 1;

                const isIssue = result.issues.some(
                  (issue) => issue.line === lineNumber
                );

                return (
                  <div
                    key={index}
                    style={{
                      background: isIssue ? "rgba(255,0,0,0.2)" : "transparent",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    <span style={{ opacity: 0.5 }}>
                      {lineNumber}.
                    </span>{" "}
                    {line}
                  </div>
                );
              })}
            </div>

            {/* ISSUE CARDS */}
            {result.issues.map((issue, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "12px",
                  padding: "14px",
                  borderRadius: "10px",
                  background: "#020617",
                  borderLeft: `4px solid ${getColor(issue.severity)}`,
                }}
              >
                <h4>{issue.type}</h4>

                <p>{issue.message}</p>

                <p style={{ opacity: 0.6 }}>
                  Line: {issue.line}
                </p>

                <p>
                  <b>AI:</b> {issue.ai_explanation}
                </p>

                <p>
                  <b>Fix:</b> {issue.suggested_fix}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;