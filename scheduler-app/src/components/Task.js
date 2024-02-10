import { useState } from 'react';
import '../styles/Task.css'
import getDate from '../getDate';
import getLocalStorage from '../getLocalStorage';

const Task = ({ task }) => {
    // this is used to update the task status when clicked
    const [done, setDone] = useState(task.done); 

    // update this task
    const handleUpdateTask = () => {
        fetch(`${process.env.REACT_APP_API_URL}/tasks/${task._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Application': 'application/json',
                'Authorization': `Bearer ${getLocalStorage().token}`
            },
            body: JSON.stringify({ done: !done })
        })
        .then(res => {
            if (!res.ok) throw new Error();
            setDone(!done);
            return res.json();
        })
        .catch(err => console.log('error in updating task'));
    }

    const handleDeleteTask = () => {
        fetch(`${process.env.REACT_APP_API_URL}/tasks/${task._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Application': 'application/json',
                'Authorization': `Bearer ${getLocalStorage().token}`
            }
        })
        .then(res => {
            if (!res.ok) throw new Error();
            window.location.reload();
        })
        .catch(err => console.log('error in deleting task'));
    }

    return (
        <div className="task">
            <div className="task-main">
                <button
                    onClick={ handleUpdateTask }
                    // green if done else red
                    style={ { 'color': done ? '#50c878' : '#b92e34' } }
                >
                    { done ? "done" : "not done" }
                </button>
                <div className="task-content">
                    <h2>{ task.title }</h2>
                    <p>{ task.content }</p>
                </div>
            </div>
            <div className="task-extras">
                <button onClick={ handleDeleteTask }>delete task</button>
                <p>duration - { task.duration || "no duration" }</p>
                <p>created - { getDate(task.timestamps.createdAt) }</p>
            </div>
        </div>
    );
}
 
export default Task;