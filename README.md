# BazaarHub 

**A full-stack multivendor ecommerce platform** where multiple sellers list products, buyers shop and pay securely, and an admin oversees the entire marketplace — built with real-world features like live notifications, Khalti payment integration, order tracking, and a commission-based payout system.

**[Live Demo — Storefront](https://ecommerce-umber-psi-58.vercel.app/)**  
**[GitHub Repository](https://github.com/Nischaldh/ecommerce)**

---

## Motivation

I built BazaarHub to explore how a multi-vendor ecommerce platform works beyond the basic product, cart, and checkout flow.

The platform supports three distinct roles — buyers, sellers, and admins — with JWT-based authentication and role-based authorization controlling access to their respective features. User registration also includes email OTP verification, along with password reset functionality.

A major focus of the project was handling the backend workflows that come with having multiple sellers on the same platform. A single order can contain products from different sellers, so each item needs to be tracked and fulfilled independently while still belonging to the same customer order. Payments, commissions, refunds, seller balances, and payouts also need to stay consistent throughout that lifecycle.

The project therefore includes Khalti payment integration, per-seller order fulfillment, real-time Socket.IO notifications, inventory management, a 14-day refund window, commission tracking, seller balances, and admin-controlled payouts.

Rather than being just a storefront, BazaarHub is built around the workflows and authorization rules required to operate a multi-vendor marketplace.

---

##  Features

### Buyers
- Browse products with search, category filters, price range, and sort
- Product detail pages with image galleries and seller info
- Cart with quantity management and partial checkout
- Checkout with saved addresses or a new address
- Khalti online payment or Cash on Delivery
- Real-time order status updates via Socket.IO
- Order tracking with per-item delivery info (carrier, tracking number, ETA)
- Request refunds within a 14-day window
- Leave reviews and ratings on delivered products

### Sellers
- Register and manage a seller profile
- Add, edit, and delete products with multiple images (Cloudinary)
- Manage inventory stock levels
- View and fulfill incoming orders — update item status (Processing → Shipped → Delivered)
- Add delivery tracking info per item
- Earnings dashboard: gross revenue, platform commission breakdown, pending vs available balance
- Commission history with per-item financial breakdown
- Add Khalti payment info for receiving payouts

### Admin Dashboard
- Platform-wide stats: buyers, sellers, orders, revenue, commission collected
- Manage users (buyers and sellers) — view, delete
- Manage products — search, delete
- Manage orders — filter by status, view full order details, confirm/release commissions
- Refund management — approve, complete, or reject buyer refund requests
- Payout management — view seller balances, create Khalti payouts, mark complete or failed
- Verify seller payment info before first payout
- Create and deactivate admin accounts (super admin only)

### Platform
- Live notifications via Socket.IO (order placed, status updated, payment received, payout processed)
- Email notifications via Brevo (OTP verification, password reset)
- Commission-based revenue model with tiered rates
- 14-day refund eligibility window tied to payment records
- Separate JWT secrets for users and admins

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Node.js, Koa, TypeScript |
| **Database** | PostgreSQL + TypeORM |
| **Frontend** | React 19, Vite, Tailwind CSS v4 |
| **Admin** | React 19, Vite, Tailwind CSS v4, Recharts |
| **State Management** | Redux Toolkit |
| **Forms** | React Hook Form + Yup |
| **Real-time** | Socket.IO |
| **Payments** | Khalti ePay API |
| **File Uploads** | Cloudinary |
| **Email** | Brevo (transactional email API) |
| **Auth** | JWT (separate secrets for users and admins) |
| **UI Components** | shadcn/ui, Radix UI, Lucide React |

---

## Quick Start

The project has three parts: `backend`, `frontend`, and `admin`. Each runs independently.

### Prerequisites

- Node.js v18+
- PostgreSQL database 
- A [Cloudinary](https://cloudinary.com) account (free)
- A [Khalti](https://khalti.com) merchant account (test keys work fine)
- A [Brevo](https://www.brevo.com) account (free, 300 emails/day)

### 1. Clone the repository

```bash
git clone https://github.com/Nischaldh/ecommerce.git
cd ecommerce
```

### 2. Set up the backend

```bash
cd backend
npm install
cp .env.example .env
# Fill in your .env values (see Environment Variables section below)
npm run dev
```

The backend runs on `http://localhost:4000`.

### 3. Set up the frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file:
```env
VITE_BACKEND_URL=http://localhost:4000/api
```

```bash
npm run dev
```

The storefront runs on `http://localhost:5173`.

### 4. Set up the admin dashboard

```bash
cd ../admin
npm install
```

Create a `.env` file:
```env
VITE_BACKEND_URL=http://localhost:4000/api
```

```bash
npm run dev
```

The admin dashboard runs on `http://localhost:5174`.

### 5. Seed a super admin

There is no public signup for admins by design. Insert the first super admin directly into the database:

```sql
INSERT INTO admins (id, name, email, password, role, is_active, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Super Admin',
  'admin@example.com',
  '$2a$12$YOUR_BCRYPT_HASH_HERE',
  'super_admin',
  true,
  NOW(),
  NOW()
);
```

---

## Environment Variables

### Backend `.env`

```env
PORT=4000
DATABASE_URL=yourDatabaseUrl
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:4000/api
ADMIN_URL=http://localhost:5174
JWT_SECRET=yourJWTSecret
ADMIN_JWT_SECRET=yourAdminJWTSecret
DUMMY_HASH=$2a$10$SJJ.YGj2U07QoPOSjI6L/uZObuZPdRys54VpgMk9da2ml7DlM2evu
EMAIL=yourverifiedsender@example.com
BREVO_API_KEY=yourBrevoApiKey
CLOUDINARY_NAME=yourCloudinaryName
CLOUDINARY_API_KEY=yourCloudinaryApiKey
CLOUDINARY_SECRET_KEY=yourCloudinarySecretKey
KHALTI_SECRET_KEY=yourKhaltiSecretKey
KHALTI_PUBLIC_KEY=yourKhaltiPublicKey
KHALTI_BASE_URL=https://dev.khalti.com/api/v2
```

#### How to get each value

**`DATABASE_URL`**  
A PostgreSQL connection string. Format: `postgresql://user:password@host:5432/dbname`  
- Local: use your local PostgreSQL credentials  
- Free hosted: sign up at [neon.tech](https://neon.tech) → create a project → copy the connection string

**`JWT_SECRET` and `ADMIN_JWT_SECRET`**  
Any long random string. Generate one with:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Use *different* values for each — this keeps user and admin tokens completely separate.

**`DUMMY_HASH`**  
A bcrypt hash used internally to prevent timing attacks on non-existent accounts. The default value in `.env.example` is a hash of `123456` and is safe to use as-is. Do not use `123456` as any real password.

**`EMAIL` and `BREVO_API_KEY`**  
Used to send OTP and password reset emails through Brevo's HTTP API. No custom domain is required, but you do need a verified sender address.

1. Sign up for free at [brevo.com](https://www.brevo.com) and complete the account setup
2. Go to **Senders, Domains & Dedicated IPs → Senders → Add a sender**
3. Enter a name and your email address, then enter the verification code Brevo sends to that inbox
4. Go to **SMTP & API → API Keys → Generate a new API key**
5. Copy the key immediately, because it is only shown once. Make sure it's an **API key**, not an SMTP key
6. Set `BREVO_API_KEY` to that key
7. Set `EMAIL` to the sender address you verified in step 3. It must match exactly

> **Deliverability note:** If `EMAIL` is a free address like Gmail, some OTP emails may land in spam because Brevo cannot authenticate gmail.com.

**`CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET_KEY`**  
For product image uploads.
1. Sign up free at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard → you'll see your **Cloud Name**, **API Key**, and **API Secret** immediately

**`KHALTI_SECRET_KEY` and `KHALTI_PUBLIC_KEY`**  
For processing payments.
1. Sign up at [khalti.com](https://khalti.com) as a merchant
2. Go to Merchant Dashboard → Settings → API Keys
3. Use the **test** keys during development (`KHALTI_BASE_URL` is already set to the test environment)
4. Switch to live keys and `https://khalti.com/api/v2` for production

**`KHALTI_BASE_URL`**  
Keep as `https://dev.khalti.com/api/v2` for development/testing.  
Change to `https://khalti.com/api/v2` for production.

---

## Usage

### Buyer flow

1. **Sign up** and verify your email via OTP
2. **Browse** products — search, filter by category, sort by price or rating
3. **Add to cart** and proceed to checkout
4. **Select or add a delivery address**
5. **Pay** with Khalti (redirected to Khalti's hosted page) or choose Cash on Delivery
6. **Track your order** — receive live notifications as the seller updates each item's status
7. **Request a refund** within 14 days if needed

### Seller flow

1. **Sign up** with the seller role
2. **Add products** with images, pricing, stock, and category
3. **Receive orders** — notifications fire in real time when a buyer purchases
4. **Fulfill items** — update status (Pending → Processing → Shipped → Delivered) and add tracking info
5. **Add your Khalti ID** in the Earnings tab and wait for admin verification
6. **Track earnings** — see gross revenue, commissions deducted, pending vs available balance, payout history

### Admin flow

1. **Log in** at the admin dashboard
2. **Dashboard** shows platform-wide stats at a glance
3. **Manage users** — view all buyers and sellers, delete accounts
4. **Manage products** — search and remove listings
5. **Manage orders** — filter, inspect items, confirm and release commissions
6. **Refunds** — approve or reject buyer refund requests, mark as completed with reference number
7. **Payouts** — view seller available balances, create Khalti payouts, handle failures
8. **Verify sellers** — check seller Khalti IDs before their first payout is allowed
9. **Admins** *(super admin only)* — create new admin accounts, deactivate existing ones

### Commission tiers

| Order item subtotal | Platform fee |
|---|---|
| Below Rs. 50,000 | 5.0% |
| Rs. 50,000 – Rs. 1,00,000 | 3.5% |
| Above Rs. 1,00,000 | 2.5% |

Commissions are held for **14 days** after delivery before being released to a seller's available balance, giving buyers time to request refunds.

---

## Contributing

### Clone and install

```bash
git clone https://github.com/Nischaldh/ecommerce.git
cd ecommerce

# Install all three packages
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
cd admin && npm install && cd ..
```

### Run in development

Open three terminals:

```bash
# Terminal 1 — backend
cd backend && npm run dev

# Terminal 2 — frontend
cd frontend && npm run dev

# Terminal 3 — admin
cd admin && npm run dev
```

### Build for production

```bash
# Backend
cd backend && npm run build && npm start

# Frontend
cd frontend && npm run build

# Admin
cd admin && npm run build
```

### Submit a pull request

Fork the repository, make your changes on a new branch, and open a pull request to `main`. Please keep PRs focused — one feature or fix per PR.

---
