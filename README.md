git clone https://github.com/rakoon19# MANGO - Online Book Library

**MANGO** is a modern, full-stack web application designed for book enthusiasts to explore, discover, and manage their reading collections. It provides a seamless interface for browsing a curated selection of books and managing a personal "borrowed" list using localized state.

**Live URL:** [[https://mango-app.vercel.app](https://mango-app.vercel.app](https://mango-rosy.vercel.app/)) 

---

## 📖 Purpose
The purpose of Mango is to provide a user-friendly platform for digital library management. It focuses on clean UI/UX and robust authentication, allowing users to safely create accounts and keep track of books they are interested in borrowing.

---

## ✨ Key Features
*   **Secure Authentication:** Powered by **Better-Auth** with email and password credentials.
*   **Dynamic Book Exploration:** Browse through a library of books with detailed views for each title.
*   **Borrowing System:** A "My Borrows" dashboard that tracks borrowed books using `localStorage` for persistence.
*   **Responsive Design:** Fully optimized for mobile, tablet, and desktop views using **Tailwind CSS** and **DaisyUI**.
*   **Real-time Notifications:** Instant feedback for user actions (login, registration, borrowing, returning) via **React-Toastify**.
*   **Route Protection:** Secure pages that redirect unauthenticated users to the login screen.

---

## 🛠️ NPM Packages Used
The following major dependencies were used to build this project:

*   **Next.js:** The core React framework for server-side rendering and routing.
*   **Better-Auth:** For comprehensive authentication and session management.
*   **MongoDB:** Database for storing user accounts and session data.
*   **React Hook Form:** For efficient and performant form handling and validation.
*   **React-Toastify:** For elegant, non-blocking toast notifications.
*   **DaisyUI & Tailwind CSS:** For rapid styling and pre-built accessible components.
*   **Lucide React:** For high-quality, consistent UI icons.


## 📖 Purpose
The purpose of Mango is to provide a user-friendly platform for digital library management. It focuses on clean UI/UX and robust authentication, allowing users to safely create accounts and keep track of books they are interested in borrowing.


    BETTER_AUTH_SECRET=your_random_secret
    BETTER_AUTH_URL=http://localhost:3000
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
