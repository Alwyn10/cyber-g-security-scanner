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
        headers: { "Content-Type": "application/json" },
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
        alignItems: "flex-start",
        paddingTop: "60px",
        color: "white",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* CENTER CONTAINER */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          padding: "20px",
        }}
      >
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: "28px",
            marginBottom: "25px",
            textAlign: "center",
            background: "linear-gradient(90deg,#22c55e,#06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Cyber-G Security Scanner
        </motion.h1>

        {/* TEXTAREA */}
        <motion.textarea
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          rows="10"
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "white",
            fontSize: "14px",
          }}
        />

        {/* BUTTON */}
        <div style={{ textAlign: "center" }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScan}
            disabled={loading}
            style={{
              marginTop: "20px",
              padding: "10px 26px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(90deg,#22c55e,#06b6d4)",
              color: "white",
              fontWeight: "500",
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
                Risk:{" "}
                <span style={{ color: "#ff4d4d" }}>
                  {result.risk.level}
                </span>
              </h3>
              <p style={{ opacity: 0.7 }}>
                Score: {result.risk.score}
              </p>
            </div>

            {/* ISSUE CARDS */}
            {result.issues.map((issue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                style={{
                  marginBottom: "12px",
                  padding: "16px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderLeft: `4px solid ${getColor(issue.severity)}`,
                }}
              >
                <h4 style={{ marginBottom: "6px" }}>
                  {issue.type}
                </h4>

                <p style={{ fontSize: "13px", opacity: 0.8 }}>
                  {issue.message}
                </p>

                <p style={{ marginTop: "8px", fontSize: "13px" }}>
                  <b>AI:</b> {issue.ai_explanation}
                </p>

                <p style={{ fontSize: "13px" }}>
                  <b>Fix:</b> {issue.suggested_fix}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;