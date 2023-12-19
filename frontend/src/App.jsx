import { Route, Routes } from 'react-router-dom';
import './App.css';
import DashLayout from './components/DashLayout';
import Home from './pages/Home';
import Layout from './components/Layout';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path='/' element={<DashLayout />}>
        <Route index element={<Home />} />
      </Route>
      {/* the following routes are protected and strictly for admin and would require authentication */}
      <Route path='/' element={<Layout />}>
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
