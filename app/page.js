// import { getTodos } from '@/server/actions/todos';
import TodoInputForm from '@/components/TodoInputForm'

export default async function Home() {
  const todos = await fetch('http://127.0.0.1:3000/api/todo').then((res) =>
    res.json()
  )
  console.log('Todo', todos)

  return (
    <div>
      <h1>Home</h1>

      <TodoInputForm />
      <section className='max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md'>
        {todos.result?.map((todo) => (
          <div className='text-black' key={todo.id}>
            <h2 className={todo.completed && 'line-through'}>{todo.title}</h2>
            <p></p>
          </div>
        ))}
      </section>
    </div>
  )
}
