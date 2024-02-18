import { useState } from 'react';
import '../styles/User.css'
import '../styles/NoteEdit.css'
import getLocalStorage from '../getLocalStorage';
import { useNavigate } from 'react-router-dom';

const NoteEdit = ({ note }) => {
    const navigate = useNavigate();

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [error, setError] = useState(false);

    const handleUpdate = e => {
        e.preventDefault();

        if (title.length === 0) {
            setError(true);
            return;
        }

        fetch(`${process.env.REACT_APP_API_URL}/notes/${note._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Application': 'application/json',
                'Authorization': `Bearer ${getLocalStorage().token}`
            },
            body: JSON.stringify({ title, content })
        })
        .then(res => {
            if (!res.ok) throw new Error();
            navigate('/notes');
        })
        .catch(err => {
            setError(true)
        });
    }

    return (
        <>
            <div className="user-form">
                <div className="form-container note">
                    <h1>Edit Note</h1>
                    <form onSubmit={ handleUpdate }>
                        <div className="form-input note">
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
                        <div className="form-input note">
                            <textarea 
                                spellCheck="false"
                                value={ content }
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </div>
                    </form>
                    
                    <div className="button-container">
                        <button onClick={ handleUpdate }>Save Note</button>
                        <button onClick={ () => navigate('/notes') }>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default NoteEdit;