import { db } from '../../../db/db';
import { todosTable } from '../../../db/schema';

export const runtime = 'edge';

export async function GET() {
  const result = await db.select().from(todosTable);

  return Response.json({ result });
}

export async function POST(request) {
  const body = await request.json();

  const result = await db
    .insert(todosTable)
    .values({
      title: body.title,
      completed: body.completed,
    })
    .returning();

  return Response.json({ object: 'customer', data: result[0] });
}