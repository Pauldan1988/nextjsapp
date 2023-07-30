import { createContext } from 'react';
import axios from 'axios';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export function tasksReducer(tasks: any[], action: any) {
    switch (action.type) {
        case 'added': {
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
            return tasks.map(t => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return tasks.filter(t => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}