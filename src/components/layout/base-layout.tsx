import { ReactNode } from 'react';
import { Header } from './header';

import { Sidebar } from './sidebar';

type Props = {
  children: ReactNode;
};

export function BaseLayout({ children }: Props) {
  return (
    <div className='flex flex-col min-h-screen md:flex-row dark:bg-gray-900 dark:text-white'>
      <Sidebar />
      <div className='w-full'>
        <Header />
        {children}
      </div>
    </div>
  );
}
