import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Formulario from './Formulario';
import AcercaDe from './AcercaDe';
import Dashboard from './Dashboard';
import Login from './Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/predict" element={<Formulario />} />
        <Route path="/about" element={<AcercaDe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
