import { db } from '@/server/db/db';
import { todosTable } from '@/server/db/schema';

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

  return Response.json({ object: 'todos', data: result[0] });
}