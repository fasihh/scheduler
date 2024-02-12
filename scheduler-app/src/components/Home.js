import { useEffect, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getLocalStorage from '../getLocalStorage';
import '../styles/Home.css'
import Navbar from './Navbar';
import TaskList from './TaskList';
import useFetch from '../useFetch';
import Dashboard from './Dashboard';

export const TasksStatusContext = createContext();

const Home = () => {
    const navigate = useNavigate();
    const userData = getLocalStorage();

    // check to see if user is logged in
    useEffect(() => {
        // if token doesn't exist then navigate to signin
        if (!userData.token) navigate('/signin');
    }, [navigate, userData.token]);

    // if logged in then fetch data from the url
    const { data, isLoading, failedLoading, errorMessage } = useFetch(`${process.env.REACT_APP_API_URL}/tasks`);
    const [completed, setCompleted] = useState(0);
    const [tasks, setTasks] = useState([]);

    // whenever data gets updated, update the value inside
    useEffect(() => {
        if (!data) return;
        // count all tasks with done as true
        setCompleted(data.tasks.filter(task => task.done).length);
        setTasks(data.tasks);
    }, [data]);

    return (
        <>
            <Navbar />
            <div className="home">
                {/* allow child components to use and change the context value */}
                <TasksStatusContext.Provider value={{ completed, setCompleted }}>
                    {/* always load dashboard even when tasks not fetched */}
                    <Dashboard tasks={ tasks } />
                    <TaskList tasks={ tasks }/>
                </TasksStatusContext.Provider>
                
                { isLoading && <p className='message loading'>loading tasks...</p> }
                { failedLoading && <p className='message error'>{ errorMessage }</p> }
                
                { tasks.length === 0 && <p className='message no-tasks'>no tasks yet...</p> }
                
            </div> 
        </>
    );
}
 
export default Home;