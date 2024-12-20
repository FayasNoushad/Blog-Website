# Blog Website

A blog website made with ReactJS as frontend and Python Flask as backend.

---

## Features

- ReactJS (Frontend): A multi-page blog website with a responsive design.
- Python Flask (Backend): A RESTful API for the frontend to interact with the database.
- MongoDB (Database): A NoSQL database to store the blog posts and user information.
- JWT (Authentication): JSON Web Tokens are used for user authentication.

---

## How to run?

#### Run backend

1. Go to the `backend` directory.
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python3 -m venv .venv
   ```
3. Activate the virtual environment:
   > linux command
   ```bash
   . ./.venv/bin/activate
   ```
4. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Run the following command:
   ```bash
   flask --app app.py run
   ```
6. The backend server will start running on `http://localhost:5000`.

#### Run frontend

1. Go to the `frontend` directory.
   ```bash
   cd frontend
   ```
2. Run the following command:
   ```bash
   npm run build
   ```
3. The frontend server will start running on `http://localhost:3000`.

---
