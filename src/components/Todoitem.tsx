"use client";

import { todo } from "node:test";
import { useState, useReducer } from "react";
import { useContext } from "react";
import { TasksDispatchContext } from "./TasksContext";
//*useState is a react hook that allows you to use state in a functional component

type TodoItemProps = {
    task: {
        id: string;
        title: string;
        complete: boolean;
        isEditing: boolean;
    };
};
//*What my todoitem components looks like when I call it in other functions
//*onChange event listener is used to toggle the todo item and pass an id to the database

export default function TodoItem({ task }: TodoItemProps) {
    const [edit, setEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const dispatch = useContext(TasksDispatchContext);

    function handleChange(e: React.FormEvent) {
        e.preventDefault()
        //@ts-ignore
        const title = e.target.title.value
        //@ts-ignore
        const id = e.target.id
        //@ts-ignore
        dispatch({
            type: "edited",
            task: {
                text: title,
                id: id,
            }
        })
    }

    return (
        <li
            onMouseEnter={() => setShowDelete(true)}
            onMouseLeave={() => setShowDelete(false)}
            className="flex gap-1 items-center"
        >
            <input
                id={task.id}
                type="checkbox"
                className="cursor-pointer peer"
                checked={task.complete}
                onChange={(e) =>
                    //@ts-ignore
                    dispatch({
                        type: "changed",
                        task: {
                            ...task,
                            complete: e.target.checked,
                        },
                    })
                }
            />
            <form onSubmit={handleChange}>
                <input
                    id={task.id}
                    type="text"
                    className="cursor-pointer peer"
                />
            </form>
            <label
                htmlFor={task.id}
                className="group relative cursor-pointer peer-checked:line-through"
            >
                {task.title}
            </label>

            {showDelete ? (
                <div className="group relative focus: text-slate-400 hover:text-blue-500">
                    <button
                        onClick={() =>
                            //@ts-ignore
                            dispatch({
                                type: "edited",
                                task: {
                                    ...task,
                                },
                            })
                        }
                    >
                        Edit
                    </button>
                </div>
            ) : null}
                <div className="group relative focus: text-slate-400 hover:text-blue-500">
                    <button
                        onClick={() =>
                            //@ts-ignore
                            dispatch({
                                type: "saved",
                                title: task.title,
                                id: task.id,
                            })
                        }
                    >
                        Save
                        </button>
                    </div>
            {showDelete ? (
                <div className="group relative focus: text-slate-400 hover:text-red-500">
                    <button
                        onClick={() =>
                            //@ts-ignore
                            dispatch({
                                type: "deleted",
                                id: task.id,
                            })
                        }
                    >
                        Delete
                    </button>
                </div>
            ) : null}
        </li>
    );
}

//* if edit = true, render save button(and input)
//* if edit = false, render edit button(and label)

//// -isEdited Boolean

//// -Edit button

//// -Save button(otherwise I will have to send a PATCH request on each changeEvent)

// -New state object called newTitle

// -Create handle change function(Takes in FormEvent, Sets newTitle State). Goes in the new input field on Todoitem.tsx

// -Dispatching a resolver update title, which will hit API endpoint, which will mutate Prisma database

// -Make the necessary prisma operations and then send back a good response
