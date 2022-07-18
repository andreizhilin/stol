import { ReactNode } from 'react';
import { Header } from './header';

import { Sidebar } from './sidebar';

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div className='flex flex-col min-h-screen md:flex-row'>
      <Sidebar />
      <div className='w-full'>
        <Header />
        {children}
      </div>
    </div>
  );
}
