import type { Config } from 'jest';
import nextJest from 'next/jest';

// nextJest lets Jest reuse the same SWC/Next.js configuration as the app
const createJestConfig = nextJest({ dir: './' });

const customJestConfig: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // Coverage is collected only for the pure, unit-testable logic layer.
  // Pages and API routes under src/app are Next.js Server Components / route
  // handlers that talk to a real database and Stripe — they are better
  // suited to integration/e2e tests (see the Playwright item in the README
  // roadmap) rather than being force-fit into unit test coverage numbers.
  collectCoverageFrom: [
    'src/lib/**/*.ts',
    'src/context/**/*.tsx',
    'src/components/**/*.tsx',
    '!src/**/*.d.ts',
    // Thin singleton clients configured purely from environment variables —
    // there is no meaningful logic here to unit test.
    '!src/lib/prisma.ts',
    '!src/lib/stripe.ts',
  ],
};

export default createJestConfig(customJestConfig);
