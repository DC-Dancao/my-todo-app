import { db } from '@/db';
import { tasks } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'papaparse';
import type { InferInsertModel } from 'drizzle-orm';

type NewTask = InferInsertModel<typeof tasks>;

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const fileText = await file.text();

  try {
    const parsed = parse<NewTask>(fileText, {
      header: true,
      skipEmptyLines: true,
      transform: (value: string, header: string) => {
        if (header === 'completed') {
          return value.toLowerCase() === 'true';
        }
        return value;
      }
    });

    await db.insert(tasks).values(parsed.data);

    return NextResponse.json({ message: 'Import successful' });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to parse or import CSV', details: (e as Error).message }, { status: 500 });
  }
}