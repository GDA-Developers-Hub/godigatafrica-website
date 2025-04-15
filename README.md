# GoDigitAfrica Website

This is the official monorepo for the **GoDigitAfrica** website. It includes:

- 🌐 `django_backend` – The Django-based backend powering the platform.
- 🤖 `chatbot` – A conversational AI module integrated into the website.
- 🎨 `frontend` – The user-facing interface, built with React.

---

## 🛠 Folder Structure

```
godigatafrica-website/
│
├── django_backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── godigatafrica/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── main/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   └── migrations/
│   └── ...
│
├── chatbot/
│   ├── __init__.py
│   ├── chatbot_main.py
│   ├── intents.json
│   ├── model/
│   │   ├── train.py
│   │   └── model.pkl
│   └── utils/
│       ├── preprocessing.py
│       └── response_generator.py
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
├── railway.json
├── .gitignore
└── README.md
```

---

## 🚀 Deployment

We use **[Railway](https://railway.app/)** to deploy our services:

- **Django Backend:** Hosted as a Python service
- **Chatbot:** Deployed as a microservice
- **Frontend:** Static build deployed via Railway or Vercel

> 💡 Use Railway's GitHub integration for automatic deployments.

---

## 📦 How to Run Locally

### 1. Backend

```bash
cd django_backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Access at: `http://127.0.0.1:8000`

---

### 2. Chatbot

```bash
cd chatbot
python chatbot_main.py
```

Make sure you have `intents.json` and a trained `model.pkl` inside `model/`.

---

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit: `http://localhost:5173`

---

## 🧪 Tech Stack

| Component  | Tech Used                    |
|------------|------------------------------|
| Backend    | Django, Django REST Framework|
| Chatbot    | Python, NLP, sklearn/spacy   |
| Frontend   | React, Tailwind CSS          |
| Deployment | Railway, Vercel              |
| Versioning | Git + GitHub                 |

---

## 🔐 Environment Variables

**Django** (`django_backend/.env`):

```
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=*
DATABASE_URL=postgres://...
```

**Chatbot** (`chatbot/.env` - optional)

**Frontend** (`frontend/.env.local`):

```
VITE_API_URL=http://localhost:8000/api
```

---

## 🧠 Chatbot Overview

- Training Data: `intents.json`
- Training Script: `model/train.py`
- Exported Model: `model/model.pkl`
- Integration: Use as REST API or Python module

---

## ⚙️ railway.json

```json
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
      "startCommand": "python chatbot_main.py"
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

## 🧾 .gitignore

```
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
build/
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

We welcome contributions! Here’s how to get started:

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📬 Contact

For support, collaboration, or bug reports:

- 📧 developer@godigatafrica.com
- 🌐 [https://godigatafrica.com](https://godigatafrica.com)

---

_© 2025 GoDigitAfrica. All rights reserved._
```