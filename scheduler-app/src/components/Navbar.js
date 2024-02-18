import '../styles/Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import getLocalStorage from '../getLocalStorage';
import removeLocalStorage from '../removeLocalStorage';

const Navbar = () => {
    const userData = getLocalStorage();

    // set cached values to empty - sign out
    const handleSignOut = () => {
        removeLocalStorage();
        window.location.reload();
    }
    
    // to check which end-point currently on
    // show either signup or signin in the navbar
    const location = useLocation();

    // change navbar links depending on user login status
    const loggedIn = userData.token ? userData.token.length !== 0 : false;

    return (
        <nav>
            <div className="nav-container">
                <div className="header">
                    <h2><Link to='/' className='nav-title'>Scheduler</Link></h2>
                    <div>{ getLocalStorage().username }</div>
                </div>
                <ul className='nav-links'>
                    { location.pathname === '/signin' && <li className='nav-link'><Link to='/signup'>sign up</Link></li> }
                    { location.pathname ==='/signup' && <li className='nav-link'><Link to='/signin'>sign in</Link></li> }
                    { loggedIn && <li className='nav-link'><button onClick={ handleSignOut }>sign out</button></li> }
                    { loggedIn && !location.pathname.match('notes') &&
                        <li className='nav-link'><Link to='/create'>create task</Link></li> 
                    }
                    { loggedIn && !location.pathname.match('notes') && 
                        <li className='nav-link'><Link to='/notes'>notes</Link></li> 
                    }
                    { loggedIn && location.pathname.match('notes') &&
                        <li className="nav-link"><Link to='/'>tasks</Link></li>
                    }
                    { loggedIn && <li className="nav-link"><Link to='/timer'>timer</Link></li>}
                </ul>
            </div>
        </nav>
    );
}
 
export default Navbar;