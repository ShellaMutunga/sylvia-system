# Sylvia Farm ERP System

A modern farm management enterprise resource planning (ERP) system built with **Laravel 12** (backend) and **React 19** (frontend).

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Commands](#available-commands)
- [Database](#database)
- [Development Team](#development-team)

## 🎯 Project Overview

Sylvia is a comprehensive farm management system designed to streamline agricultural operations including:
- Farm operations and resource management
- Crop and livestock tracking
- Inventory management
- Financial reporting
- User management and authentication

### Tech Stack
- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React 19 with Vite
- **Database**: MySQL 5.7+
- **Styling**: Tailwind CSS
- **Package Manager**: Composer (backend), npm (frontend)

## ✅ Prerequisites

Before running the application, ensure you have the following installed:

- **PHP** >= 8.2
- **Composer** >= 2.0
- **Node.js** >= 18.0
- **npm** >= 9.0
- **MySQL** >= 5.7 (or MariaDB >= 10.2)

### Check Installation
```bash
php -v          # Check PHP version
composer --version  # Check Composer version
node -v         # Check Node.js version
npm -v          # Check npm version
```

## 📦 Installation

### 1. Backend Setup (Laravel)

Navigate to the backend directory and install dependencies:

```bash
cd backend
composer install
```

Create environment file from example:
```bash
cp .env.example .env
```

Generate application key:
```bash
php artisan key:generate
```

Configure MySQL connection in `.env`:
```bash
# Edit the following in backend/.env:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sylvia_farm
DB_USERNAME=root
DB_PASSWORD=your_password
```

Create MySQL database:
```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS sylvia_farm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

Run migrations to set up database tables:
```bash
php artisan migrate
```

### 2. Frontend Setup (React)

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

## 🚀 Running the Application

### Option 1: Run Both Servers Simultaneously (Recommended)

From the backend directory, use the combined dev script:

```bash
cd backend
composer run dev
```

This will start:
- **Laravel Server**: http://localhost:8000
- **Vite Dev Server**: http://localhost:5173
- **Queue Listener**: For background jobs
- **Logs Viewer**: Real-time logs with Pail

### Option 2: Run Servers Separately

**Terminal 1 - Start Laravel Server:**
```bash
cd backend
php artisan serve
```
Backend available at: http://localhost:8000

**Terminal 2 - Start React Dev Server:**
```bash
cd frontend
npm run dev
```
Frontend available at: http://localhost:5173

## 📁 Project Structure

```
sylvia-system/
├── backend/                    # Laravel application
│   ├── app/                    # Application code
│   │   ├── Http/              # Controllers, Requests, Middleware
│   │   ├── Models/            # Database models
│   │   └── Providers/         # Service providers
│   ├── bootstrap/             # Bootstrap files
│   ├── config/                # Configuration files
│   ├── database/
│   │   ├── migrations/        # Database migrations
│   │   ├── factories/         # Model factories
│   │   ├── seeders/          # Database seeders
│   │   └── database.sqlite    # SQLite database
│   ├── resources/             # Views and assets
│   ├── routes/                # Route definitions
│   ├── storage/               # Application storage
│   ├── tests/                 # Test files
│   ├── composer.json          # PHP dependencies
│   ├── artisan                # Laravel CLI
│   └── vite.config.js         # Vite config for assets
│
└── frontend/                   # React application
    ├── src/
    │   ├── App.jsx            # Main App component + Dashboard
    │   ├── index.css          # Global styles (Tailwind v4)
    │   ├── main.jsx           # React entry point
    │   ├── components/        # React components
    │   └── pages/             # Page components (Login, etc.)
    ├── public/                # Public assets
    ├── index.html             # HTML template
    ├── package.json           # Node.js dependencies
    ├── vite.config.js         # Vite configuration
    └── eslint.config.js       # ESLint rules
```

## 🎨 Frontend Features (April 9, 2026)

### Splash Screen
- Forest Green (#024D30) background
- Mint Green (#4ade80) bouncing Sprout icon
- White divider line with "Welcome to Redhill Farm" text
- "~by Sylvia Karebe" signature in gold
- Auto-navigates to login after 3.5 seconds

### Login Page
- Split layout: Farm image (left) + Login form (right)
- Light green overlay on image
- Farm branding with "Redhill Farm" and "Farm Management System"
- Sylvia logo integration
- Pre-filled credentials: sylvia@redhill.com / password

### Dashboard (ERP Interface)
- **Navigation**: Top bar with "REDHILL FARM" title and Sun/Moon dark/light toggle
- **Category Cards** (5 cards with glassmorphism + glow effects):
  - Dashboard: Solid Vibrant Blue (#2563EB)
  - Operations: Deep Forest Green (#024D30)
  - Sales & Orders: Royal Purple (#7C3AED)
  - Employees: Burnt Orange (#EA580C)
  - Accounting: Sharp Teal (#0D9488)
- **Data Panels**: Two vertical bar charts
  - Food Levels (kg) with green gradient
  - Water Levels (L) with blue gradient
- **Dark/Light Mode**: Toggle switches background between charcoal (#121212) and white (#f5f5f5)

### Dependencies Installed
- react-router-dom (routing)
- framer-motion (animations)
- recharts (charts)
- lucide-react (icons)
- tailwindcss v4 (styling)
sylvia-system/
├── backend/                    # Laravel application
│   ├── app/                    # Application code
│   │   ├── Http/              # Controllers, Requests, Middleware
│   │   ├── Models/            # Database models
│   │   └── Providers/         # Service providers
│   ├── bootstrap/             # Bootstrap files
│   ├── config/                # Configuration files
│   ├── database/
│   │   ├── migrations/        # Database migrations
│   │   ├── factories/         # Model factories
│   │   ├── seeders/           # Database seeders
│   │   └── database.sqlite    # SQLite database
│   ├── resources/             # Views and assets
│   ├── routes/                # Route definitions
│   ├── storage/               # Application storage
│   ├── tests/                 # Test files
│   ├── composer.json          # PHP dependencies
│   ├── artisan                # Laravel CLI
│   └── vite.config.js         # Vite config for assets
│
└── frontend/                   # React application
    ├── src/
    │   ├── App.jsx            # Main App component
    │   ├── index.css          # Global styles
    │   ├── main.jsx           # React entry point
    │   └── assets/            # Static assets
    ├── public/                # Public assets
    ├── index.html             # HTML template
    ├── package.json           # Node.js dependencies
    ├── vite.config.js         # Vite configuration
    ├── tailwind.config.js     # Tailwind CSS configuration
    └── eslint.config.js       # ESLint rules
```

## 🛠️ Available Commands

### Backend (Laravel)

```bash
cd backend

# Development
php artisan serve                    # Start development server
composer run dev                     # Start all services (server, queue, logs, vite)
php artisan tinker                   # Laravel REPL

# Database
php artisan migrate                  # Run migrations
php artisan migrate:rollback         # Rollback last migration
php artisan seed:db                  # Seed database
php artisan db:seed                  # Run seeders

# Generate
php artisan make:model Model -m      # Create model with migration
php artisan make:controller Controller # Create controller
php artisan make:middleware Middleware # Create middleware

# Code Quality
composer test                        # Run PHPUnit tests
php artisan lint                     # Fix code style

# Utility
php artisan cache:clear             # Clear application cache
php artisan config:clear            # Clear configuration cache
```

### Frontend (React)

```bash
cd frontend

# Development
npm run dev                          # Start development server
npm run build                        # Build for production
npm run preview                      # Preview production build
npm run lint                         # Check code style with ESLint
```

## 🗄️ Database

### Current Setup
- **Type**: MySQL (configured for both development & production)
- **Host**: 127.0.0.1
- **Port**: 3306
- **Database**: sylvia_farm
- **Connection**: Configured in `backend/.env`

### Setup MySQL

#### 1. Ensure MySQL is Running
```bash
# Start MySQL service
sudo service mysql start
# or for MariaDB
sudo service mariadb start
```

#### 2. Create Database
```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS sylvia_farm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

#### 3. Update .env with Database Credentials (if needed)
Edit `backend/.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sylvia_farm
DB_USERNAME=root
DB_PASSWORD=your_password_here
```

#### 4. Run Migrations
```bash
cd backend
php artisan migrate
```

### Default Tables (Migrated)
- `users` - User accounts and authentication
- `cache` - Cache data
- `failed_jobs` - Failed queue jobs
- `jobs` - Job queue table
- `sessions` - User session management

## 👥 Development Team

- **Backend & Database**: Sylvia Karebe
- **Frontend Lead**: Development Team

## 📝 Notes

- The application is set up with hot module reloading (HMR) for development
- Database migrations are automated and will run on `composer run dev`
- Environment variables are configured in `backend/.env` (create from `.env.example`)
- Frontend uses Tailwind CSS for styling with PostCSS support
- ESLint is configured for code quality on the frontend

## ℹ️ Getting Help

For Laravel documentation, visit: https://laravel.com/docs
For React documentation, visit: https://react.dev
For Tailwind CSS, visit: https://tailwindcss.com

---

**Last Updated**: April 9, 2026
**Status**: ✅ Frontend Complete - Splash Screen, Login, Dashboard with Dark/Light Mode
