# Exclusive Ecommerce

[](https://react.dev/)
[](https://vitejs.dev/)
[](https://supabase.io/)
[](https://tailwindcss.com/)
[](https://tanstack.com/query/v5)

## 📖 Overview

**Exclusive Ecommerce** is a modern, full-stack e-commerce project built with `React` for the frontend and `Supabase` as an integrated Backend-as-a-Service (BaaS). The project aims to provide a seamless and secure shopping experience, focusing on high performance and a scalable architecture.

## ✨ Key Features

Based on the database architecture, the application provides the following core features:

  * **Integrated User Authentication:**

      * Relies entirely on the built-in `Supabase Authentication` system.
      * New account creation (`signUp`).
      * User login (`signIn`).
      * User session management (`getUser`).

  * **Product Catalog:**

      * Displays all available products in the store.
      * Product details (name, price, image, rating, etc.).

  * **Wishlist Feature:**

      * Add and remove products from a user's personal wishlist.
      * **Fully Secured:** Utilizes Supabase Row Level Security (RLS) policies. No user can view or modify another user's wishlist (strict enforcement of `auth.uid() = user_id`).

  * **Orders & Checkout System:**

      * Professional two-table design (`orders` and `order_items`) to ensure accurate record-keeping.
      * Stores general order information (total price, shipping address, status).
      * Stores details for each product within an order (quantity, price at purchase).
      * **Fully Secured:** Users can only view and create their own orders and cannot access anyone else's, thanks to RLS policies.

## 🛠️ Tech Stack

This project leverages a modern tech stack to ensure the best performance and developer experience (based on `package.json`):

  * **Frontend:**

      * **React 19:** For building interactive user interfaces.
      * **Vite:** A blazing-fast build tool and development server.
      * **React Router (v7):** For client-side routing and navigation.

  * **Backend & Data:**

      * **Supabase (v2):** The integrated BaaS for managing:
          * Database (PostgreSQL).
          * Authentication.
          * Row Level Security (RLS).
      * **React Query (v5):** For server state management, data fetching, and caching.

  * **State Management:**

      * **Zustand:** A simple and effective global client-side state management solution.

  * **UI & Styling:**

      * **TailwindCSS (v4):** A utility-first CSS framework for rapid UI development.
      * **Radix UI:** For accessible, unstyled UI components.
      * **Lucide React:** A modern and clean icon set.
      * **Sonner:** For displaying toasts/notifications.
      * **Swiper:** For creating sliders and carousels.

  * **Forms:**

      * **React Hook Form (v7):** For efficient and flexible form management.
      * **Zod:** For schema-based validation of form inputs.

  * **Internationalization (i18n):**

      * **i18next** & **react-i18next**: To support multiple languages (e.g., Arabic and English) in the application.

## 🚀 Getting Started

To run a local copy of this project, follow these steps:

1.  **Clone the repo:**

    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd exclusive-ecommerce
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the project root and add your Supabase keys:

    ```env
    VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

    *(You can find these in your Supabase Dashboard \> Project Settings \> API)*

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

5.  Open [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) (or the port specified by Vite) in your browser.

## 📜 Available Scripts

Inside `package.json`, you can use the following scripts:

  * `npm run dev`: Runs the app in development mode with hot reload.
  * `npm run build`: Builds the app for production.
  * `npm run lint`: Runs ESLint to check for code errors and style issues.
  * `npm run preview`: Serves the production build locally for preview.

-----
