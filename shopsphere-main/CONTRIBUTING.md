# Contributing to ShopSphere

Thanks for your interest in improving ShopSphere! This is a personal / portfolio
project, but contributions, issues and suggestions are welcome.

## Getting started

1. Fork the repository and clone your fork.
2. Install dependencies: `npm install`.
3. Create a `.env` file from `.env.example` and fill in the required values.
4. Run database migrations and seed data: `npm run db:migrate && npm run db:seed`.
5. Start the dev server: `npm run dev`.

## Before opening a pull request

- Run `npm run lint` and fix any warnings.
- Run `npm run format` to apply Prettier formatting.
- Run `npm test` and make sure all tests pass with coverage intact.
- Keep commits focused and write clear commit messages.

## Code style

This project uses ESLint (`eslint-config-next`) and Prettier. Please do not
disable rules inline unless there is no reasonable alternative, and explain
why in a code comment when you do.
