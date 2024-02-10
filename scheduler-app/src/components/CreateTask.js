import Navbar from "./Navbar";
import '../styles/User.css'; // to create the form
import '../styles/CreateTask.css' // to make slight changes to the form
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getLocalStorage from "../getLocalStorage";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const CreateTask = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState(false);
    const [currentDate, setCurrentDate] = useState(Date.now());

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
                duration: flag ? date : undefined
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
                            <label>Duration</label>
                            <div className="date-container">
                                {/* react-datetimepicker dependency gives many features such as these */}
                                <DatePicker 
                                    className="date-picker"
                                    onChange={ date => setDate(date) }
                                    minDate={ currentDate }
                                    selected={ date }
                                    dateFormat={"dd/mm/yyyy hh:mm aa"}
                                    showTimeSelect
                                    isClearable
                                />
                            </div>
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