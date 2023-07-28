"use client"

import { useState } from "react"


type TodoItemProps = {
    id: string
    title: string
    complete: boolean
    toggleTodo: (id: string, complete: boolean) => void
}
//*What my todoitem components looks like when I call it in other functions
//*onChange event listener is used to toggle the todo item and pass an id to the database

async function deleteTodo(id: string) {
    const response = await fetch(`/api/delete/${id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        console.log("deleted")
    }
    else {
        console.log("not deleted")
    }
}

export function TodoItem({ id, title, complete, toggleTodo }: TodoItemProps) {
    const [checked, setChecked] = useState(complete)

    return <li className="flex gap-1 items-center">
        <input
            id={id}
            type="checkbox"
            className="cursor-pointer peer"
            defaultChecked={complete}
            onChange={e => {toggleTodo(id, e.target.checked); setChecked(e.target.checked);}}
        />
        <label
            htmlFor={id}
            className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
        >
            {title}
        </label>
        {checked ? 
        <button onClick={() => deleteTodo(id)}>Delete</button> : null}

    </li>
}