# Yoda AI - Pixel Art Assistant 

Yoda AI is a retro-inspired, pixel-perfect AI companion. It features a beautiful, subtle pastel UI with interactive retro games (Tic-Tac-Toe, Rock Paper Scissors, Memory Match) and a fully functional AI chat interface.

The AI is powered by the Groq Cloud API running Llama 3.3 70B, ensuring incredibly fast and intelligent responses.

Live Demo (Frontend): https://vermillion-starship-ba45b7.netlify.app/
Live API (Backend): https://yoda-pv0s.onrender.com/

---

## Features

-  AI Chat Interface: A sleek, retro-styled chat box that connects to a Python FastAPI backend.
-  Interactive Retro Games: Includes fully functional Tic-Tac-Toe, Rock Paper Scissors, and Memory Match games built with pure Vanilla JS.
-  Groq AI Integration: Powered by the Llama 3.3 70B model for fast, high-quality responses.
-  Pixel Art Aesthetic: Clean white backgrounds, soft pastel accents, and retro borders.
- Fully Responsive: Works perfectly on Desktop, Tablet, and Mobile devices.

---

## 🛠️ Tech Stack

### Frontend
- HTML5 & CSS3 (Custom properties & Flexbox/Grid)
- Vanilla JavaScript (ES6) - No frameworks like React or Vue.
- Font Awesome for icons.
- Google Fonts (Karla & Kaushan Script for the logo).
- Hosted on Netlify.

### Backend
- Python 3.12
- FastAPI (For handling API requests).
- Uvicorn (ASGI server).
- Requests (For making API calls to Groq).
- Uv (Fast Python package manager).
- Hosted on Render.

### AI Provider
- Groq Cloud API using the llama-3.3-70b-versatile model.

---

## 📂 Project Structure

AI_ASSISTANT/
├── .env                  # Environment variables (API Keys)
├── .gitignore            # Files ignored by Git
├── index.html            # The main Frontend file (HTML/CSS/JS)
├── main.py               # Python Backend (FastAPI + Groq)
├── Procfile              # Render start command
├── requirements.txt      # Python dependencies for Render
├── README.md             # Project documentation
└── robot.gif             # (Optional) Your pixel-art mascot GIF

---

## ⚙️ Local Setup & Installation

Follow these steps to run the project on your own computer:

### 1. Clone the Repository
git clone https://github.com/your-username/AI_ASSISTANT.git
cd AI_ASSISTANT

### 2. Set up the Python Backend
It is highly recommended to use Uv (which this project uses).

pip install uv
uv venv
uv pip install -r requirements.txt

(If you don't have uv, just use standard pip: pip install -r requirements.txt)

### 3. Set up Environment Variables
Create a .env file in the root directory and add your Groq API Key:

GROQ_API_KEY=gsk_your_api_key_here

### 4. Run the Backend Server
uvicorn main:app --host 0.0.0.0 --port 5000 --reload

(The server will run at http://127.0.0.1:5000)

### 5. Open the Frontend
Simply double-click the index.html file to open it in your browser. The chat will automatically connect to your running backend!

---

##  Deployment Guide

This project is designed to be deployed easily on Render (Backend) and Netlify (Frontend).

### Deploy Backend to Render
1. Push your code to a GitHub repository.
2. Create a new Web Service on Render.com and connect your GitHub repo.
3. Runtime: Python 3
4. Build Command: pip install -r requirements.txt
5. Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
6. Environment Variables: Add GROQ_API_KEY with your value.
7. Click Deploy. Render will give you a live URL (e.g., https://yoda-ai.onrender.com).

### Deploy Frontend to Netlify
1. In index.html, find the fetch() call inside the <script> tag.
2. Replace http://127.0.0.1:5000/chat with your live Render URL: https://yoda-pv0s.onrender.com/chat.
3. Commit and push the change to GitHub.
4. Go to Netlify.com, click Add New Site, and import your GitHub repository.
5. Netlify will automatically detect index.html and deploy it instantly!

---

## Contributing

Contributions are welcome! If you have ideas for new retro games, UI improvements, or features, feel free to fork the repository and submit a pull request.

---

##  License

This project is open source and available under the MIT License (LICENSE).

---

## Acknowledgments

- Groq Cloud for providing blazing fast, free AI inference.
- Render & Netlify for reliable free hosting.
- Font Awesome & Google Fonts for the beautiful design assets.
