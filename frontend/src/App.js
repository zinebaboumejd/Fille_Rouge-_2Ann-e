import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './Auth/Login';
import Said_Bar from './components/Said_Bar';
import Ajouter_Employer from './pages/Ajouter_Employer';


function App() {
const tocken =localStorage.getItem('tocken')
  return (
    <Router>
      <Routes>     
{
  tocken ? (
    <>
    <Said_Bar/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/Ajouter_Employer" element={<Ajouter_Employer/>}/>
    </>
  ) : (
    <Route path="/" element={<Login/>}/>
  )
}
      </Routes>
    </Router>
  );
}

export default App;
