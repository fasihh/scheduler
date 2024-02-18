import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import getLocalStorage from "../getLocalStorage";
import NoteCard from "./NoteCard";
import '../styles/Home.css';
import '../styles/NotesList.css';

const NotesList = () => {
    const navigate = useNavigate();
    const userData = getLocalStorage();

    // check to see if user is logged in
    useEffect(() => {
        // if token doesn't exist then navigate to signin
        if (!userData.token) navigate('/signin');
    }, [navigate, userData.token]);

    const { data, isLoading, failedLoading, errorMessage } = useFetch(`${process.env.REACT_APP_API_URL}/notes`);
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!data || !data.notes) return;
        setNotes(data.notes);
    }, [data]);

    const handleCreate = () => {
        fetch(`${process.env.REACT_APP_API_URL}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Application': 'application/json',
                'Authorization': `Bearer ${getLocalStorage().token}`
            },
            body: JSON.stringify({ title: "New Note", content: "" })
        })
        .then(res => {
            if (!res.ok) throw new Error();
            window.location.reload();
        })
        .catch(err => setError(true));
    }

    return (
        <div className="home">
            <Navbar />
            <div className="notes">
                { <div className="notes-header">
                    <h2>Notes</h2>
                    { error && <p>error creating post</p>}
                    <button onClick={ handleCreate }>Create Note</button>
                </div> }
                { notes.map(note => <NoteCard note={ note } key={ note._id }/>)}
            </div>

            { isLoading && <p className='message loading'>loading notes...</p> }
            { failedLoading && <p className='message error'>{ errorMessage }</p> }
            { !failedLoading && notes.length === 0 && <p className='message no-tasks'>no notes yet...</p> }
        </div>
    );
}
 
export default NotesList;