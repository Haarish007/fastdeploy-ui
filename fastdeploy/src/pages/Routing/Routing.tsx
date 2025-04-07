import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigation } from './Navigation';
import Login from '../Login/Login';
import SignUp from '../Login/SignUp';

const RootRouter = () => {

  return (
    <BrowserRouter>
      <Routes>
          {/* <Route path='/*' element={<Navigation />} /> */}
          <Route path='/*' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RootRouter