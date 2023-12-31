import { createContext } from 'react';
import axios from 'axios';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export function tasksReducer(tasks: any[], action: any) {
  switch (action.type) {
    case 'added': {
      if (!action.text) { //Non nullable for the user to enter a task with a message
        alert("Please enter a task")
        return tasks
      }
      axios.post('http://localhost:3000/api/add', { title: action.text })
      return [...tasks, {
        id: action.id,
        title: action.text,
        complete: false
      }];
    }
    case 'getData': {
      axios.get('http://localhost:3000/api/getall')
      return action.payload.data
    }
    case 'changed': {
      axios.patch('http://localhost:3000/api/changed', { id: action.task.id, complete: action.task.complete })
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'edited': {
      axios.put("http://localhost:3000/api/edited", { id: action.task.id, title: action.task.title})
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      console.log("action.id", action.id)
      axios.delete(`http://localhost:3000/api/delete/${action.id}`)
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ', action.type);
    }
  }
}