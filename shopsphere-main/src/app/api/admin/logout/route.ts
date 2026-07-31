import { NextResponse } from 'next/server';
import { clearAdminSession } from '@/lib/auth';

/** POST /api/admin/logout — clears the admin session cookie. */
export async function POST() {
  clearAdminSession();
  return NextResponse.redirect(
    new URL('/admin/login', process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'),
  );
}
