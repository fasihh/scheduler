import Task from './Task';
import '../styles/TaskList.css';
import { useState } from 'react';

const TaskList = ({ tasks, search }) => {
    const [checked, setChecked] = useState('time');

    const regexp = RegExp(`.*${search.split(' ').join('|')}.*`, 'igm');

    const handleSort = e => {
        setChecked(e.target.value);

        // sorting tasks by time
        if (e.target.value === 'time') {
            tasks.sort((a, b) => {
                return (a.timestamps.createdAt < b.timestamps.createdAt) ? 1 : (a.timestamps.createdAt > b.timestamps.createdAt) ? -1 : 0;
            });
            console.log(checked);
            return;
        }

        // sorting tasks by priority
        tasks.sort((a, b) => {
            return (a.priority < b.priority) ? 1 : (a.priority > b.priority) ? -1 : 0;
        });
    }

    return (
        <>
            {/* show sorting options only when tasks show */}
            { tasks.length > 0 && 
            <div className="tasks-options">
                <h2>Sort tasks by</h2>
                <div className="sort-options">
                    <label>
                        <input 
                            type="radio"
                            value="time"
                            checked={ checked === 'time' }
                            onChange={ handleSort }
                        />
                        Time (ASC)
                    </label>
                    <label>
                        <input 
                            type="radio"
                            value="priority"
                            checked={ checked === 'priority' }
                            onChange={ handleSort }
                        />
                        Priority
                    </label>
                </div>
            </div> 
            }
            <div className="tasks-container">
                { tasks
                    .filter(task => search ? regexp.test(task.title) ? task : undefined : task)
                    .map(task => {
                        return ( <Task task={ task } key={ task._id }/> );
                    })
                }
            </div>
        </>
    );
}
 
export default TaskList;
