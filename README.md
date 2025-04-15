```md
# 🌍 GoDigitAfrica Website

Welcome to the **official monorepo** for the [GoDigitAfrica](https://godigatafrica.com) platform – empowering digital transformation across Africa. This repository contains all the core services of the website:

- 🌐 **Django Backend** – RESTful API using Django and Django REST Framework
- 🤖 **AI Chatbot** – Node.js-based conversational assistant
- 🎨 **Frontend** – React app styled with Tailwind CSS

---

## 📁 Folder Structure

```
godigatafrica-website/
│
├── django_backend/       # Django + DRF API
├── chatbot/              # Node.js chatbot microservice
├── frontend/             # React + Tailwind frontend
├── railway.json          # Railway deployment config
├── .gitignore            # Ignore rules
└── README.md             # This file
```

---

## 🪴 Branching Strategy

We use a feature-based and service-based branching structure:

| Branch Name       | Purpose                                                |
|-------------------|--------------------------------------------------------|
| `main`            | Stable, production-ready code                          |
| `admin_dashboard` | Admin UI, analytics, or dashboard-specific features    |
| `django_backend`  | Backend logic (APIs, DB models, auth, REST endpoints)  |
| `node_backend`    | Node.js chatbot, middleware, microservices             |
| `frontend`        | React frontend development                             |

> ✅ **Use Pull Requests (PRs)** to propose changes into base branches.

---

## 🚀 Deployment (via Railway)

We use [Railway](https://railway.app/) for streamlined deployment:

| Service          | Deployed As             |
|------------------|-------------------------|
| Django Backend   | Python web service      |
| Node Chatbot     | Microservice (Node.js)  |
| Frontend         | Static build (Railway or Vercel) |

```json
// railway.json
{
  "services": [
    {
      "name": "django-backend",
      "sourceDir": "django_backend",
      "startCommand": "gunicorn godigatafrica.wsgi:application --bind 0.0.0.0:$PORT"
    },
    {
      "name": "chatbot",
      "sourceDir": "chatbot",
      "startCommand": "npm install && node index.js"
    },
    {
      "name": "frontend",
      "sourceDir": "frontend",
      "buildCommand": "npm install && npm run build",
      "startCommand": "npm run preview"
    }
  ]
}
```

---

## 🧠 Tech Stack

| Layer      | Tech Used                             |
|------------|----------------------------------------|
| Backend    | Django, Django REST Framework          |
| Chatbot    | Node.js, Express, TensorFlow.js/NLP.js |
| Frontend   | React, Tailwind CSS, Axios             |
| Deployment | Railway, Vercel                        |
| Versioning | Git + GitHub                           |

---

## 📦 Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/GDA-Developers-Hub/godigatafrica-website.git
cd godigatafrica-website
```

---

### 2. Django Backend

```bash
cd django_backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Visit: `http://localhost:8000`

---

### 3. Node.js Chatbot

```bash
cd chatbot
npm install
node index.js
```

Ensure `intents.json` and any model files are present in the `chatbot` directory.

---

### 4. React Frontend

```bash
cd frontend
npm install
npm run dev
```

Access via: `http://localhost:5173`

---

## 🔐 Environment Variables

### Django (`django_backend/.env`)
```env
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=*
DATABASE_URL=postgres://...
```

### Chatbot (`chatbot/.env`)
```env
PORT=3001
API_KEY=your_api_key_if_any
```

### Frontend (`frontend/.env.local`)
```env
VITE_API_URL=http://localhost:8000/api
VITE_CHATBOT_URL=http://localhost:3001
```

---

## 💬 AI Chatbot Overview

| File/Folder          | Description                           |
|----------------------|---------------------------------------|
| `index.js`           | Entry point, sets up Express server   |
| `intents.json`       | User intents and training data        |
| `routes/`            | API routes for chatbot interaction    |
| `utils/`             | NLP and response generation helpers   |
| `model/`             | (Optional) Model logic if using ML    |

> The chatbot is exposed as an API to integrate with the frontend chat widget.

---

## 📄 .gitignore

```gitignore
# Python
__pycache__/
*.py[cod]
*.sqlite3
*.log
venv/
.env

# Node.js
node_modules/
dist/
.env.local

# Django
static/
media/

# OS
.DS_Store
Thumbs.db
```

---

## 🤝 Contributing

We welcome contributions from the community! To contribute:

1. Fork the repo
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make changes and commit: `git commit -m 'feat: your message'`
4. Push to GitHub: `git push origin feature/your-feature`
5. Open a Pull Request into the appropriate base branch

---

## 📬 Contact & Support

For questions, support, or partnership:

- 📧 Email: developer@godigatafrica.com
- 🌐 Website: [https://godigatafrica.com](https://godigatafrica.com)

---

_© 2025 GoDigitAfrica. All rights reserved._
```