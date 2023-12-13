import { store } from '../../app/store';
import { uploadSlice } from '../UploadSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(uploadSlice.util.prefetch('getUploads'));
  }, []);

  return <Outlet />;
};
export default Prefetch;
