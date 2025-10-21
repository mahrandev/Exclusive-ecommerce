# GEMINI.md

## Project Overview

This is a modern e-commerce application named "Exclusive," built with React and bootstrapped using Vite for a fast development experience. It leverages a robust set of technologies to deliver a responsive, scalable, and user-friendly online shopping platform.

## Key Technologies and Libraries

The project is built upon a modern JavaScript ecosystem, utilizing the following key technologies:

*   **Frontend Framework:** [React.js](https://react.dev/) (v19.1.1) - For building dynamic and interactive user interfaces.
*   **Build Tool:** [Vite](https://vitejs.dev/) (v7.1.7) - A next-generation frontend tooling that provides an extremely fast development server and optimized build process.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4.1.14) - A utility-first CSS framework for rapidly building custom designs.
*   **Routing:** [React Router DOM](https://reactrouter.com/en/main) (v7.9.3) - For declarative routing within the application.
*   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) (v5.0.8) - A small, fast, and scalable bearbones state-management solution.
*   **Data Fetching & Caching:** [@tanstack/react-query](https://tanstack.com/query/latest) (v5.90.2) - Powerful asynchronous state management for fetching, caching, and updating data.
*   **Authentication/Backend-as-a-Service:** [@supabase/supabase-js](https://supabase.com/) (v2.74.0) - Client library for interacting with Supabase services (e.g., authentication, database).
*   **Internationalization (i18n):** [i18next](https://www.i18next.com/) (v25.6.0) and [react-i18next](https://react.i18next.com/) (v16.1.0) - For supporting multiple languages.
*   **Form Management:** [React Hook Form](https://react-hook-form.com/) (v7.65.0) with [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers) and [Zod](https://zod.dev/) (v4.1.12) - For efficient and type-safe form validation.
*   **UI Components:** [Radix UI](https://www.radix-ui.com/) primitives (`@radix-ui/react-dropdown-menu`, `@radix-ui/react-label`, `@radix-ui/react-radio-group`, `@radix-ui/react-slot`) - Provides unstyled, accessible components.
*   **Icons:** [Lucide React](https://lucide.dev/) (v0.545.0) - A collection of beautiful and customizable SVG icons.
*   **Utility Libraries:**
    *   [clsx](https://github.com/lukeed/clsx) (v2.1.1) - A tiny (229B) utility for constructing `className` strings conditionally.
    *   [lodash](https://lodash.com/) (v4.17.21) - A modern JavaScript utility library delivering modularity, performance, & extras.
    *   [tailwind-merge](https://www.npmjs.com/package/tailwind-merge) (v3.3.1) - Merges Tailwind CSS classes without style conflicts.
*   **Other:**
    *   [sonner](https://sonner.emilkowalski.com/) (v2.0.7) - An opinionated toast component for React.
    *   [swiper](https://swiperjs.com/) (v12.0.2) - Modern touch slider.
    *   [react-spinners](https://www.davidhu.io/react-spinners/) (v0.17.0) - A collection of loading spinners.
    *   [qrcode.react](https://www.npmjs.com/package/qrcode.react) (v4.2.0) - QR code generator for React.

## Building and Running

### Prerequisites

*   Node.js and npm (or yarn/pnpm)

### Development

To run the development server:

```bash
npm run dev
```

### Build

To create a production build:

```bash
npm run build
```

### Lint

To run the linter:

```bash
npm run lint
```

### Preview

To preview the production build:

```bash
npm run preview
```

## Development Conventions

*   **Styling:** The project exclusively uses Tailwind CSS. Utility classes should be preferred for all styling needs, ensuring consistency and rapid development.
*   **Components:** Components are organized within the `src/components` directory, further categorized by feature or type for better maintainability.
*   **State Management:** Zustand is the chosen solution for global state management, offering a lightweight and flexible approach.
*   **Data Fetching:** React Query handles all data fetching, caching, synchronization, and server state management, providing a seamless user experience.
*   **Routing:** `react-router-dom` is used for all client-side routing, defining clear navigation paths and handling URL synchronization.
*   **Linting:** ESLint is configured to enforce strict code quality standards and consistency across the codebase.
*   **Path Aliases:** The project utilizes path aliases to simplify imports and improve code readability. The following aliases are configured:
    *   `@/*`: `src/*`
    *   `@/components`: `src/components`
    *   `@/utils`: `src/lib/utils` (Note: `src/utils` also exists for general utilities)
    *   `@/ui`: `src/components/ui`
    *   `@/lib`: `src/lib`
    *   `@/hooks`: `src/hooks`

## Project Structure

The `src` directory is the heart of the application, meticulously organized to promote modularity, reusability, and maintainability.

*   **`src/api`**: This directory contains dedicated modules for interacting with various backend API endpoints. Each file (e.g., `authApi.js`, `productsApi.js`) encapsulates the logic for a specific domain, making API calls organized and easy to manage.
*   **`src/assets`**: Stores all static assets required by the application.
    *   `src/assets/animation`: Intended for animation-related files.
    *   `src/assets/fonts`: Custom font files, categorized by font family (e.g., Cairo, Inter, Lato), ensuring consistent typography.
    *   `src/assets/img`: A collection of image files used throughout the UI.
*   **`src/components`**: The central hub for all reusable UI components. This directory is further subdivided to maintain a clear separation of concerns:
    *   `src/components/about`: Components specifically designed for the "About Us" page, such as `FeaturesSection` and `TeamSection`.
    *   `src/components/auth`: Authentication-related components, including `ProtectedRoute` for managing access to routes.
    *   `src/components/home`: Components tailored for the home page, like `CategorySidebar` and `ProductList`.
    *   `src/components/layout`: Structural components that define the overall layout of the application, such as `Header` and `Footer`.
    *   `src/components/shared`: Generic, highly reusable components that can be utilized across various parts of the application (e.g., `Breadcrumbs`, `ProductCard`, `SearchComponent`).
    *   `src/components/ui`: UI primitives and foundational components, often built using Radix UI and styled with Tailwind CSS (e.g., `button`, `input`, `dropdown-menu`).
*   **`src/data`**: Contains static or mock data, such as `categoryMapping.js` for category definitions and `products.json` for product listings, useful for development and initial setup.
*   **`src/hooks`**: A collection of custom React hooks that encapsulate reusable logic and stateful behavior, promoting cleaner and more functional components (e.g., `useCategories`, `useCountdown`, `useProductDetails`).
*   **`src/lib`**: Houses utility functions and configurations for third-party libraries.
    *   `src/lib/supabaseClient.js`: Dedicated file for initializing and configuring the Supabase client.
    *   `src/lib/utils.js`: General-purpose utility functions that don't fit into more specific categories.
*   **`src/locales`**: Manages internationalization resources. It contains subdirectories for each supported language (e.g., `ar` for Arabic, `en` for English), with `translation.json` files holding the respective translations.
*   **`src/pages`**: Contains the top-level page components, each representing a distinct view or route in the application (e.g., `HomePage`, `ProductDetailsPage`, `CartPage`, `LoginPage`).
*   **`src/routes`**: Defines the application's routing configuration. The `index.jsx` file in this directory is responsible for setting up all the routes using `react-router-dom`.
*   **`src/store`**: Contains Zustand stores for managing global application state. Each store (e.g., `authStore`, `cartStore`, `wishlistStore`) is responsible for a specific slice of the application's state.
*   **`src/utils`**: Additional utility functions that provide common functionalities, such as `recentlyViewed.js` for managing recently viewed products.

## Project Strengths

*   **Modular and Scalable Architecture:** The clear separation of concerns across `api`, `components`, `hooks`, `pages`, and `store` directories makes the codebase easy to understand, maintain, and scale.
*   **Efficient State Management:** The combination of Zustand for global state and React Query for server state provides a highly optimized and performant state management solution.
*   **Modern Tooling:** Leveraging Vite for development and build processes ensures fast iteration cycles and optimized production bundles.
*   **Responsive and Consistent UI:** Tailwind CSS enables rapid UI development with a consistent design system, ensuring the application looks great on all devices.
*   **Robust Routing:** `react-router-dom` provides a powerful and flexible routing solution for single-page applications.
*   **Internationalization Support:** Built-in support for multiple languages via `i18next` makes the application accessible to a wider audience.
*   **Type-Safe Forms:** Integration with React Hook Form and Zod ensures robust and type-safe form handling and validation.
*   **Backend-as-a-Service Integration:** Supabase integration simplifies backend operations like authentication and database interactions.

## Page Linking and Routing

The application utilizes `react-router-dom` for declarative client-side routing, enabling seamless navigation between different views without full page reloads.

*   **Centralized Route Configuration:** All application routes are defined in `src/routes/index.jsx`. This centralized approach makes it easy to manage, understand, and modify the application's navigation flow.
*   **Route Definitions:** Each route typically maps a URL path to a specific page component (e.g., `/products/:id` maps to `ProductDetailsPage`).
*   **Navigation:**
    *   **`Link` Component:** For internal navigation within the application, the `<Link>` component from `react-router-dom` is used. This prevents full page reloads and maintains the single-page application experience.
    *   **`useNavigate` Hook:** Programmatic navigation (e.g., after a form submission or successful login) is handled using the `useNavigate` hook, allowing redirection to different routes.
*   **Nested Routes:** The routing setup supports nested routes, allowing for complex UI layouts where parts of the page change based on sub-routes (e.g., user account settings with sub-sections).
*   **Protected Routes:** The `src/components/auth/ProtectedRoute.jsx` component is used to guard routes that require user authentication, ensuring that only authorized users can access specific parts of the application. This is typically achieved by checking the authentication state (managed by `authStore`) before rendering the target component.

This organized routing strategy ensures a smooth and intuitive user experience while providing a clear and maintainable structure for developers.