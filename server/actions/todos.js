import { db } from '@/server/db/db'
import { todosTable } from '@/server/db/schema'

export const runtime = 'edge'

export const getTodos = async () => {
  'use server'
  console.log("Fetching todos");
  const todos = await db.select().from(todosTable)
  console.log("Todos",todos);
  
  return await db.select().from(todosTable)
}

export const createTodo = async (formData) => {
  if (!formData.title) {
    throw new Error('Title is required')
  }

  console.log(formData)

  try {
    await db.insert(todosTable).values({
      title: formData.title,
      completed: formData.completed ?? false,
    })

    console.log('Todo inserted successfully.')
  } catch (error) {
    console.error('Error inserting todo:', error)
  } finally {
    // revalidatePath('/');
  }
}

export async function deleteTodo(id) {
  try {
    await db.delete(todosTable).where({ id })
    // revalidatePath('/');
  } catch (error) {
    console.error('Failed to delete todo:', error)
    throw new Error('Failed to delete todo')
  }
}
