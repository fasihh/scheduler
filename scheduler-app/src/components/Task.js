import { useContext, useState } from 'react';
import '../styles/Task.css'
import getDate from '../getDate';
import getLocalStorage from '../getLocalStorage';
import { TasksStatusContext } from './Home';

const Task = ({ task }) => {
    const { completed, setCompleted } = useContext(TasksStatusContext);
    // this is used to update the task status when clicked
    const [done, setDone] = useState(task.done); 

    // update this task
    const handleUpdateTask = e => {
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
            console.log(task);

            if (done) {
                setDone(false);
                setCompleted(completed-1);
            } else {
                setDone(true);
                setCompleted(completed+1);
            }
            
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
            // reload page when deleted
            window.location.reload();
        })
        .catch(err => console.log('error in deleting task'));
    }

    return (
        <>
            <div 
                className="task-header" 
                style={ { 
                    'backgroundColor': done ? '#50c878' : '#b92e34',
                    'color': done ? '#222831' : '#DDDDDD'
                } }
            >
                { done ? "task completed" : "task pending" }
            </div>
            <div 
                className="task"
                style={ { 'borderColor': task.priority === 2 ? 'orange' : task.priority === 1 ? 'yellow' : 'greenyellow'} }
            >
                <div className="task-body">
                    <div className="task-main">
                        <button
                            className='status-button'
                            onClick={ task => handleUpdateTask(task) }
                            // green if done else red
                            style={ { 'backgroundColor': done ? '#50c878' : '#b92e34' } }
                        />
                        <div className="content">
                            <h1>{ task.title }</h1>
                            <p>{ task.content }</p>
                        </div>
                    </div>
                    <div className="task-extras">
                        <div className="extras-container">
                            <div className="detail">
                                <label>created at</label>
                                <p>{ getDate(task.timestamps.createdAt) }</p>
                            </div>
                            <div className="detail">
                                <label>deadline</label>
                                <p>{ task.deadline !== undefined ? getDate(task.deadline) : "no deadline" }</p>
                            </div>
                        </div>
                        <button onClick={ handleDeleteTask }>delete task</button>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Task;