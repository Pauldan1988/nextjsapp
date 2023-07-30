"use client"

import Link from 'next/link'
import TodoItem from '@/components/Todoitem'
import { useContext } from 'react'
import { TasksContext } from '@/components/TasksContext'


export default function Home() {
  const todos = useContext(TasksContext) //* Calling database in a react component. Use Effect, Use State, onChange event listeners cannot be used otherwise you cannot query database from a react component
  console.log(todos)
  return (
  <>
  <header className="flex justify-between items-center mb-4">
    <h1 className="text-2xl">Todos</h1>
    <Link 
    className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none" 
    href="/new"
    >
      New
    </Link>
  </header>
  
  <ul className="pl-4">  
    {todos.map(todo =>(
      <TodoItem key={todo.id} task={todo} />
    ))}
  </ul>
  </>

)}
