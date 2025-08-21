import { db } from '@/db';
import { tasks } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const allTasks = await db.select().from(tasks).orderBy(desc(tasks.createdAt));
  return NextResponse.json(allTasks);
}

export async function POST(request: Request) {
  const { title, description } = await request.json();
  const newTask = await db.insert(tasks).values({ title, description }).returning();
  return NextResponse.json(newTask[0]);
}