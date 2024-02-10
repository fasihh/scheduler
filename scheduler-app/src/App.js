import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';

function App() {
  return (
    // all app routes here
    <div className="app">
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/signin' element={ <SignIn /> } />
        <Route path='/signup' element={ <SignUp /> } />
      </Routes>
    </div>
  );
}

export default App;
