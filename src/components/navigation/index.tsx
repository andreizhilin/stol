import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Notepad } from '@/modules';

export function NavigationRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/notepad' element={<Notepad />} />
        <Route path='/' element={<div className='text-xl bg-gray-100 w-full p-3'>Home</div>} />
      </Routes>
    </Router>
  );
}
