import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Auth/Login';
import Said_Bar from './components/Said_Bar';
import Ajouter_Employer from './pages/Ajouter_Employer';
import Aliment from './pages/Aliment'
import Repas from './pages/Repas';
import Category  from './pages/Category'
import Page404 from './pages/Page404';


function App() {
  const token =localStorage.getItem('token')
  return (
    <div className="App">
     {
        token ? <Said_Bar /> : null
     }
      <Router>
        <Routes>
        {/* protecte route */}
        {token ? <Route path="/" element={<Dashboard />} /> : <Route path="/login" element={<Login />} />}
        <Route path="/Ajouter_Employer" element={<Ajouter_Employer />} />
        <Route path="/Aliment" element={<Aliment />} />
        <Route path="/Repas" element={<Repas />} />
        <Route path="/Category" element={<Category />} />
        {/* <Route path="*" element={<Page404 />} /> */}

    
        </Routes>
      </Router>
    </div>
  );
}

export default App;
