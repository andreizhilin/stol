import { ReactNode } from 'react';
import { Header } from './header';

import { Sidebar } from './sidebar';

type Props = {
  children: ReactNode;

  toolbar?: ReactNode;
};

export function BaseLayout({ children, toolbar }: Props) {
  return (
    <div className='flex flex-col min-h-screen md:flex-row dark:bg-gray-900 dark:text-white'>
      <Sidebar toolbar={toolbar} />
      <div className='w-full'>
        <Header toolbar={toolbar} />
        {children}
      </div>
    </div>
  );
}
