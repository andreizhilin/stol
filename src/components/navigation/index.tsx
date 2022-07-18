import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { NotepadPage } from '@/features';

export function NavigationRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/notepad' element={<NotepadPage />} />
        <Route path='/' element={<div className='text-xl bg-gray-100 w-full p-3'>Home</div>} />
      </Routes>
    </Router>
  );
}
