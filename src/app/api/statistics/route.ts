import { db } from '@/db';
import { tasks } from '@/db/schema';
import { count, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const totalTasks = await db.select({ value: count() }).from(tasks);
  const completedTasks = await db.select({ value: count() }).from(tasks).where(eq(tasks.completed, true));

  const completionRate = totalTasks[0].value === 0 ? 0 : (completedTasks[0].value / totalTasks[0].value) * 100;

  return NextResponse.json({
    totalTasks: totalTasks[0].value,
    completedTasks: completedTasks[0].value,
    completionRate,
  });
}