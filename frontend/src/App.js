import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Auth/Login';
import Said_Bar from './components/Said_Bar';
import Ajouter_Employer from './pages/Ajouter_Employer';


function App() {
// const tocken =localStorage.getItem('tocken')
  return (
    <div className="App">
      <Said_Bar />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Ajouter_Employer" element={<Ajouter_Employer />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
