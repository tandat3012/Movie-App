# 🎬 Movie Discovery App

A modern, feature-rich movie discovery application built with React and powered by The Movie Database (TMDB) API. Discover trending movies, search for your favorites, and build your personal watchlist with an intuitive and responsive interface.

## ✨ Features

### 🔍 **Movie Discovery**

-   Browse popular movies with advanced filtering and sorting
-   Real-time search with debounced input
-   Filter by genre and sort by popularity, rating, or release date
-   Pagination for smooth browsing experience

### 🎯 **Movie Details**

-   Comprehensive movie information including cast, crew, and production details
-   High-quality poster and backdrop images
-   Movie trailers and videos integration
-   Movie recommendations based on selected film
-   Budget, revenue, and production company information

### ❤️ **Personal Features**

-   Add/remove movies to/from favorites
-   Dedicated favorites page with easy management
-   Persistent favorites storage using Appwrite

### 📈 **Trending System**

-   Track most searched movies
-   Display trending movies based on user search patterns
-   Real-time search analytics

### 📱 **Modern UI/UX**

-   Responsive design that works on all devices
-   Dark theme with beautiful gradients
-   Smooth animations and transitions
-   Intuitive navigation with React Router

## 🛠️ Tech Stack

-   **Frontend**: React 19, React Router DOM
-   **Styling**: Custom CSS with Tailwind CSS integration
-   **API**: The Movie Database (TMDB) API
-   **Backend**: Appwrite (Database, Analytics)
-   **Icons**: Lucide React
-   **Build Tool**: Vite
-   **Linting**: ESLint with React-specific rules

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   TMDB API account
-   Appwrite account (optional, for favorites and trending features)

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd movie-app
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    ```bash
    cp .env.example .env
    ```

    Fill in your API keys:

    ```env
    # TMDB API Configuration
    VITE_TMDB_API_KEY=your_tmdb_api_key_here

    # Appwrite Configuration (optional)
    VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
    VITE_APPWRITE_DB_ID=your_database_id
    VITE_APPWRITE_COLLECTION_ID=your_trending_collection_id
    VITE_APPWRITE_FAVORITES_COLLECTION_ID=your_favorites_collection_id
    ```

4. **Get TMDB API Key**

    - Visit [The Movie Database](https://www.themoviedb.org/)
    - Create an account and go to Settings → API
    - Request an API key (it's free!)

5. **Set up Appwrite (Optional)**

    - Create a project at [Appwrite Cloud](https://cloud.appwrite.io/)
    - Create a database and two collections:
        - **Trending Collection** with attributes:
            - `searchTerm` (string)
            - `count` (integer)
            - `movie_id` (string)
            - `poster_URL` (string)
        - **Favorites Collection** with attributes:
            - `movie_id` (string)
            - `title` (string)
            - `poster_URL` (string)
            - `vote_average` (float)
            - `release_date` (string)
            - `overview` (string)
            - `created_at` (string)

6. **Start the development server**
    ```bash
    npm run dev
    ```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── LoadingSpinner/   # Loading indicator
│   ├── MovieCard/        # Movie display card
│   ├── Navigation/       # Main navigation
│   ├── Pagination/       # Page navigation
│   ├── Search/          # Search input component
│   └── TrendingMovie/   # Trending movies display
├── pages/               # Page components
│   ├── Home.jsx         # Main discovery page
│   ├── MovieDetail.jsx  # Individual movie details
│   └── Favorites.jsx    # User favorites page
├── appwrite.js          # Appwrite service functions
├── App.jsx              # Main app component with routing
├── App.css              # Global styles
└── main.jsx             # App entry point
```

## 🎨 Features in Detail

### Movie Discovery Page

-   **Search**: Real-time search with 500ms debounce
-   **Filters**: Genre selection and sorting options
-   **Pagination**: Navigate through thousands of movies
-   **Trending**: See what other users are searching for

### Movie Detail Page

-   **Comprehensive Info**: Plot, cast, crew, production details
-   **Media**: High-quality images and trailer integration
-   **Recommendations**: Discover similar movies
-   **Favorites**: One-click favorite management

### Favorites Management

-   **Personal Collection**: Save movies for later viewing
-   **Easy Management**: Add/remove with visual feedback
-   **Persistent Storage**: Favorites saved using Appwrite

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## 🌟 Advanced Features

### Search Analytics

The app tracks search patterns to show trending movies based on user behavior.

### Responsive Design

Fully responsive layout that adapts to:

-   Desktop (1200px+)
-   Tablet (768px - 1199px)
-   Mobile (< 768px)

### Performance Optimizations

-   Lazy loading for images
-   Debounced search inputs
-   Efficient pagination
-   Optimized API calls

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

-   [The Movie Database (TMDB)](https://www.themoviedb.org/) for the comprehensive movie API
-   [Appwrite](https://appwrite.io/) for backend services
-   [Lucide React](https://lucide.dev/) for beautiful icons
-   [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for the amazing development experience

## 📧 Contact

If you have any questions or suggestions, feel free to reach out or create an issue in the repository.

---

⭐ Don't forget to star this repository if you found it helpful!
