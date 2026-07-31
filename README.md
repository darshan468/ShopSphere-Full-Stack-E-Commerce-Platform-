# 🛍️ ShopSphere – Full-Stack E-Commerce Platform

> 🚀 A modern, production-ready full-stack e-commerce platform built with **Next.js 14**, **TypeScript**, **Prisma**, **Stripe**, and **Tailwind CSS**. ShopSphere delivers a seamless online shopping experience with secure payments, responsive UI, and a powerful admin dashboard.

<p align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38BDF8?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

</p>

---

# ✨ Features

## 🛒 Customer Features

- 👤 User Authentication
- 🛍️ Browse Products
- 🔍 Search & Filter Products
- 📄 Product Detail Pages
- 🛒 Shopping Cart
- ➕ Update Cart Quantity
- ❌ Remove Products from Cart
- 💳 Secure Stripe Checkout
- 📦 Order Confirmation
- 📱 Fully Responsive Design
- ⚡ Fast Loading with Next.js App Router

---

## 👨‍💼 Admin Dashboard

- 📊 Sales Dashboard
- 📦 Order Management
- 🛍️ Product Management (CRUD)
- 📈 Revenue Statistics
- 📋 Recent Orders
- 🔐 Protected Admin Authentication

---

# 🚀 Tech Stack

## 💻 Frontend

- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS

## ⚙️ Backend

- Next.js API Routes
- Prisma ORM

## 🗄️ Database

- SQLite
- Prisma ORM

## 🔐 Authentication

- JWT Authentication
- Secure Cookie Sessions
- bcrypt Password Hashing

## 💳 Payments

- Stripe Checkout
- Stripe Webhooks

## 🧪 Testing

- Jest
- React Testing Library

## 🛠️ Dev Tools

- Git & GitHub
- ESLint
- Prettier
- GitHub Actions (CI/CD)

---

# 🏗️ System Architecture

```text
                    👤 User
                       │
                       ▼
         Next.js 14 Frontend (React)
                       │
                API Routes (REST)
                       │
          Prisma ORM + Business Logic
                       │
              SQLite Database
                       │
              Stripe Payment Gateway
```

---

# 📂 Project Structure

```text
ShopSphere
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   ├── app/
│   │   ├── admin/
│   │   ├── api/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── products/
│   │   └── page.tsx
│   │
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   ├── styles/
│   └── __tests__/
│
├── public/
├── package.json
├── README.md
└── .env.example
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/ShopSphere-Full-Stack-E-Commerce-Platform.git
```

```bash
cd ShopSphere-Full-Stack-E-Commerce-Platform
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file and add:

```env
DATABASE_URL=

JWT_SECRET=

STRIPE_SECRET_KEY=

STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

---

## 4️⃣ Generate Prisma Client

```bash
npx prisma generate
```

---

## 5️⃣ Run Database Migration

```bash
npx prisma migrate dev
```

---

## 6️⃣ Seed Demo Data

```bash
npm run db:seed
```

---

## 7️⃣ Start Development Server

```bash
npm run dev
```

Visit

```
http://localhost:3000
```

---

# 💳 Payment Integration

✅ Stripe Checkout

- Secure Payment Gateway
- Checkout Session Creation
- Payment Confirmation
- Webhook Verification
- Automatic Order Updates

---

# 🔐 Security Features

- 🔒 JWT Authentication
- 🍪 Secure Cookie Sessions
- 🔑 Password Encryption (bcrypt)
- ✅ Input Validation using Zod
- 🛡️ Protected Admin Routes
- 🚫 Unauthorized Access Prevention

---

# 📊 Admin Dashboard

The admin dashboard provides:

- 📦 Product Management
- 📋 Order Management
- 📈 Revenue Analytics
- 📊 Sales Statistics
- 👥 Customer Orders
- 📉 Recent Transactions

---

# 🧪 Testing

Run all tests

```bash
npm test
```

Run with coverage

```bash
npm test -- --coverage
```

---

# 📸 Screenshots

Add screenshots here:

- 🏠 Home Page
- 🛍️ Product Listing
- 📄 Product Details
- 🛒 Shopping Cart
- 💳 Checkout
- 👨‍💼 Admin Dashboard
- 📊 Analytics

---

# 🚀 Future Enhancements

- ❤️ Wishlist
- ⭐ Product Reviews
- 🎁 Coupon System
- 📧 Email Notifications
- 📦 Order Tracking
- 🌍 Multi-language Support
- 🌙 Dark Mode
- 📱 Progressive Web App (PWA)
- 🤖 AI Product Recommendations

---

# 🤝 Contributing

Contributions are always welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push your branch

```bash
git push origin feature-name
```

5. Open a Pull Request 🚀

---

# 👨‍💻 Author

**Darshan S**

🎓 Artificial Intelligence & Data Science Student

💼 Aspiring Software Development Engineer (SDE)

🌐 LinkedIn: www.linkedin.com/in/darshans27

🐙 GitHub: https://github.com/darshan468

---

# ⭐ Show Your Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub. It motivates and supports future development!

## 💙 Thanks for visiting ShopSphere!
