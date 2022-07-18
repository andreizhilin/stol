import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { NotepadPage } from '@/features';

export function NavigationRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/notepad' element={<NotepadPage />} />
        <Route path='/' element={<NotepadPage />} />
      </Routes>
    </Router>
  );
}
