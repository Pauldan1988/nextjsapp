import { createContext } from 'react';
import axios from 'axios';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export function tasksReducer(tasks: any[], action: any) {
    switch (action.type) {
        case 'added': {
            if(!action.text) { //Non nullable for the user to enter a task with a message
                alert("Please enter a task")
                return tasks
            }
            axios.post('http://localhost:3000/api/add', {title: action.text})
            return [...tasks, {
                id: action.id,
                title: action.text,
                complete: false
            }];
        }
        case 'getData': {
            return action.payload.data
        }
        case 'changed': {
            axios.patch('http://localhost:3000/api/changed', {id: action.task.id, complete: action.task.complete})
            return [...tasks, {
                id: action.task.id,
                complete: action.task.complete
            }]
        }
        case 'deleted': {
            console.log("action.id", action.id)
            axios.delete(`http://localhost:3000/api/delete/${action.id}`)
            return tasks.filter(t => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}