# TMDB Movie Listing Frontend

A modern React application for searching movies, managing favorites, and sharing your movie collection with others. Built with React 19, TypeScript, and Tailwind CSS, powered by [The Movie Database (TMDB)](https://www.themoviedb.org/) API.

## Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite 7** - Lightning-fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Router 7** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Icons** - Icon library

## Prerequisites

- Node.js 18+
- npm or yarn
- A running instance of the [TMDB Movie Listing Backend](https://github.com/Ednaxx/tmdb-movie-listing-back-end)

## Installation

### Option 1: Local Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ednaxx/tmdb-movie-listing-front-end.git
   cd tmdb-movie-listing-front-end
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure the API endpoint**

   ```bash
   cp .env.template .env
   # Then edit the variables according to you environment.
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:3000`

### Option 2: Dev Container Setup

This project includes a dev container configuration for a consistent development environment.

1. **Prerequisites**
   - [Docker](https://www.docker.com/get-started)
   - [Visual Studio Code](https://code.visualstudio.com/)
   - [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

2. **Open in container**

   ```bash
   git clone https://github.com/Ednaxx/tmdb-movie-listing-front-end.git
   cd tmdb-movie-listing-front-end
   code .
   ```

3. **Reopen in container**

   When prompted by VS Code, click "Reopen in Container" or press `F1` and select "Dev Containers: Reopen in Container"

4. **Install dependencies**

   Once the container is built and running:

   ```bash
   npm install
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Access the application**

   The dev container automatically forwards port 3000, so you can access the app at `http://localhost:3000` from your host machine's browser.

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the production-ready application
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues
- `npm run lint:fix` - Automatically fix linting issues
- `npm run fmt` - Format code with Prettier

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Login/          # Login-specific components
│   └── shared/         # Shared components (Navbar, FormInput, etc.)
├── pages/              # Page components
│   ├── Login/          # Login page
│   ├── Signup/         # Signup page
│   ├── Movies/         # Movie search page
│   ├── Favorites/      # Favorites list page
│   └── SharedFavorites/# Public shared favorites page
├── services/           # API service layer
│   └── tmdb.ts        # TMDB API client
├── store/              # Zustand state management
│   ├── app.tsx        # App-wide state (axios instance)
│   ├── user.tsx       # User authentication state
│   └── favorites.tsx  # Favorites management state
├── types/              # TypeScript type definitions
│   └── tmdb.ts        # TMDB data types
├── App.css            # Global styles and Tailwind directives
├── main.tsx           # Application entry point
└── router.tsx         # Route configuration
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Icons by [React Icons](https://react-icons.github.io/react-icons/)
