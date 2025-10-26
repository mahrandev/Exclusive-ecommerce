# Exclusive E-commerce

<div align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7.1-purple?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Supabase-2.7-green?logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.1-blueviolet?logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React_Query-5.9-orange?logo=react-query" alt="React Query" />
</div>

## 📖 Overview

**Exclusive** is a modern, responsive, and full-stack e-commerce application built with **React** and bootstrapped with **Vite** for an exceptional development experience. It leverages **Supabase** for backend services, including authentication and database management, to provide a seamless, secure, and scalable online shopping platform.

## ✨ Key Features

- **User Authentication:** Secure sign-up, sign-in, and session management.
- **Product Catalog:** Browse products by categories, sales, and new arrivals.
- **Detailed Product Pages:** View product details, image galleries, specifications, and user reviews.
- **Search Functionality:** Easily search for products across the store.
- **Shopping Cart:** Add, remove, and manage products in the cart.
- **Wishlist:** Save favorite products for later.
- **Secure Checkout:** A streamlined and secure checkout process.
- **Account Management:** Users can view their profile and manage their account details.
- **Multi-language Support:** Internationalization for English and Arabic.
- **Responsive Design:** A great user experience on any device—desktop, tablet, or mobile.

## 🛠️ Tech Stack

This project leverages a modern tech stack to ensure the best performance and developer experience:

- **Frontend Framework:** [React.js](https://react.dev/) (v19)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router DOM](https://reactrouter.com/en/main)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) (for client state)
- **Data Fetching & Caching:** [@tanstack/react-query](https://tanstack.com/query/latest) (for server state)
- **Backend-as-a-Service:** [@supabase/supabase-js](https://supabase.com/) (Authentication & PostgreSQL Database)
- **Internationalization (i18n):** [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation.
- **UI Components:** [Radix UI](https://www.radix-ui.com/) primitives.
- **Icons:** [Lucide React](https://lucide.dev/)
- **Toasts/Notifications:** [Sonner](https://sonner.emilkowalski.com/)
- **Sliders/Carousels:** [Swiper](https://swiperjs.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js and npm (or yarn/pnpm)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mahrandev/Exclusive-ecommerce.git
    cd Exclusive-ecommerce
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the project root and add your Supabase keys. You can find these in your Supabase Dashboard under `Project Settings > API`.
    ```env
    VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the port specified by Vite).

## 📜 Available Scripts

- `npm run dev`: Starts the development server with hot-reloading.
- `npm run build`: Creates a production-ready build of the application.
- `npm run lint`: Lints the codebase using ESLint to ensure code quality.
- `npm run preview`: Serves the production build locally for preview.

## 📁 Project Structure

The `src` directory is organized to promote modularity, reusability, and maintainability.

- **`src/api`**: Modules for interacting with backend API endpoints (e.g., `authApi.js`, `productsApi.js`).
- **`src/assets`**: Static assets like images and fonts.
- **`src/components`**: Reusable UI components, subdivided by feature (`home`, `product`, `auth`) or type (`layout`, `shared`, `ui`).
- **`src/hooks`**: Custom React hooks for reusable logic (e.g., `useProducts`, `useCategories`).
- **`src/lib`**: Utility functions and third-party library configurations, including the Supabase client.
- **`src/locales`**: Translation files for internationalization (i18n).
- **`src/pages`**: Top-level page components, each representing a route (e.g., `HomePage`, `CartPage`).
- **`src/routes`**: Centralized routing configuration for the application.
- **`src/store`**: Zustand stores for global state management (e.g., `cartStore`, `authStore`).
- **`src/utils`**: Additional general-purpose utility functions.

## 📝 Development Conventions

- **Styling:** The project exclusively uses **Tailwind CSS** for all styling needs.
- **State Management:** **Zustand** is used for global client-side state, while **React Query** manages all server state, caching, and data fetching.
- **Routing:** All client-side routing is handled by **`react-router-dom`** in a centralized configuration.
- **Linting:** **ESLint** is configured to enforce strict code quality and consistency.
- **Path Aliases:** Pre-configured path aliases (`@/components`, `@/hooks`, etc.) are used to simplify import statements.