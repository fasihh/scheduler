import Navbar from "./Navbar";
import '../styles/User.css'; // to create the form
import '../styles/CreateTask.css' // to make slight changes to the form
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getLocalStorage from "../getLocalStorage";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const CreateTask = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState(new Date());
    const [priority, setPriority] = useState(1);
    const [error, setError] = useState(false);
    const [currentDate, setCurrentDate] = useState(Date.now());

    // check to see if user isn't logged in
    useEffect(() => {
        // if doesn't exists then navigate to signin
        if (!getLocalStorage().token) navigate('/signin');
    }, [navigate, getLocalStorage().token]);

    // dont let user pick dates before now
    const filterTime = time => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    }

    const handleCreate = e => {
        e.preventDefault();

        let flag = true;
        if (date === null || new Date(currentDate).toISOString().split('.')[0] === date.toISOString().split('.')[0]) 
            flag = false;

        fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Application': 'application/json',
                'Authorization': `Bearer ${getLocalStorage().token}`
            },
            body: JSON.stringify({ 
                title: title,
                content: content,
                deadline: flag ? date : undefined,
                priority: priority
            })
        })
        .then(res => {
            // make error show on the form
            if (!res.ok) throw new Error();
            navigate('/');
        })
        .catch(err => setError(true));
    }

    return (
        <>
            <Navbar />
            <div className="user-form">
                <div className="form-container">
                    <form>
                        <div className="form-input">
                            <label>Title{ error && <p className="error">* this field is required</p> }</label>
                            <input 
                                type="text" 
                                required
                                value={ title }
                                // e is the default on click element that gets passed
                                // since it's input, it has a property called value
                                onChange={ e => setTitle(e.target.value) }
                            />
                        </div>
                        <div className="form-input">
                            <label>Content</label>
                            <input 
                                type="text"
                                value={ content }
                                onChange={ e => setContent(e.target.value) }
                            />
                        </div>
                        <div className="form-input">
                            <label>Deadline</label>
                            <div className="date-container">
                                {/* react-datetimepicker dependency gives many features such as these */}
                                <DatePicker 
                                    className="date-picker"
                                    onChange={ date => setDate(date) }
                                    minDate={ currentDate }
                                    filterTime={ filterTime }
                                    selected={ date }
                                    dateFormat={"dd/MM/yyyy hh:mm aa"}
                                    showTimeSelect
                                    isClearable
                                    // disable input in this field
                                    onKeyDown={e => e.preventDefault()}
                                />
                            </div>
                        </div>
                        <div className="form-input">
                            <label>Priority</label>
                            <select 
                                name="priority"
                                value={ priority }
                                onChange={ e => setPriority(e.target.value) }
                            >
                                <option value={ 2 }>High</option>
                                <option value={ 1 }>Medium</option>
                                <option value={ 0 }>Low</option>
                            </select>
                            {/* <input 
                                type="text"
                                value={ priority }
                                onChange={ e => setContent(e.target.value) }
                            /> */}
                        </div>
                    </form>
                        <button onClick={ handleCreate }>Create Task</button>
                        {/* <button className="remove">Clear All</button> */}
                </div>
            </div>
        </>
    );
}
 
export default CreateTask;