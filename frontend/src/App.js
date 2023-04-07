import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Auth/Login';
import Said_Bar from './components/Said_Bar';
import Ajouter_Employer from './pages/Ajouter_Employer';
import Aliment from './pages/Aliment'
import Repas from './pages/Repas';
import Category  from './pages/Category'


function App() {
  // const tocken =localStorage.getItem('tocken')
  return (
    <div className="App">
      <Said_Bar />
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Ajouter_Employer" element={<Ajouter_Employer />} />
          <Route path="/Aliment" element={<Aliment />} />
          <Route path="/Repas" element={<Repas />} />
          <Route path="/Category" element={<Category />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
