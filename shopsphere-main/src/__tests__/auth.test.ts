/**
 * @jest-environment node
 *
 * This suite runs in the Node test environment (rather than the default
 * jsdom one) because `jose` relies on Node's native Web Crypto API, which
 * jsdom does not fully implement.
 */
import { cookies } from 'next/headers';
import { createAdminSession, getAdminSession, clearAdminSession } from '@/lib/auth';

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

/** A tiny in-memory stand-in for Next.js's cookie store. */
function createFakeCookieStore() {
  const store = new Map<string, string>();
  return {
    get: (name: string) =>
      store.has(name) ? { name, value: store.get(name) as string } : undefined,
    set: (name: string, value: string) => {
      store.set(name, value);
    },
    delete: (name: string) => {
      store.delete(name);
    },
  };
}

describe('admin session helpers', () => {
  let store: ReturnType<typeof createFakeCookieStore>;

  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret-for-jest-only';
    store = createFakeCookieStore();
    (cookies as jest.Mock).mockReturnValue(store);
  });

  it('creates a session and allows reading it back', async () => {
    await createAdminSession('admin@shopsphere.dev');
    const session = await getAdminSession();

    expect(session).not.toBeNull();
    expect(session?.email).toBe('admin@shopsphere.dev');
    expect(session?.role).toBe('admin');
  });

  it('returns null when there is no session cookie', async () => {
    const session = await getAdminSession();
    expect(session).toBeNull();
  });

  it('returns null after the session is cleared', async () => {
    await createAdminSession('admin@shopsphere.dev');
    clearAdminSession();

    const session = await getAdminSession();
    expect(session).toBeNull();
  });

  it('returns null for a tampered token', async () => {
    await createAdminSession('admin@shopsphere.dev');

    const cookie = store.get('shopsphere_admin_session');
    store.set('shopsphere_admin_session', `${cookie?.value}tampered`);

    const session = await getAdminSession();
    expect(session).toBeNull();
  });

  it('throws a clear error if JWT_SECRET is not configured', async () => {
    delete process.env.JWT_SECRET;
    await expect(createAdminSession('admin@shopsphere.dev')).rejects.toThrow(
      'JWT_SECRET environment variable is not set',
    );
  });
});
