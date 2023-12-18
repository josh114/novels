import { Route, Routes } from 'react-router-dom';
import './App.css';
import DashLayout from './components/DashLayout';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<DashLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
