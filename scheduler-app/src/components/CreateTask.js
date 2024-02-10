import Navbar from "./Navbar";
import '../styles/CreateTask.css';
import { useState } from "react";

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [duration, setDuration] = useState('');

    const handleCreate = () => {

    }

    return (
        <>
            <Navbar />
            <div className="create-task">
                <form>
                    <div className="form-input">
                        <label>Title</label>
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
                        <input 
                            type="text"
                            value={ duration }
                            onChange={ e => setDuration(e.target.value) }
                        />
                    </div>
                </form>
                <button onClick={ handleCreate }>Create Task</button>
            </div>
        </>
    );
}
 
export default CreateTask;