"use client";

import { useState, useReducer, useEffect } from "react";
import { useContext } from "react";
import { TasksDispatchContext } from "./TasksContext";
import { useRouter } from "next/navigation";
import { GenericHTMLFormElement } from "axios";
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
  const [showDelete, setShowDelete] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const dispatch = useContext(TasksDispatchContext);
  const router = useRouter();

  function handleEditClick(e: React.FormEvent) {
    e.preventDefault();
    setIsEditing(true)
    setShowSaveButton(true)
  }


  function handleChange(e: React.FormEvent) {
    e.preventDefault();
    const title = e.target.title.value
    setNewTitle(title);
    setIsEditing(false);
    //@ts-ignore
    dispatch({
      type: "edited",
      task: {
        ...task,
        title: title,
      }
    })
  }
  // console.log(handleChange)
  // console.log("handleEditClick", handleEditClick)
  return (

    <li
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      className="flex gap-1 items-center"
    >
      <div className="flex space-x-1">
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

        <label
          htmlFor={task.id}
          className="group relative cursor-pointer peer-checked:line-through"
        >
          {task.title}
        </label>

        {isEditing ? (
          <form onSubmit={handleChange} className="flex space-x-1">
            <input
              id={task.id}
              type="text"
              name="title"
              placeholder="Edit To-Do"
              className=" flex gap-2 flex-col w-1rem text-black"
            />
            <div className="group relative focus: text-slate-400 hover:text-blue-500">
              <button
                type="submit"
                className="flex text-left"
                onClick={(e) =>
                  setNewTitle(e.target.value)
                }
              >
                Save
              </button>
            </div>
          </form>
        ) : isEditing || showDelete ? (
          <div className="group relative focus: text-slate-400 hover:text-blue-500">
            {/* {task.id} */}

            <button
              name="Edit"
              onClick={handleEditClick}
            >
              Edit
            </button>
          </div>
        ) : showDelete}
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
      </div>

    </li>
  );
}

{/* {showDelete ? (
          <div className="group relative focus: text-slate-400 hover:text-blue-500">
            <button
              onClick={() =>
                handleEditClick(task)
              }
            >
              Edit
            </button>
          </div>
        ) : isEditing ? (
          <div className="group relative focus: text-slate-400 hover:text-blue-500">
          <button
            onClick={() =>
              setIsEditing(false) 
            }
          >
            Save
          </button>
        </div>
          ) : null} */}



//* if edit = true, render save button(and input)
//* if edit = false, render edit button(and label)

//// -isEdited Boolean

//// -Edit button

//// -Save button(otherwise I will have to send a PATCH request on each changeEvent)

//// -New state object called newTitle

//// -Create handle change function(Takes in FormEvent, Sets newTitle State). Goes in the new input field on Todoitem.tsx

// -Dispatching a resolver update title, which will hit API endpoint, which will mutate Prisma database

//// -Make the necessary prisma operations and then send back a good response



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



{/* // if(isEditing) {
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
// } */}

{/* //  dispatchSetState(fiber, queue, action) {
//   {
//     if (typeof arguments[3] === 'function') {
//       error("State updates from the useState() and useReducer() Hooks don't support the " + 'second callback argument. To execute a side effect after ' + 'rendering, declare it in the component body with useEffect().');

// const [todoToEdit, setTodoToEdit] = useState(null);
// const [showSaveButton, setShowSaveButton] = useState(false);

// function handleEditClick(todo: any) {
//   setShowSaveButton(true)
//   setTodoToEdit(todo);
// } */}

{/* <label
        htmlFor={task.id}
      >
        {task.title}
      </label> */}