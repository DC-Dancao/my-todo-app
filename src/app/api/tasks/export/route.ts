import { db } from '@/db';
import { tasks } from '@/db/schema';
import { NextResponse } from 'next/server';
import type { InferSelectModel } from 'drizzle-orm';

type Task = InferSelectModel<typeof tasks>;

function convertToCSV(data: Task[]) {
  if (data.length === 0) {
    return "";
  }
  const headers = Object.keys(data[0]) as (keyof Task)[];
  const rows = data.map(obj =>
    headers.map(header =>
      JSON.stringify(obj[header])
    ).join(',')
  );
  return [headers.join(','), ...rows].join('\n');
}

export async function GET() {
  const allTasks = await db.select().from(tasks);
  if (allTasks.length === 0) {
    return new NextResponse("No tasks to export", { status: 404 });
  }
  const csv = convertToCSV(allTasks);
  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="tasks.csv"',
    },
  });
}