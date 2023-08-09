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
  };
};
//*What my todoitem components looks like when I call it in other functions
//*onChange event listener is used to toggle the todo item and pass an id to the database

export default function TodoItem({ task }: TodoItemProps) {
  const [edit, setEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useContext(TasksDispatchContext);

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
        //@ts-ignore
        onChange={(e) =>
          dispatch({
            type: "changed",
            task: {
              ...task,
              complete: e.target.checked,
            },
          })
        }
      />

      {/* <input 
            
        /> */}
      <label
        htmlFor={task.id}
        className="group relative cursor-pointer peer-checked:line-through"
      >
        {task.title}
      </label>

      {showDelete ? (
        <div className="group relative group-hover: text-blue-300 font">
            {/* @ts-ignore */}
          <button
            onClick={() =>
              dispatch({
                type: "changed",
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
      {showDelete ? (
        <div className="group relative group-hover: text-red-600 font">
          {/* @ts-ignore */}
          <button
            onClick={() =>
              dispatch({
                className: "text-red-500",
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

//// -Add Change button to the todo item in Todoitem.tsx

// -Link ID and data to the button(Change route)

// -Create handleChange event function for the FormEvent

// -All of this is using the useState function

// -Add a save button to save the changed task(otherwise I will have to send a PATCH request on each changeEvent

// -Make the necessary prisma operations and then send back a good response

// -Add in the text content of the task for the PATCH request for my changed route

// save button onclick event handler

// isEditing Boolean
// Not editing. As a p tag or a label?
// true = save

// state object will be toggled

// if edit = true, render save button(and input)
// if edit = false, render edit button(and label)

// -Edit button

// -Create handle change function(Takes in FormEvent, Sets newTitle State). Goes in the new input field on Todoitem.tsx

// -New state object called newTitle

// -Dispatching a resolver update title, which will hit API endpoint, which will mutate Prisma database

// -Save button
