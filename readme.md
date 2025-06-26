# 🚀 Resume Builder

A modern, full-stack Resume Builder web application that empowers you to create, customize, and export professional resumes in minutes. Built with React, Express, MongoDB, and Tailwind CSS, it features beautiful templates, PDF export, and a seamless user experience.

---

## ✨ Features

- **User Authentication**: Secure login & registration
- **Step-by-Step Resume Builder**: Guided, multi-step form for all resume sections
- **Live Preview**: Instantly see your resume in multiple beautiful templates
- **Template Selection**: Choose from 3 modern, professionally designed templates
- **PDF Export**: Download your resume as a high-quality PDF
- **Responsive Design**: Works perfectly on desktop and mobile
- **Profile Management**: Save, edit, and manage multiple resumes
- **Dark Mode**: Eye-friendly dark theme support

---

## 🖥️ Tech Stack

- **Frontend**: [React](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [Lucide Icons](https://lucide.dev/)
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/)
- **PDF Generation**: [Puppeteer](https://pptr.dev/), [Handlebars](https://handlebarsjs.com/)
- **File Storage**: [ImageKit](https://imagekit.io/) (for PDF hosting)
- **Authentication**: JWT, Cookies
- **State Management**: Redux Toolkit

---

## 🚀 Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder
```

### 2. Setup the Backend

```sh
cd backend
npm install
# Create a .env file (see .env.example for required variables)
npm run dev
```

### 3. Setup the Frontend

```sh
cd ../frontend
npm install
# Create a .env file (see .env.example for required variables)
npm run dev
```

The frontend will be running at [http://localhost:5173](http://localhost:5173) and the backend at [http://localhost:3000](http://localhost:3000).

---

## 📝 Usage

1. **Register/Login** to your account.
2. **Create a new resume** from your profile or the home page.
3. **Fill out each section** (Personal Info, Skills, Experience, Projects, etc.).
4. **Preview your resume** in different templates.
5. **Download as PDF** or manage your resumes from your profile.

---

## 📂 Project Structure

```
backend/
  controllers/
  models/
  routes/
  templates/
  uploads/
  ...
frontend/
  src/
    components/
    pages/
    contexts/
    redux/
    App.jsx
    main.jsx
  public/
  ...
```

---

## 🌟 Credits

- UI Design: [shadcn/ui](https://ui.shadcn.com/)
- Icons: [Lucide](https://lucide.dev/)
- PDF Hosting: [ImageKit](https://imagekit.io/)
- Creator: [Mohd Fazal Ali](https://mohdfazalali.netlify.app/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

>