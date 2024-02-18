import { useEffect, createContext, useState } from 'react';
import '../styles/Home.css'
import Navbar from './Navbar';
import TaskList from './TaskList';
import useFetch from '../useFetch';
import Dashboard from './Dashboard';
import SearchBar from './SearchBar';

// creating a globally available context
export const TasksContext = createContext();

const Home = () => {

    // if logged in then fetch data from the url
    const { data, isLoading, failedLoading, errorMessage } = useFetch(`${process.env.REACT_APP_API_URL}/tasks`);
    const [completed, setCompleted] = useState(0);
    const [tasks, setTasks] = useState([]);

    // whenever data gets updated, update the value inside
    useEffect(() => {
        // check if data received
        // check for data.tasks in case api sends back any other info
        if (!data || !data.tasks) return;
        // count all tasks with done as true
        setCompleted(data.tasks.filter(task => task.done).length);
        setTasks(data.tasks || []);
    }, [data]);

    // storing the search bar string here to let task-list use it
    const [search, setSearch] = useState('');

    return (
        <>
            <Navbar />
            <div className="home">
                {/* allow child components to use and change the context value */}
                {/* also using the task state for searching */}
                <TasksContext.Provider value={{ completed, setCompleted }}>
                    {/* always load dashboard and searchbar even when tasks not fetched */}
                    <Dashboard tasks={ tasks } />
                    <SearchBar search={ search } setSearch={ setSearch } />
                    <TaskList tasks={ tasks } search={ search } />
                </TasksContext.Provider>
                
                { isLoading && <p className='message loading'>loading tasks...</p> }
                { failedLoading && <p className='message error'>{ errorMessage }</p> }
                { !failedLoading && tasks.length === 0 && <p className='message no-tasks'>no tasks yet...</p> }
                
            </div> 
        </>
    );
}
 
export default Home;