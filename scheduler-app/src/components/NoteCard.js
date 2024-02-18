import { Link } from 'react-router-dom';
import getDate from '../getDate';
import '../styles/NoteCard.css';
import getLocalStorage from '../getLocalStorage';

const NoteCard = ({ note }) => {
    const createdAt = getDate(note.timestamps.createdAt), updatedAt = getDate(note.timestamps.updatedAt);

    const handleDelete = () => {
        fetch(`${process.env.REACT_APP_API_URL}/notes/${note._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Application': 'application/json',
                'Authorization': `Bearer ${getLocalStorage().token}`
            }
        })
        .then(res => {
            if (!res.ok) throw new Error();
            window.location.reload();
        })
        .catch(err => console.log('error in deleting'));
    }

    return (
        <div className="note-container">
            <Link to={`/notes/${note._id}`} className="note-card">
                <h2>{ note.title }</h2>
                <div className="note-side">
                    <div className="note-card-timestamps">
                        <p>created: { createdAt }</p>
                        {/* show updated date only when actually updated */}
                        { createdAt !== updatedAt && <p>updated: { updatedAt }</p> } 
                    </div>
                </div>
            </Link>
            <button onClick={ handleDelete }>X</button>
        </div>
    );
}
 
export default NoteCard;