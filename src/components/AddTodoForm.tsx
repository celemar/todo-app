'use client'
import { useState } from 'react';

interface AddTodoFormProps {
  onAddTodo: (text: string) => void;
}

export default function AddTodoForm({onAddTodo}: AddTodoFormProps) {
  const [newTodo, setNewTodo] = useState('');
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if(newTodo.trim() !== '') {
      onAddTodo(newTodo.trim());
      setNewTodo('');
    }
  }

  return (
    <form onSubmit={handleAddTodo} className='rounded'>
      <input type="text" name='newTodo' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder='Create a new todo...' aria-label='Create a new todo' className='w-full border-none py-4 md:py-5 rounded text-[#484b6a] dark:text-[#cacde8] pl-[4.5rem] dark:bg-[#25273c] bg-[#ffffff] dark:placeholder-[#777a92] focusable text-sm md:text-base font-bold placeholder:font-normal' />
    </form>
  )
}
