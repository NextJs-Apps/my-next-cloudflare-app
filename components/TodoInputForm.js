'use client'
import React, { useState } from 'react';
import { revalidatePath } from 'next/cache';

export default function TodoInputForm() {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted:', { title, completed });
    const res = await fetch('http://localhost:3000/api/todo',{
      method: 'POST',
      body: JSON.stringify({ title, completed }),
      headers: {
        'content-type': 'application/json'
      }
    })
    if(res.ok){
      console.log("Yeai!")
      setTitle('');
      setCompleted(false);
    }else{
      console.log("Oops! Something is wrong.")
    }
    // Here you can add your logic to handle the form submission
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 text-indigo-400"
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="mr-2 rounded"
          />
          <span className="text-sm text-gray-700">Completed</span>
        </label>
      </div>
      <button
        type="submit"
        className="w-full px-3 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
      >
        Submit
      </button>
    </form>
  );
}

