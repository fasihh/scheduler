import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getLocalStorage from '../getLocalStorage';
import '../styles/Home.css'
import Navbar from './Navbar';
import TaskList from './TaskList';
import useFetch from '../useFetch';

const Home = () => {
    const navigate = useNavigate();
    const userData = getLocalStorage();

    // check to see if user is logged in
    useEffect(() => {
        // if token doesn't exist then navigate to signin
        if (!userData.token) navigate('/signin');
    }, [navigate, userData.token]);

    const { data, isLoading, failedLoading, errorMessage } = useFetch(`${process.env.REACT_APP_API_URL}/tasks`);

    return (
        <>
            <Navbar />
            <div className="home">
                { isLoading && <p className='message loading'>loading tasks...</p> }
                { failedLoading && <p className='message error'>{ errorMessage }</p> }
                { data && data.count !== 0 && <TaskList tasks={ data.tasks } count={ data.count }/> }
                { data && data.count === 0 && <p className='message no-tasks'>no tasks yet...</p> }
            </div> 
        </>
    );
}
 
export default Home;