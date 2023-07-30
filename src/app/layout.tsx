"use client"

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { TasksContext, TasksDispatchContext, tasksReducer } from '../components/TasksContext'
import { useReducer, useEffect, useState } from 'react'
import axios from 'axios'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

// const [initialTasks, setTasks] = useState([])

useEffect( () => {
  axios.get('http://localhost:3000/api/getall')
  .then(res => {
    dispatch({ type: "getData", payload: { data: res.data } });
  })
}, [])

  const [tasks, dispatch] = useReducer(
    tasksReducer,
    []
  );
  return (

    <html lang="en">
      <body className={`${inter.className} bg-slate-800 text-slate-100 container mx-auto p-4`}>
        <TasksContext.Provider value={tasks}>
          <TasksDispatchContext.Provider value={dispatch}>
            {children}
          </TasksDispatchContext.Provider>
        </TasksContext.Provider>
      </body>
    </html>
  )
}
