import Task from './Task';

const TaskList = ({ tasks }) => {
    return (
        <>
        { tasks.map(task => {
            return ( <Task task={ task } key={ task._id }/> );
        })}
        </>
    );
}
 
export default TaskList;