import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Notepad } from '@/modules';
import { Page } from '@/components';

export function NavigationRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path='/notepad'
          element={
            <Page>
              <Notepad />
            </Page>
          }
        />
        <Route path='/' element={<div className='text-xl bg-gray-100 w-full p-3'>Home</div>} />
      </Routes>
    </Router>
  );
}
