# 🛍️ ShopSphere

A full-stack e-commerce storefront and admin back-office, built to demonstrate
production-style front-end, back-end and payment-integration skills: a
responsive product catalogue, a secure Stripe checkout flow, and an admin
dashboard with basic sales reporting.

[![CI](https://github.com/MrBoyard7/shopsphere/actions/workflows/ci.yml/badge.svg)](https://github.com/MrBoyard7/shopsphere/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/MrBoyard7/shopsphere/branch/main/graph/badge.svg)](https://codecov.io/gh/MrBoyard7/shopsphere)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Code style: Prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Testing the payment flow](#testing-the-payment-flow)
- [Running tests](#running-tests)
- [Available scripts](#available-scripts)
- [API overview](#api-overview)
- [Roadmap](#roadmap)
- [License](#license)

## Features

- **Responsive storefront** — home page, searchable/filterable product
  listing, and product detail pages, built mobile-first with Tailwind CSS.
- **Shopping cart** — client-side cart with persistent state (survives page
  refreshes), quantity editing and line-item removal.
- **Secure checkout** — Stripe Checkout (test mode) session creation, order
  persistence, and a webhook endpoint that marks orders as paid.
- **Admin back-office** — cookie-based authenticated dashboard to manage
  products (create/edit/delete) and view orders.
- **Basic reporting** — dashboard metrics for total revenue, order count and
  catalogue size, plus a recent-orders table.
- **SEO basics** — dynamic metadata per page, `sitemap.xml`, and
  `robots.txt` that excludes the admin area from indexing.
- - **Quality tooling** — ESLint, Prettier, Jest + React Testing Library with
    96%+ coverage on the core business logic, and a GitHub Actions CI pipeline.

## Tech stack

| Layer          | Choice                                 |
| -------------- | -------------------------------------- |
| Framework      | Next.js 14 (App Router) + TypeScript   |
| Styling        | Tailwind CSS                           |
| Database / ORM | SQLite + Prisma                        |
| Payments       | Stripe Checkout (test mode) + webhooks |
| Auth           | Custom JWT session cookie (`jose`)     |
| Validation     | Zod                                    |
| Testing        | Jest + React Testing Library           |
| CI             | GitHub Actions + Codecov               |

## Project structure

```
shopsphere/
├── .github/workflows/ci.yml       # GitHub Actions pipeline (lint, test, build)
├── prisma/
│   ├── schema.prisma               # Database schema (Product, Order, OrderItem, Admin)
│   └── seed.ts                     # Demo data seeding script
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Storefront home page
│   │   ├── layout.tsx                # Root layout + global metadata
│   │   ├── sitemap.ts / robots.ts    # SEO endpoints
│   │   ├── products/                # Product listing + detail pages
│   │   ├── cart/                    # Cart page
│   │   ├── checkout/                # Checkout success / cancel pages
│   │   ├── admin/                   # Auth-guarded back-office (dashboard, products, orders)
│   │   └── api/                     # REST routes: products, checkout, orders, stats, auth, webhooks
│   ├── components/                  # Reusable UI components
│   ├── context/CartContext.tsx      # Cart state (reducer + hook)
│   ├── lib/                         # Prisma client, Stripe client, auth helpers, validation, formatting
│   ├── types/                       # Shared TypeScript types
│   └── __tests__/                   # Unit tests
├── .env.example
├── LICENSE
└── README.md
```

## Getting started

### Prerequisites

- Node.js 18.18 or later
- A free [Stripe](https://dashboard.stripe.com/register) account for test-mode API keys

### Installation

```bash
git clone https://github.com/MrBoyard7/shopsphere.git
cd shopsphere
npm install
```

### Configure environment variables

```bash
cp .env.example .env
```

Fill in `.env` with your Stripe **test-mode** secret key and a random
`JWT_SECRET`. The default `DATABASE_URL` (SQLite file) works out of the box.

### Set up the database

```bash
npm run db:migrate   # creates the SQLite database and applies the schema
npm run db:seed       # loads demo products and an admin account
```

The seed script prints the admin login it created (defaults to
`admin@shopsphere.dev` / `ChangeMe123!`, overridable via `.env`).

### Run the app

```bash
npm run dev
```

Visit `http://localhost:3000` for the storefront and
`http://localhost:3000/admin/login` for the back-office.

## Testing the payment flow

This project uses **Stripe test mode**, so no real money ever moves. Add
items to the cart, go to checkout, and on Stripe's hosted payment page use
one of [Stripe's test cards](https://stripe.com/docs/testing), for example:

```
Card number: 4242 4242 4242 4242
Expiry:      any future date
CVC:         any 3 digits
```

To have the webhook mark the order as `PAID` locally, run the Stripe CLI in
a second terminal:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Running tests

```bash
npm run lint          # ESLint
npm run format:check  # Prettier check
npm test              # Jest unit tests with coverage
npm run build          # Production build (also validates types)
```

## Available scripts

| Script                 | Description                               |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Start the development server              |
| `npm run build`        | Build the production bundle               |
| `npm start`            | Start the production server               |
| `npm run lint`         | Run ESLint                                |
| `npm run format:check` | Check formatting without writing changes  |
| `npm run test:watch`   | Run Jest in watch mode                    |
| `npm run db:migrate`   | Apply Prisma migrations                   |
| `npm run db:seed`      | Seed demo data                            |
| `npm run db:studio`    | Open Prisma Studio to browse the database |

## API overview

| Method | Endpoint               | Description                               | Auth        |
| ------ | ---------------------- | ----------------------------------------- | ----------- |
| GET    | `/api/products`        | List products (filterable by category)    | Public      |
| POST   | `/api/products`        | Create a product                          | Admin       |
| GET    | `/api/products/:id`    | Get a single product                      | Public      |
| PUT    | `/api/products/:id`    | Update a product                          | Admin       |
| DELETE | `/api/products/:id`    | Delete a product                          | Admin       |
| POST   | `/api/checkout`        | Create an order + Stripe Checkout session | Public      |
| POST   | `/api/webhooks/stripe` | Stripe webhook (marks orders as paid)     | Stripe sig. |
| GET    | `/api/orders`          | List all orders                           | Admin       |
| GET    | `/api/stats`           | Dashboard reporting metrics               | Admin       |
| POST   | `/api/admin/login`     | Admin sign-in                             | Public      |
| POST   | `/api/admin/logout`    | Admin sign-out                            | Admin       |

## Roadmap

- [ ] Product image upload instead of external URLs
- [ ] Pagination on the product listing page
- [ ] Order status transitions from the admin UI (e.g. mark as fulfilled)
- [ ] End-to-end tests with Playwright

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for details.

---

Built by [Prince Boyard MBOUNGOU NGOMA](https://github.com/MrBoyard7) as a
portfolio project demonstrating full-stack e-commerce development.
