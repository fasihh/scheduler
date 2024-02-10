import '../styles/Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import getLocalStorage from '../getLocalStorage';
import setLocalStorage from '../setLocalStorage';

const Navbar = () => {
    const userData = getLocalStorage();

    // set cached values to empty - sign out
    const handleSignOut = () => {
        setLocalStorage({ username: '', token: '' });
        window.location.reload();
    }
    
    // to check which end-point currently on
    // show either signup or signin in the navbar
    const location = useLocation();

    // change navbar links depending on user login status
    const loggedIn = userData.token.length !== 0;
    return (
        <nav>
            <div className="nav-container">
                <h2><Link to='/' className='nav-title'>Scheduler</Link></h2>
                <ul className='nav-links'>
                    { location.pathname === '/signin' && <li className='nav-link'><Link to='/signup'>sign up</Link></li> }
                    { location.pathname ==='/signup' && <li className='nav-link'><Link to='/signin'>sign in</Link></li> }
                    { loggedIn && <li className='nav-link'><button onClick={ handleSignOut }>sign out</button></li> }
                    { loggedIn && <li className='nav-link'><Link to='/create'>create task</Link></li> }
                </ul>
            </div>
        </nav>
    );
}
 
export default Navbar;