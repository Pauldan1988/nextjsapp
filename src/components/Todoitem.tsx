"use client"

import { todo } from "node:test"
import { useState, useReducer } from "react"
import { useContext } from "react"
import { TasksDispatchContext } from "./TasksContext"
//*useState is a react hook that allows you to use state in a functional component



type TodoItemProps = {
    task: {
        id: string
        title: string
        complete: boolean
    }
}
//*What my todoitem components looks like when I call it in other functions
//*onChange event listener is used to toggle the todo item and pass an id to the database


export default function TodoItem({task}:TodoItemProps) {
    const [edit, setEdit] = useState("")
    const dispatch = useContext(TasksDispatchContext);  

    return <li className="flex gap-1 items-center">
        <input
            id={task.id}
            type="checkbox"
            className="cursor-pointer peer"
            checked={task.complete}
            //@ts-ignore
            onChange={e => dispatch({
                type: 'changed',
                task: {
                  ...task,
                  complete: e.target.checked
                }
              })}
        />
        <label
            htmlFor={task.id}
            className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
        >
            {task.title}
        </label>
        {task.complete ? 
        //@ts-ignore
        <button onClick={() => dispatch({
            type: 'deleted',
            id: task.id
          })}>Delete</button> : null}
        {task.complete ?
        //@ts-ignore
        <button onClick={() => dispatch({
            type: 'changed',
            task: {
                ...task,
            }
        })}>Edit</button> : null}

    </li>
}



// -Add Change button to the todo item in Todoitem.tsx

// -Link ID and data to the button(Change route)

// -Create handleChange event function for the FormEvent

// -All of this is using the useState function

// -Add a save button to save the changed task(otherwise I will have to send a PATCH request on each changeEvent

// -Make the necessary prisma operations and then send back a good response

// -Add in the text content of the task for the PATCH request for my changed route