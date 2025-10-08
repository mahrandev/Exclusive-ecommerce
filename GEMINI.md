# GEMINI.md

## Project Overview

This is a React project bootstrapped with Vite. It's an e-commerce application named "Exclusive." The project uses Tailwind CSS for styling and includes routing with `react-router-dom`. It also has Zustand for state management and React Query for data fetching.

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

*   **Styling:** The project uses Tailwind CSS. Utility classes should be used for styling.
*   **Components:** Components are located in the `src/components` directory.
*   **State Management:** Zustand is used for global state management.
*   **Data Fetching:** React Query is used for fetching and caching data from the server.
*   **Routing:** `react-router-dom` is used for routing.
*   **Linting:** ESLint is configured to enforce code quality.
*   **Path Aliases:** The project uses path aliases to simplify imports. The following aliases are configured:
    *   `@/*`: `src/*`
    *   `@/components`: `src/components`
    *   `@/utils`: `src/lib/utils`
    *   `@/ui`: `src/components/ui`
    *   `@/lib`: `src/lib`
    *   `@/hooks`: `src/hooks`