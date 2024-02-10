import Task from './Task';
import '../styles/TaskList.css'

const TaskList = ({ tasks, count }) => {
    return (
        <>
            <h2>{ count > 0 ? `all '${count}' task(s)` : "no tasks" }</h2>
            <div className="tasks-container">
                { tasks.map(task => {
                    return ( <Task task={ task } key={ task._id }/> );
                })}
            </div>
        </>
    );
}
 
export default TaskList;