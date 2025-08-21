import { db } from '@/db';
import { tasks } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'papaparse';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const fileText = await file.text();

  try {
    const parsed = parse(fileText, {
      header: true,
      skipEmptyLines: true,
    });

    const newTasks = parsed.data.map((row: any) => ({
      title: row.title,
      description: row.description,
      completed: row.completed === 'true',
    }));

    await db.insert(tasks).values(newTasks);

    return NextResponse.json({ message: 'Import successful' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to parse or import CSV' }, { status: 500 });
  }
}