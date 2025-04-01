import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigation } from './Navigation';

const RootRouter = () => {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/*' element={<Navigation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RootRouter