# 🔐 Cyber-G Security Scanner

An AI-assisted full-stack web application that detects security vulnerabilities in source code and highlights them visually.

---

## 🚀 Features

- 🔍 Detects:
  - Hardcoded secrets
  - SQL Injection risks
  - Unsafe execution (`eval`)
- 📊 Risk scoring system (Low → Critical)
- 🎯 Line-level vulnerability detection
- 🔥 Visual highlighting of vulnerable lines
- ⚡ Real-time scanning via API

---

## 🧠 How It Works

### Backend (Flask)
- Parses code line-by-line
- Uses regex-based static analysis
- Assigns severity levels
- Calculates overall risk score

### Frontend (React)
- Accepts user code input
- Displays detected issues
- Highlights vulnerable lines in real-time

---

## 🖥️ Tech Stack

- Frontend: React + Framer Motion
- Backend: Flask (Python)
- API: REST

---

## 📸 Demo

<img width="1899" height="971" alt="demo1" src="https://github.com/user-attachments/assets/7d6fc7ce-a9e3-4818-ba2b-7d4de9f3090b" />
<img width="1901" height="972" alt="demo2" src="https://github.com/user-attachments/assets/cdd237ee-0bb7-4f56-a3fc-1b01248039f2" />
<img width="1900" height="976" alt="demo3" src="https://github.com/user-attachments/assets/dfc6cd78-2034-462f-bd38-4f2fd866a980" />

---

## 🧩 Example

Input:
```python
password = "123"
query = "SELECT * FROM users WHERE id=" + user_id
