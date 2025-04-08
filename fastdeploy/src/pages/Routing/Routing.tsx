import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigation } from './Navigation';
import Login from '../Login/Login';
import useAuthStore from '../Store/useAuthStore';

const RootRouter = () => {
const { auth } = useAuthStore();
console.log('auth', auth);
const accessUser = auth?.status === 'success'
  return (
    <BrowserRouter>
      <Routes>
        {accessUser ?
           <Route path='/*' element={<Navigation />} /> :
          <Route path='/*' element={<Login />} />
        }
      </Routes>
    </BrowserRouter>
  )
}

export default RootRouter