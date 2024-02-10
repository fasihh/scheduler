import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import setLocalStorage from './setLocalStorage';
import getLocalStorage from './getLocalStorage';

const SignUp = () => {
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

    const handleSignUp = () => {
        fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
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
                    case 409:
                        throw new Error('user already exists');
                    case 401:
                        throw new Error('incorrect username or password');
                    default:
                        throw new Error('there was an error');
                }
            };
            return res.json();
        })
        .then(data => {
            console.log(data.token.split(' ')[1]);
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
                <h2>Sign up</h2>
                <form onSubmit={ handleSignUp }>
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
                <button onClick={ handleSignUp }>Sign up!</button>
            </div>
        </>
    );
}
 
export default SignUp;