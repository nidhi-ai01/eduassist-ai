# 🎓 EduAssist AI

> **An AI-powered Engineering College Counsellor that helps students discover, compare, and explore engineering colleges in India using Google's Gemini AI.**

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)
![Gemini](https://img.shields.io/badge/Google-Gemini%202.5%20Flash-4285F4?logo=google)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)
![Python](https://img.shields.io/badge/Python-3.11-yellow?logo=python)
![License](https://img.shields.io/badge/License-MIT-green)

---

# 🌐 Live Demo

### 🚀 Frontend

**https://eduassist-ai-gamma.vercel.app**

### ⚡ Backend API

**https://eduassist-ai-backend.onrender.com**

### 📚 API Documentation (Swagger)

**https://eduassist-ai-backend.onrender.com/docs**

---

# 📖 About

Choosing the right engineering college is one of the most important decisions for students, yet the information is often scattered across multiple websites.

**EduAssist AI** simplifies this process by providing an AI-powered conversational assistant that answers questions about engineering colleges, compares institutions, explains admission processes, discusses placements, and recommends colleges based on a student's interests.

Powered by **Google Gemini 2.5 Flash**, the application delivers intelligent, natural-language responses through a modern chat interface built with Next.js and FastAPI.

---

# ✨ Features

- 🤖 AI-powered engineering college counsellor
- 🎓 College information and recommendations
- 📊 College comparison
- 💼 Placement insights
- 💰 Fee-related guidance
- 🏆 AI & Computer Science college recommendations
- 💬 Natural language conversations
- ⚡ Fast FastAPI backend
- 🌙 Beautiful modern UI
- 📱 Fully responsive design
- 🔗 REST API with Swagger documentation

---


# 🏗️ Tech Stack

## Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## Backend

- FastAPI
- Python
- Google Gemini 2.5 Flash
- Uvicorn

## AI

- Google Gemini API

## Deployment

- Vercel
- Render
- GitHub

---

# 📁 Project Structure

```
eduassist-ai
│
├── frontend
│   ├── app
│   ├── components
│   ├── hooks
│   ├── services
│   ├── public
│   └── package.json
│
├── backend
│   ├── agent
│   ├── config
│   ├── models
│   ├── services
│   ├── app.py
│   └── requirements.txt
│
├── data
├── dialogflow
├── docs
└── README.md
```

---

# 🚀 Running Locally

## 1. Clone the Repository

```bash
git clone https://github.com/nidhi-ai01/eduassist-ai.git

cd eduassist-ai
```

---

## 2. Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn app:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

## 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:3000
```

---

# 🔑 Environment Variables

## Backend

Create a `.env` file inside the **backend** folder.

```env
GEMINI_API_KEY=your_google_gemini_api_key
```

---

## Frontend

Create a `.env.local` file inside the **frontend** folder.

For Local Development

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

For Production

```env
NEXT_PUBLIC_API_URL=https://eduassist-ai-backend.onrender.com
```

---

# 💬 Example Questions

You can ask EduAssist AI questions like:

- Best AI colleges in India
- Compare IIT Hyderabad and IIIT Hyderabad
- Best engineering colleges under 10000 rank
- Highest placement engineering colleges
- Lowest fee engineering colleges
- Which IIT is best for AI?
- Tell me about IIT Hyderabad
- Best colleges for Computer Science
- AI colleges with lowest fees
- Which college has the best placements?
- Best engineering colleges in Telangana
- Compare NIT Trichy and IIT Madras

---

# 📡 API Endpoints

## Health Check

```
GET /
```

Response

```json
{
  "message": "EduAssist AI Backend Running"
}
```

---

## Chat Endpoint

```
POST /chat
```

Request

```json
{
  "message": "Best AI colleges in India"
}
```

Response

```json
{
  "reply": "IIT Hyderabad is widely regarded as one of the top institutions for Artificial Intelligence..."
}
```

---

# ⚙️ Deployment

## Frontend

- **Platform:** Vercel
- **Live URL:** https://eduassist-ai-gamma.vercel.app

## Backend

- **Platform:** Render
- **Live URL:** https://eduassist-ai-backend.onrender.com

---

# 🛣️ Future Enhancements

- 🔍 RAG-based retrieval using engineering college datasets
- 📚 FAISS vector database integration
- 🎤 Voice-based counselling
- 👤 User authentication
- ❤️ Chat history
- 🎯 Personalized college recommendations
- 📈 NIRF ranking integration
- 📝 JoSAA counselling support
- 📊 College cutoff prediction
- 🤖 Multi-agent AI counselling

---

# 👩‍💻 Author

**Nidhi Tiwari**

Artificial Intelligence & Data Science Engineer

### GitHub

https://github.com/nidhi-ai01

### LinkedIn

https://www.linkedin.com/in/nidhis13/

---

# ⭐ Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub.

It helps others discover the project and motivates further development.

---

## 📜 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and contribute.
