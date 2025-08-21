import { db } from '@/db';
import { tasks } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { title, description, completed } = await request.json();
  const id = await Promise.resolve(params.id);
  const updatedTask = await db.update(tasks).set({ title, description, completed, updatedAt: new Date() }).where(eq(tasks.id, parseInt(id))).returning();
  return NextResponse.json(updatedTask[0]);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = await Promise.resolve(params.id);
  const deletedTask = await db.delete(tasks).where(eq(tasks.id, parseInt(id))).returning();
  return NextResponse.json(deletedTask[0]);
}