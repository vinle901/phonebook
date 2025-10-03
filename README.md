# 📞 Phonebook Application Backend

[![Deployed on Render](https://img.shields.io/badge/Deployed-Render-blueviolet)](https://phonebook-ska9.onrender.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-Backend-black?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb)](https://mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red?logo=mongoose)](https://mongoosejs.com/)

## 🌐 Live Demo

👉 [View the deployed app on Render](https://phonebook-ska9.onrender.com/)

---

## 🚀 Features

- Add, update, and delete contacts
- Filter/search contacts by name
- Validate phone number and name length
- Error and success notifications
- Data persistence with MongoDB Atlas
- RESTful API with Express.js backend

---

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js, Mongoose, MongoDB Atlas
- **Frontend:** React, Axios, Vite (see frontend folder)
- **Deployment:** Render.com

---

## 📝 Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:vinle901/phonebook.git
cd phonebook
```

### 2. Set up environment variables

Create a `.env` file in the `backend` directory with your MongoDB URI:

```
MONGODB_URI=your_mongodb_connection_string
PORT=3001
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run locally

```bash
npm start
```

---

## 📦 Deployment

The app is deployed on Render:  
[https://phonebook-ska9.onrender.com/](https://phonebook-ska9.onrender.com/)

---

## 📚 Project Structure

```
backend/
├── models/
│   └── person.js
├── .env
├── index.js
├── package.json
└── ...
```

---

## 🙌 Credits

Created by [vinle901](https://github.com/vinle901)

---

