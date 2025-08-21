import { db } from '@/db';
import { tasks } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { title, description, completed } = await request.json();
  const updatedTask = await db.update(tasks).set({ title, description, completed, updatedAt: new Date() }).where(eq(tasks.id, parseInt(params.id))).returning();
  return NextResponse.json(updatedTask[0]);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const deletedTask = await db.delete(tasks).where(eq(tasks.id, parseInt(params.id))).returning();
  return NextResponse.json(deletedTask[0]);
}