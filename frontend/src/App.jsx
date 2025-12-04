import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Formulario from './Formulario';
import AcercaDe from './AcercaDe';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/predict" element={<Formulario />} />
        <Route path="/about" element={<AcercaDe />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
