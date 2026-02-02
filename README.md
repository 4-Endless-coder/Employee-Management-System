<div align="center">

# 👔 Employee Management System (EMS) 👔

<a href="https://readme-typing-svg.herokuapp.com">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&duration=4500&pause=1000&color=2563EB&background=FFFFFF00&center=true&width=700&lines=Streamline+Workforce+Management;Admin+%26+Employee+Dashboards;Real-time+Task+Tracking+%26+Analytics;Built+with+React+19+%26+Tailwind+v4" alt="Typing SVG - EMS" />
</a>

<br>

<p align="center">
  A robust and responsive <strong>Employee Management System</strong> designed to bridge the gap between administrators and employees. It features distinct dashboards for task assignment, status tracking, and performance analytics, all powered by a modern, high-performance tech stack.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 7" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind v4" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Lucide_Icons-F7DF1E?style=for-the-badge&logo=lucide&logoColor=black" alt="Lucide Icons" />
  <img src="https://img.shields.io/badge/Context_API-563D7C?style=for-the-badge&logo=react&logoColor=white" alt="Context API" />
</p>

</div>

---

## 🔐 Login Credentials (Demo)

Use these credentials to explore the different dashboards available in the system.

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@me.com` | `123` | **Full Control:** Assign tasks, view all employees. |
| **Employee** | `e1@e.com` | `123` | **Task View:** Accept, complete, or fail tasks. |
| **Employee** | `employee2@example.com` | `123` | **Task View:** Accept, complete, or fail tasks. |

---

## 🚀 Key Features

### 👨‍💼 For Admins
* **Task Assignment:** Create and assign tasks to specific employees with deadlines and categories.
* **Global Overview:** View a comprehensive list of all tasks and their current statuses (New, Active, Completed, Failed).
* **Employee Monitoring:** Track individual employee progress and performance stats.

### 👨‍💻 For Employees
* **Personalized Dashboard:** View assigned tasks with priority indicators.
* **Status Updates:** Mark tasks as "Accepted," "Completed," or "Failed" in real-time.
* **Performance Metrics:** See a summary of completed vs. failed tasks.

---

## 🛠️ Tech Stack

This project leverages the latest ecosystem standards for 2025:

* **Frontend Framework:** [React v19](https://react.dev/) (Latest Features)
* **Build Tool:** [Vite v7](https://vitejs.dev/) (Blazing Fast HMR)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Zero-runtime styling)
* **Animations:** [Framer Motion](https://www.framer.com/motion/) (Smooth UI transitions)
* **Icons:** [Lucide React](https://lucide.dev/) (Consistent icon set)
* **State Management:** React Context API
* **Persistence:** LocalStorage (Data persists on refresh)

---

## 📁 Repository Structure

```
├── 📁 public
│   ├── 🖼️ ems-icon.svg
│   └── 🖼️ vite.svg
├── 📁 src
│   ├── 📁 assets
│   │   └── 🖼️ react.svg
│   ├── 📁 components
│   │   ├── 📁 Auth
│   │   │   └── 📄 Login.jsx
│   │   ├── 📁 Dashboard
│   │   │   ├── 📄 AdminDashboard.jsx
│   │   │   └── 📄 EmployeeDashboard.jsx
│   │   └── 📁 TaskList
│   │       ├── 📄 AcceptTask.jsx
│   │       ├── 📄 CompleteTask.jsx
│   │       ├── 📄 FailedTask.jsx
│   │       ├── 📄 NewTask.jsx
│   │       └── 📄 TaskList.jsx
│   ├── 📁 context
│   │   └── 📄 AuthProvider.jsx
│   ├── 📁 other
│   │   ├── 📄 AllTask.jsx
│   │   ├── 📄 CreateTask.jsx
│   │   ├── 📄 Header.jsx
│   │   └── 📄 TaskListNumber.jsx
│   ├── 📁 pages
│   ├── 📁 utils
│   │   └── 📄 localStorage.jsx
│   ├── 🎨 App.css
│   ├── 📄 App.jsx
│   ├── 🎨 index.css
│   └── 📄 main.jsx
├── ⚙️ .gitignore
├── ⚙️ .prettierrc
├── 📝 README.md
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
└── 📄 vite.config.js
```
