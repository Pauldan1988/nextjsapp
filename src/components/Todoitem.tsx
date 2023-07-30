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
    // const [checked, setChecked] = useState(complete)
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

    </li>
}