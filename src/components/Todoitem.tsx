"use client";

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
  const [showDelete, setShowDelete] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useContext(TasksDispatchContext);


  function handleChange(e: React.FormEvent) {
    e.preventDefault();
    const title = e.target.title.value;
    const setIsEditing = e.target.isEditing; 
    console.log(e.target.isEditing)
  }

  
  return (
    <li
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      className="flex gap-1 items-center"
    >
      <form onSubmit={handleChange}>
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

        {isEditing ? (
          <div className="group relative focus: text-slate-400 hover:text-blue-500">
          <input
            type="text"
            value={newTitle}
            onChange={(e) =>
              //@ts-ignore
              dispatch({
                type: "edited",
                task: {
                  ...task,
                  title: e.target.value
                }
              })
            }
          />
          
          <button
            onClick={() =>
              setIsEditing(true)
            }
          >
            Edit
          </button>
        </div>
        ) : null}

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
                  setNewTitle("")
                }
              >
                Edit
              </button>
            </div>
          ) : null}
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
        </form>
    </li>
  );
}

//! Keep going man. You've got this. Don't give up. You're going to be a developer.

//* if edit = true, render save button(and input)
//* if edit = false, render edit button(and label)

//// -isEdited Boolean

//// -Edit button

//// -Save button(otherwise I will have to send a PATCH request on each changeEvent)

//// -New state object called newTitle

// -Create handle change function(Takes in FormEvent, Sets newTitle State). Goes in the new input field on Todoitem.tsx

// -Dispatching a resolver update title, which will hit API endpoint, which will mutate Prisma database

// -Make the necessary prisma operations and then send back a good response



{/* {showDelete ? (
        //! This button is for editing the todo item and goes with the input field above
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
      ) : null} */}



    // if(isEditing) {
    //   return (
    //     <form onSubmit={handleChange}>
    //       <input
    //         type="text"
    //         name="title"
    //         value={task.title}
    //         className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
    //       />
    //       <div className="flex gap-1 justify-end">
    //         <button
    //           type="submit"
    //           className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
    //         >Save</button>
    //       </div>
    //     </form>
    //   )
    // } else {
    //   return (
    //     <form onSubmit={handleChange}>
    //       <input
    //         type="text"
    //         name="title"
    //         value={task.title}
    //         className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
    //       />
    //       <div className="flex gap-1 justify-end">
    //         <button
    //           type="submit"
    //           className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
    //         >Edit</button>
    //       </div>
    //     </form>
    //   )
    // }