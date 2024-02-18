import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import CreateTask from './components/CreateTask';
import NotesList from './components/NotesList';
import Note from './components/Note';
import NotFound from './components/NotFound';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Timer from './components/Timer';
import getLocalStorage from './getLocalStorage';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = getLocalStorage();


  // check to see if user is logged in
  useEffect(() => {
      // if token doesn't exist then navigate to signin
      if (!userData.token) {
        // if user already on signin or signup then don't navigate back
        if (location.pathname == '/signin' || location.pathname == '/signup') return;
        
        navigate('/signin');
      };
  }, [navigate, userData.token]);

  return (
    // all app routes here
    <div className="app">
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/signin' element={ <SignIn /> } />
        <Route path='/signup' element={ <SignUp /> } />
        <Route path='/notes' element={ <NotesList /> } />
        <Route path='/notes/:noteId' element={ <Note /> } />
        <Route path='/create' element={ <CreateTask /> } />
        <Route path='/timer' element={ <Timer /> } />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </div>
  );
}

export default App;
