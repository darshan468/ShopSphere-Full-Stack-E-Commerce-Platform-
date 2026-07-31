import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createAdminSession } from '@/lib/auth';

/** POST /api/admin/login — verifies admin credentials and starts a session. */
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash);

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  await createAdminSession(admin.email);
  return NextResponse.json({ success: true });
}
