# todo-app
# 📋 Task Manager Application

A full-stack Task Management Application built using React and Django REST Framework.

## 🚀 Features

### Authentication

* User Registration
* Login using Username or Email
* JWT Authentication
* Protected Routes
* Change Password
* Forgot Password via Email

### Task Management

* Create Tasks
* Update Tasks
* Delete Tasks
* Mark Tasks as Completed/Pending
* Deadline Management

### Folder Management

* Create Folders
* Delete Folders
* Organize Tasks Folder-wise

### Profile Management

* View Profile
* Edit Username and Email
* Upload Profile Picture

### File Uploads

* Upload Attachments to Tasks
* Open Uploaded Files

### Dashboard

* Total Tasks Count
* Completed Tasks Count
* Pending Tasks Count
* Completion Percentage

## 🛠️ Technologies Used

### Frontend

* React
* React Router
* Axios
* CSS

### Backend

* Django
* Django REST Framework
* JWT Authentication
* SQLite

## 📂 Project Structure

```text
sample_project/
│
├── backend/
│   ├── accounts/
│   ├── todos/
│   └── backend/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── .gitignore
```

## ⚙️ Installation

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

## 🔐 Environment Variables

Create a `.env` file inside the backend folder:

```env
SECRET_KEY=your_secret_key

DEBUG=True

EMAIL_HOST_USER=your_email

EMAIL_HOST_PASSWORD=your_app_password
```

## 🎯 Learning Outcomes

* REST API Development
* JWT Authentication
* React State Management
* File Upload Handling
* Email Integration
* Profile Management
* Full Stack Development

## 👩‍💻 Author

Sreeja Arigela
