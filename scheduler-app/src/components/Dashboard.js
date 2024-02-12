import { useState, useEffect, useContext } from 'react';
import getLocalStorage from '../getLocalStorage';
import '../styles/Dashboard.css';
import { TasksContext } from './Home';

const Dashboard = ({ tasks }) => {
    // storing counts for task info
    const { completed } = useContext(TasksContext);

    const [deadlines, setDeadlines] = useState(0);
    const [failedDeadlines, setFailedDeadlines] = useState(0);
    const [priorities, setPriorities] = useState({
        high: 0,
        medium: 0,
        low: 0
    });

    // on first time load, calculate tasks info
    useEffect(() => {
        // don't calculate anything if tasks not loaded
        if (!tasks) return;

        let high = 0, medium = 0, low = 0, nearDeadlines = 0, failedDeadlines = 0;
        tasks.forEach(task => {
            // counting different priorities
            if (task.priority === 2) high++;
            else if (task.priority === 1) medium++;
            else if (task.priority === 0) low++;

            // subtract deadline date with current date
            const deltaTime = (new Date(task.deadline) - new Date()) / (1000*60*60);

            // deadline nearing if deltaTime less than or 6
            if (deltaTime <= 6 && !task.done) nearDeadlines++;
            // if current date more than deadline
            else if (deltaTime < 0 && !task.done) failedDeadlines++;
        }, []);

        setDeadlines(nearDeadlines);
        setFailedDeadlines(failedDeadlines);
        setPriorities({ high, medium, low });
    }, [tasks]);

    return (
        <div className="dashboard">
            <h1>Welcome, { getLocalStorage().username }!</h1>
            <h2>Total tasks { tasks.length }</h2>
            <div className="details">
                <div className="detail">
                    <h2 className="detail-title">Completed</h2>
                    <div className="detail-content">{ completed }</div>
                </div>
                <div className="detail">
                    <h2 className="detail-title">High priority</h2>
                    <div className="detail-content">{ priorities.high }</div>
                </div>
                <div className="detail">
                    <h2 className="detail-title">Medium priority</h2>
                    <div className="detail-content">{ priorities.medium }</div>
                </div>
                <div className="detail">
                    <h2 className="detail-title">Low priority</h2>
                    <div className="detail-content">{ priorities.low }</div>
                </div>
            </div>
            <h2>Deadlines</h2>
            <div className="details">
                <div className="detail">
                    <h2>Deadlines near</h2>
                    <div className='detail-content'>{ deadlines || "none" }</div>
                </div>
                <div className="detail">
                    <h2>Deadlines failed</h2>
                    <div className='detail-content'>{ failedDeadlines || "none" }</div>
                </div>
            </div>
        </div>
    );
}
 
export default Dashboard;