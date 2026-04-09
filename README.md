# Sylvia Farm ERP System

A modern farm management enterprise resource planning (ERP) system built with **Laravel 12** (backend) and **React 19** (frontend).

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [User Accounts](#user-accounts)
- [Features](#features)
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
- Multiple role-based profiles (Admin, Sheep, Fish, Vegetable, Demo)

### Tech Stack
- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React 19 with Vite
- **Database**: SQLite (default) / MySQL (configurable)
- **Styling**: Tailwind CSS v4
- **Package Manager**: Composer (backend), npm (frontend)

## ✅ Prerequisites

Before running the application, ensure you have the following installed:

- **PHP** >= 8.2
- **Composer** >= 2.0
- **Node.js** >= 18.0
- **npm** >= 9.0

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

### 2. Frontend Setup (React)

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

## 🚀 Running the Application

### Run Frontend
```bash
cd frontend
npm run dev
```
Frontend available at: http://localhost:5173

### Run Backend
```bash
cd backend
php artisan serve
```
Backend available at: http://localhost:8000

## 👥 User Accounts

The system comes with 5 pre-configured user accounts:

| Email | Password | Role | Profile |
|-------|----------|------|---------|
| sylvia@redhill.com | password | Administrator | Admin Dashboard |
| sheep@redhill.com | password | Sheep Manager | Sheep Profile |
| fish@redhill.com | password | Fish Manager | Fish Profile |
| vegetable@redhill.com | password | Crop Manager | Vegetable Profile |
| demonstration@redhill.com | password | Demo Manager | Demo Farm |

### Login Routing
The login page automatically routes users to their appropriate profile based on their email:
- **sylvia** → Admin Dashboard (`/dashboard`)
- **sheep** → Sheep Profile (`/sheep`)
- **fish** → Fish Profile (`/fish`)
- **vegetable** → Vegetable Profile (`/vegetable`)
- **demonstration** → Demo Profile (`/demonstration`)

## 🎨 Features

### 1. Splash Screen
- Forest Green (#024D30) background
- Mint Green bouncing Sprout icon
- "Welcome to Redhill Farm" text
- "~by Sylvia Karebe" signature in gold
- Auto-navigates to login after 3.5 seconds

### 2. Login Page
- Split layout: Farm image (left) + Login form (right)
- Light green overlay on image
- Farm branding with "Redhill Farm" and "Farm Management System"
- Dynamic routing based on email

### 3. Admin Dashboard (/dashboard)
- **Header**: Shows "REDHILL FARM" title + dark/light toggle + profile menu
- **Profile Menu**: Click avatar to access Log Out, Switch Account, Close System
- **Hub View** (5 category cards + 2 charts):
  - Dashboard (Blue) - Main overview and analytics
  - Operations (Green) - Farm operations & management
  - Sales & Orders (Purple) - Revenue and order management
  - Employees (Orange) - Staff management & HR
  - Accounting (Teal) - Financial reports & accounting
  - Feed Consumption chart
  - Water Usage chart
- **Dashboard Section** (when Dashboard is clicked):
  - Stats cards: Total Animals, Crop Yield, Revenue, Water Usage, Feed Stock, Active Staff
  - Weekly Feed Consumption chart
  - Recent Activity feed
  - Quick Actions buttons

### 4. Operations Section
- Livestock Overview (Dairy Cows, Beef Cattle, Goats, Chickens)
- Crop Status (Maize, Wheat, Vegetables)
- Today's Tasks (to-do list with priorities)

### 5. Sales & Orders Section
- Table with ID, Customer, Item, Amount, Date, Status
- Status badges: Completed, Pending, Delivered, Cancelled

### 6. Employees Section
- Filter tabs: All, Active, On Leave
- Stats: Total, Active, On Leave, Departments
- Employee table with Name, Role, Department, Phone, Shift, Status

### 7. Accounting Section
- Stats: Total Income, Total Costs, Net Profit, Profit Margin
- Expenses Breakdown (progress bars)
- Income Sources (progress bars)

### 8. Sheep Profile (/sheep)
- **Header**: Dark green (#064E3B) / Light mint (#ECFDF5)
- **Hub**: Stats cards (Total Flock, Lambs, Ewes, Rams) + 5 section cards + charts
- **Sections**:
  - Flock Overview - Total sheep, monthly growth trend
  - Health - Healthy/Under Observation/Needs Attention
  - Livestock Feed - Daily/weekly consumption, costs
  - Daily Records - Activity log with time, notes, status
  - Age Groups - Table with weight and health status

### 9. Fish Profile (/fish)
- **Header**: Dark blue (#1E3A5F) / Light blue (#E0F2FE)
- **Hub**: Stats cards (Total Fish, Tilapia, Catfish) + 4 section cards + charts
- **Sections**:
  - Pond Overview - Fish count by pond
  - Water Quality - pH, Dissolved Oxygen, Temperature, Ammonia, Nitrite
  - Fish Health - Health status breakdown
  - Feeding Log - Daily feeding schedule

### 10. Vegetable Profile (/vegetable)
- **Header**: Forest green (#14532D) / Light green (#DCFCE7)
- **Hub**: Stats cards (Crop Types, Hectares, Ready, Growing) + 4 section cards + crop table
- **Sections**:
  - Crop Overview - All crops with status, yield, days left
  - Irrigation - Daily/weekly water usage
  - Harvest - Monthly harvest trend chart
  - Weather - Weather conditions

### 11. Demo Profile (/demonstration)
- **Header**: Dark purple (#4C1D95) / Light purple (#F3E8FF)
- **Hub**: Stats (Total Visitors, This Month, Revenue, Rating) + 4 section cards + bookings table
- **Sections**:
  - Bookings - Visitor bookings with group, type, date, payment, status
  - Demo Types - Sheep, Fish, Vegetable, Full Tour options with pricing
  - Revenue - Monthly revenue chart
  - Feedback - Visitor reviews and ratings

### 12. Profile Menu (All Profiles)
When clicking the profile photo/avatar:
- **Log Out** - Returns to login form
- **Switch Account** - Returns to login form
- **Close System** - Shows "Goodbye" screen with "See you soon!" message

### 13. Goodbye Screen
- Plain text (no icon) on Forest Green background
- "Goodbye" text
- "See you soon!" in gold
- Auto-closes browser after 3.5 seconds

### 14. Color Scheme
- **Dark Theme Background**: Deep Navy Blue (#0F172A)
- **Dark Theme Cards**: Slate Blue (#1E293B)
- **Sub-text**: Muted grey/semi-transparent white
- **Light Theme**: Available for all profiles with appropriate color accents

## 📁 Project Structure

```
sylvia-system/
├── backend/                    # Laravel application
│   ├── app/                    # Application code
│   │   └── Models/             # User model
│   ├── database/               # Migrations, seeders
│   ├── .env                    # Environment config
│   └── ...
│
└── frontend/                   # React application
    ├── src/
    │   ├── App.jsx            # Main App + Admin Dashboard
    │   ├── index.css          # Global styles
    │   ├── pages/
    │   │   ├── Login.jsx      # Login page with routing
    │   └── profiles/
    │       ├── SheepProfile.jsx
    │       ├── FishProfile.jsx
    │       ├── VegetableProfile.jsx
    │       └── DemoProfile.jsx
    └── ...
```

## 🛠️ Available Commands

### Frontend (React)
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend (Laravel)
```bash
cd backend
php artisan serve                    # Start development server
php artisan migrate                  # Run migrations
php artisan tinker                   # Laravel REPL
```

## 🗄️ Database

### Creating Users
Users are stored in the SQLite database. To add new users:
```bash
cd backend
php artisan tinker
App\Models\User::create(['name' => 'Name', 'email' => 'email@example.com', 'password' => bcrypt('password')]);
```

### Current Users (Pre-seeded)
- Sylvia Karebe (sylvia@redhill.com)
- Sheep (sheep@redhill.com)
- Fish (fish@redhill.com)
- Vegetable (vegetable@redhill.com)
- Demonstration (demonstration@redhill.com)

## 👥 Development Team

- **Project Lead**: Sylvia Karebe
- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Laravel 12

## 📝 Notes

- The application uses dark/light theme toggle on all profiles
- Each profile has unique header colors for easy identification
- Profile menu is available on all pages for quick logout/switch/close
- The demo profile tracks visitors interested in farm demonstrations (sheep, fish, vegetables)

## ℹ️ Getting Help

For Laravel documentation, visit: https://laravel.com/docs
For React documentation, visit: https://react.dev
For Tailwind CSS, visit: https://tailwindcss.com

---

**Last Updated**: April 9, 2026
**Status**: ✅ Complete - 5 User Profiles with Full Functionality