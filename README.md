# Sylvia Farm ERP — Redhill Farm

A full-stack farm management ERP system for **Redhill Farm**, built with **Laravel 12** (backend API) and **React 19** (frontend SPA).

---

## Table of Contents
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [User Accounts & Roles](#user-accounts--roles)
- [System Architecture](#system-architecture)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Frontend Modules](#frontend-modules)
- [Fish Farm Reporting](#fish-farm-reporting)
- [Email Configuration](#email-configuration)
- [Development Team](#development-team)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 12, PHP 8.2+ |
| Auth | Laravel Sanctum (token-based) |
| Roles | spatie/laravel-permission |
| Database | MySQL (`sylvia_farm`) |
| Frontend | React 19, Vite, React Router v7 |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Animations | Framer Motion |
| HTTP Client | Axios (with interceptors) |
| Email | Gmail SMTP via Laravel Mail |

---

## Prerequisites

- PHP >= 8.2
- Composer >= 2
- Node.js >= 18
- MySQL 8+
- A Gmail account with an **App Password** (for email features)

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone git@github.com:ShellaMutunga/sylvia-system.git
cd sylvia-system
```

### 2. Backend setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Configure your `.env` file (see [Environment Configuration](#environment-configuration)), then:

```bash
php artisan migrate --seed
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000/api
```

---

## Environment Configuration

Edit `backend/.env`:

```env
APP_NAME="Sylvia Farm ERP"
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sylvia_farm
DB_USERNAME=root
DB_PASSWORD=your_password

# Gmail SMTP — use an App Password, not your real password
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_ENCRYPTION=tls
MAIL_USERNAME=your_gmail@gmail.com
MAIL_PASSWORD=your_16_char_app_password
MAIL_FROM_ADDRESS=your_gmail@gmail.com
MAIL_FROM_NAME="Redhill Farm"
```

After updating `.env`:
```bash
php artisan config:clear
```

---

## Running the Application

```bash
# Terminal 1 — Backend API
cd backend
php artisan serve
# → http://localhost:8000

# Terminal 2 — Frontend
cd frontend
npm run dev
# → http://localhost:5173
```

---

## User Accounts & Roles

Seeded by `DatabaseSeeder`. All passwords: **`password`**

| Email | Role | Dashboard |
|---|---|---|
| sylvia@redhill.com | admin | Full ERP dashboard |
| manager@redhill.com | manager | Full ERP dashboard |
| accounts@redhill.com | accountant | Full ERP dashboard → Finance tab |
| vet@redhill.com | vet | Full ERP dashboard → Animals tab |
| sheep@redhill.com | worker | Sheep Profile |
| fish@redhill.com | worker | Fish Farm Profile |
| vegetable@redhill.com | worker | Vegetable Profile |
| demonstration@redhill.com | worker | Demo Profile |

### Role-based login routing
- **vet** → `/animals` (via Operations)
- **accountant** → `/finance` (via Accounting)
- **admin / manager** → `/dashboard`
- **email contains keyword** → matching profile page

---

## System Architecture

```
sylvia-system/
├── backend/                        Laravel 12 API
│   ├── app/
│   │   ├── Http/Controllers/Api/   All API controllers
│   │   ├── Models/                 Eloquent models
│   │   ├── Mail/                   WelcomeEmail
│   │   └── Notifications/          ResetPasswordNotification
│   ├── database/
│   │   ├── migrations/             40 migration files
│   │   └── seeders/                DatabaseSeeder (8 users + farm)
│   └── routes/api.php              ~140 API routes
│
└── frontend/                       React 19 SPA
    └── src/
        ├── App.jsx                 Admin ERP dashboard (6 modules)
        ├── context/AuthContext.jsx Global auth state
        ├── components/
        │   └── ProtectedRoute.jsx  Auth guard
        ├── services/
        │   ├── api.js              Axios instance + interceptors
        │   └── auth.js             Login/logout/me helpers
        └── pages/
            ├── Login.jsx
            ├── ForgotPassword.jsx
            ├── ResetPassword.jsx
            └── profiles/
                ├── SheepProfile.jsx
                ├── FishProfile.jsx     ← full fish farm module
                ├── VegetableProfile.jsx
                └── DemoProfile.jsx
```

---

## Database Schema

40 tables across 8 modules:

### Core
| Table | Purpose |
|---|---|
| users | System users with roles and farm assignment |
| farms | Farm entity |
| roles / permissions | spatie/laravel-permission |

### Farm Structure
| Table | Purpose |
|---|---|
| fields | Farm fields |
| zones | Zones within fields |

### Crops
| Table | Purpose |
|---|---|
| crop_types | Maize, wheat, vegetables, etc. |
| crop_seasons | Active planting seasons |
| crop_activities | Planting, fertilising, irrigation events |
| crop_harvests | Harvest records |

### Animals
| Table | Purpose |
|---|---|
| animal_species | Species catalogue |
| animal_groups | Ponds / herds / flocks |
| animals | Individual animal records |
| animal_health_records | Vet visits, vaccinations, treatments |
| animal_productions | Milk, eggs, wool output |

### Fish Farm (8 dedicated tables)
| Table | Purpose | Frequency |
|---|---|---|
| fish_stocking_records | Fingerling intake — date, source, species, count, avg weight | Start of cycle |
| fish_mortality_records | Daily death count + probable cause + disease outbreak flag | Daily |
| fish_growth_samples | Bi-weekly weight/length sampling vs target | Weekly/monthly |
| fish_harvest_records | End-of-cycle — biomass, count, survival rate | End of cycle |
| water_quality_readings | DO, temperature, pH, ammonia, nitrite, turbidity | Daily (morning) |
| water_exchange_records | Water in/out volumes + treatment applied | Daily |
| fish_feed_records | Feed type, pellet size, qty/day, Azolla/BSF supplementary | Daily |
| fish_sales_records | Buyer details, species, weight, price/kg, computed total | Per sale |

### Inventory
| Table | Purpose |
|---|---|
| inventory_categories | Category groups |
| warehouses | Storage locations |
| inventory_items | Stock items with min_stock_level |
| suppliers | Supplier records |
| purchase_orders | POs with approve/deliver/cancel workflow |
| purchase_order_items | Line items per PO |

### HR & Payroll
| Table | Purpose |
|---|---|
| departments | Department records |
| employees | Employee profiles with salary info |
| attendance | Daily attendance records |
| leave_requests | Leave with approve/reject |
| payroll_records | Monthly payroll with net_salary stored column |

### Finance
| Table | Purpose |
|---|---|
| accounts | Chart of accounts |
| transactions | Income/expense ledger by module |

---

## API Reference

Base URL: `http://localhost:8000/api`

All routes except auth require `Authorization: Bearer {token}`.

### Authentication
```
POST   /auth/login
POST   /auth/logout
GET    /auth/me
POST   /auth/forgot-password
POST   /auth/reset-password
POST   /auth/change-password
```

### Dashboard
```
GET    /dashboard/stats          KPIs, alerts, income trend, weekly production
```

### Farm & Fields
```
GET/POST/PUT/DELETE   /farms
GET/POST/PUT/DELETE   /fields
GET/POST/PUT/DELETE   /zones
```

### Crops
```
GET/POST/PUT/DELETE   /crop-types
GET/POST/PUT/DELETE   /crop-seasons
GET/POST/PUT/DELETE   /crop-seasons/{id}/activities
GET/POST/PUT/DELETE   /crop-seasons/{id}/harvests
```

### Animals
```
GET/POST/PUT/DELETE   /animal-species
GET/POST/PUT/DELETE   /animal-groups
GET/POST/PUT/DELETE   /animals
GET/POST              /animals/{id}/health-records
GET/POST              /animals/{id}/productions
```

### Fish Farm
```
GET/POST/DELETE   /fish/stocking
GET/POST/DELETE   /fish/mortality
GET/POST/DELETE   /fish/growth
GET/POST/DELETE   /fish/harvest
GET/POST/DELETE   /fish/water-quality
GET               /fish/water-quality/latest
GET/POST/DELETE   /fish/water-exchange
GET/POST/DELETE   /fish/feed
GET/POST/DELETE   /fish/sales
GET               /fish/sales/summary        P&L: revenue - feed costs - stocking costs
```

### Inventory
```
GET/POST/PUT/DELETE   /suppliers
GET/POST/PUT/DELETE   /inventory-items
GET/POST              /purchase-orders
POST                  /purchase-orders/{id}/approve
POST                  /purchase-orders/{id}/deliver      auto-increments stock quantities
POST                  /purchase-orders/{id}/cancel
```

### HR & Payroll
```
GET/POST/PUT/DELETE   /employees
GET/POST              /attendance
POST                  /attendance/bulk
GET/POST              /leave-requests
POST                  /leave-requests/{id}/approve
POST                  /leave-requests/{id}/reject
GET                   /payroll
POST                  /payroll/generate
POST                  /payroll/{id}/approve
POST                  /payroll/{id}/mark-paid
```

### Finance
```
GET/POST              /transactions
GET                   /transactions/summary      P&L by module for date range
```

---

## Frontend Modules

The admin dashboard (`/dashboard`) has 6 modules, all backed by live API data:

| Module | Data Source | Key Features |
|---|---|---|
| **Dashboard** | `/dashboard/stats` | 6 KPI cards, income trend chart, weekly production chart, recent activity, quick actions |
| **Operations** | `/animal-groups`, `/crop-seasons` | Livestock groups, active crop seasons, harvest/checkup alerts |
| **Sales & Orders** | `/transactions` | Recent transactions table |
| **Employees** | `/employees` | Staff table, leave alert banner, dept count |
| **Accounting** | `/transactions/summary` | Income/expense totals, P&L margin, module breakdown bars |
| **Inventory** | `/inventory-items`, `/purchase-orders` | Stock table with low-stock highlighting, PO panel, low-stock alert banner |

### Auth flow
- `AuthContext` holds the logged-in user globally (restored from localStorage on reload)
- `ProtectedRoute` wraps all authenticated pages — redirects to `/login` if no token
- Axios response interceptor auto-clears token and redirects on 401
- Login routes users by role (admin/manager → dashboard, vet → operations, accountant → finance)
- Forgot password / reset password pages wired to Laravel Password Broker

---

## Fish Farm Reporting

The Fish Profile (`/fish`) implements the full reporting structure required by the farm manager:

### Sections
1. **Stocking & Production** — stocking reports, growth monitoring chart (actual vs target weight), harvest records with survival rate
2. **Water Quality** — daily parameter cards (DO/temp/pH/ammonia with green/yellow/red status), readings history table, water exchange and treatment log
3. **Feeding & Inventory** — weekly consumption bar chart, supplementary feed tracking (Azolla for tilapia, BSF larvae for catfish), cost totals
4. **Health & Hygiene** — daily mortality count, disease outbreak flag and alert banner, death log per pond
5. **Sales Records** — buyer name + contact, species, weight, price/kg, auto-calculated totals
6. **Profit & Loss** — revenue vs feed costs + stocking costs, net P&L, cost breakdown chart

### Water quality ideal ranges (stored in frontend)
| Parameter | Ideal Range | Alert Threshold |
|---|---|---|
| Dissolved Oxygen | 5.0–8.0 mg/L | < 3.0 → danger |
| Temperature | 22–28 °C | < 18 or > 32 → danger |
| pH | 6.5–8.0 | < 6.0 or > 8.5 → danger |
| Ammonia | < 0.1 mg/L | > 0.5 → danger |
| Nitrite | < 0.1 mg/L | > 0.5 → danger |

---

## Email Configuration

Two email flows are implemented:

### Welcome Email (on user creation)
When an admin creates a new user via `POST /users`, the system:
1. Auto-generates a 10-character temporary password
2. Sends a branded welcome email with login URL, email, temp password, and role
3. The user must change their password on first login

### Password Reset
1. User submits email to `POST /auth/forgot-password`
2. Laravel sends a reset link to `{FRONTEND_URL}/reset-password?token=...&email=...`
3. User sets new password via `POST /auth/reset-password`
4. All existing tokens for that user are revoked on success

Both use Gmail SMTP — configure `MAIL_*` variables in `backend/.env`.

---

## Development Team

| Person | Responsibility |
|---|---|
| **Tonny** | Backend — Laravel API, database design, auth, all modules |
| **Shella Mutunga** | Frontend — React UI, profile pages, animations |

**Client**: Sylvia Karebe — Redhill Farm

---

**Last Updated**: April 11, 2026
**Status**: Active development — fish farm module complete, core ERP live
