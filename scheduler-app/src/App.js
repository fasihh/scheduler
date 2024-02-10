import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreateTask from './components/CreateTask';
import NotFound from './components/NotFound';

function App() {
  return (
    // all app routes here
    <div className="app">
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/signin' element={ <SignIn /> } />
        <Route path='/signup' element={ <SignUp /> } />
        <Route path='/create' element={ <CreateTask /> } />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </div>
  );
}

export default App;
