import { Route, Routes } from 'react-router-dom';
import './App.css';
import DashLayout from './components/DashLayout';
import Home from './pages/public/Home';
import Layout from './components/Layout';
import Login from './pages/Login';
// import PersistLogin from "./features/auth/PersistLogin";
// import RequireAuth from "./features/auth/RequireAuth";
import AdminLayout from './components/AdminLayout';
import AdminDash from './pages/admin/AdminDash';
import Novels from './pages/admin/Novels';
import AddNovel from './pages/admin/AddNovel';
import UpdateNovel from './pages/admin/UpdateNovel';
import Chapter from './pages/admin/Chapter';
import useTitle from './hooks/useTitle';
import AddUpload from './pages/admin/AddUpload';
import Uploads from './pages/admin/Uploads';
import EditChapter from './pages/admin/EditChapter';
import ViewChapter from './pages/admin/ViewChapter';
import Novel from './pages/public/Novel';
import PubChapter from './pages/public/PubChapter';
import Search from './pages/public/Search';

function App() {
  useTitle('Novel kona');
  return (
    <Routes>
      <Route path='/' element={<DashLayout />}>
        <Route index element={<Home />} />
        <Route path='/:id' element={<Novel />} />
        <Route path='/:id/:chapterId' element={<PubChapter />} />
        <Route path='/search' element={<Search />} />
      </Route>
      {/* the following routes are protected and strictly for admin and would require authentication */}
      <Route path='/admin' element={<Layout />}>
        <Route index element={<Login />} />

        <Route element={<AdminLayout />}>
          <Route path='dash'>
            <Route index element={<AdminDash />} />
          </Route>

          <Route path='novel'>
            <Route index element={<Novels />} />
            <Route path='add' element={<AddNovel />} />
            <Route path='update' element={<UpdateNovel />} />
          </Route>

          <Route path='chapter'>
            <Route index element={<Chapter />} />
            <Route path='edit' element={<EditChapter />} />
            <Route path='view/:id' element={<ViewChapter />} />
          </Route>

          <Route path='upload'>
            <Route index element={<Uploads />} />
            <Route path='add' element={<AddUpload />} />
          </Route>
        </Route>
        {/* <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}></Route>
        </Route> */}
      </Route>
    </Routes>
  );
}

export default App;
