import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NoteEdit from "./NoteEdit";
import getLocalStorage from "../getLocalStorage";

const Note = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // check if token
        if (getLocalStorage().token) return;
        navigate('/signin');
    }, [navigate]);

    const { noteId } = useParams();
    const { data, isLoading, failedLoading, errorMessage } = useFetch(`${process.env.REACT_APP_API_URL}/notes/${noteId}`);
    const [note, setNote] = useState();

    console.log(data);

    useEffect(() => {
        if (!data) return;
        setNote(data[0]);
    }, [data]);

    return (
        <>
        <Navbar />
        { note && <NoteEdit note={ note } /> }

        { isLoading && <p className='message loading'>loading note...</p> }
        { failedLoading && <p className='message error'>{ errorMessage }</p> }
        </>
    );
}
 
export default Note;