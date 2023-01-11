import Home from './pages/home'
import FreeGame from './pages/free-game';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';




function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/free-game' element={<FreeGame/>} />
      </Routes>
    </Router>
  );
}

export default App;
