import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import setLocalStorage from '../setLocalStorage';
import getLocalStorage from '../getLocalStorage';

const SignIn = () => {
    const navigate = useNavigate();
    const userData = getLocalStorage();

    // check to see if user is already logged in
    useEffect(() => {
        // if token exists then navigate to home
        if (userData.token) navigate('/');
    }, [navigate, userData.token]);
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const handleSignIn = () => {
        fetch(`${process.env.REACT_APP_API_URL}/user/signin`, {
            // defining type of request
            method: 'POST',
            // defining basic headers
            headers: {
                'Content-Type': 'application/json',
                'Application': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(res => {
            if (!res.ok) {
                // throw error depending on status
                switch(res.status) {
                    case 404:
                        throw new Error('user doesn\'t exist');
                    case 401:
                        throw new Error('incorrect username or password');
                    default:
                        throw new Error('there was an error');
                }
            };
            return res.json();
        })
        .then(data => {
            setLocalStorage({ username: username, token: data.token.split(' ')[1] });
            navigate('/');
        })
        .catch(err => {
            setError(true);
            setErrorMessage(err.message);
        });
    }

    return (
        <>
            <Navbar />
            <div className="sign-up">
                <h2>Sign in</h2>
                <form onSubmit={ handleSignIn }>
                    { error && <p className="error-message">{ errorMessage }</p> }
                    <div className="form-input">
                        <label>Username</label>
                        <input 
                            value={ username }
                            onChange={ (e) => setUsername(e.target.value) }
                            type="text"
                        />
                    </div>
                    <div className="form-input">
                        <label>Password</label>
                        <input 
                            value={ password }
                            onChange={ (e) => setPassword(e.target.value) }
                            type="password"
                        />
                    </div>
                </form>
                <button onClick={ handleSignIn }>Sign in!</button>
            </div>
        </>
        
    );
}
 
export default SignIn;