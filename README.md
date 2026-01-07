# ✈️ SkyRoutes II

![Project Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![Nuxt.js](https://img.shields.io/badge/Nuxt.js-002E3B?style=for-the-badge&logo=nuxt.js&logoColor=00DC82)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

**SkyRoutes II** is a modern, high-performance web application designed for aviation enthusiasts and pilots. It facilitates the creation and management of flight plans between major national airports, visualizing routes in real-time on interactive maps.

> **Redesigned for 2026**: Now featuring a stunning Glassmorphism UI, adaptive Dark/Light modes, and a robust Nuxt 3 architecture.

---

## ✨ Key Features

- **🗺️ Interactive Route Planning**: Visualize flight paths, waypoints, and airport locations using **Vue Leaflet**.
- **🎨 Premium UI/UX**:
  - **Glassmorphism Design**: Sleek, translucent cards and modern aesthetics.
  - **Adaptive Theming**: Seamless switch between Dark Mode (professional, contrast-heavy) and Light Mode (clean, accessible).
  - **Fluid Animations**: Smooth transitions and responsive layout using **Tailwind CSS v4**.
- **🛠️ Robust Management**:
  - **Fleet Management**: CRUD operations for aircraft.
  - **User Roles**: distinct access for Administrators and Pilots.
- **⚡ High Performance**: Built on **Nuxt 3** with server-side API routes and **Prisma ORM** for efficient database operations.

---

## 🚀 Tech Stack

- **Frontend**: Vue 3, Nuxt 3, Tailwind CSS 4
- **Backend**: Nuxt Server Routes (Nitro), Prisma ORM
- **Database**: SQLite (Dev) / PostgreSQL (Production ready)
- **Mapping**: Leaflet.js
- **Tools**: Vite, PostCSS

---

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/LafuenteColoradoJose/SkyRoutesII.git
   cd SkyRoutesII
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. **Initialize Database**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` to take off! 🛫

---

## 📂 Project Structure

- **`/app`**: Core application logic (Pages, Components, Layouts).
- **`/server`**: Backend API routes and database interactions.
- **`/public`**: Static assets (Images, Icons).
- **`/prisma`**: Database schema and migrations.

---

## 👨‍💻 Author

**José Lafuente Colorado**
- [GitHub Profile](https://github.com/LafuenteColoradoJose)
- Full Stack Developer specializing in Vue/Nuxt & Modern Web Design.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
