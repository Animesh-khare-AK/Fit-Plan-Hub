# Fit Plan Hub - Client

## Project Overview

Fit Plan Hub is a fitness application designed to help users shape their ideal body with expert coaches and personalized plans.

## Styling Approach

The application utilizes a modular CSS architecture where styling is decoupled into component-specific files, ensuring maintainability and clear separation of concerns. A central global stylesheet defines core design tokens—such as color palettes and gradients—using CSS variables, allowing for consistent theming across the platform. Layouts are constructed using modern Flexbox and Grid systems to ensure responsiveness, while class naming conventions are strictly followed to prevent style leakage in the global scope. This approach balances the simplicity of standard CSS with the organizational benefits of a component-based structure.

### Global Variables & Theming

The file `App.css` defines global CSS variables in the `:root` pseudo-class. This allows colors and gradients to be reused across the entire application, making it easy to change the theme in one place.

### Component-Specific Files

Each React component has a dedicated CSS file located in the same folder (e.g., `Hero.jsx` imports `Hero.css`). These files are imported directly into the component.

### Layout & Responsiveness

The project relies heavily on Flexbox (`display: flex`) for layout structure. Media queries are used within these CSS files to handle responsiveness for mobile devices.

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview the production build
