import { ReactNode } from 'react';

import { Clock } from '@/components';

type Props = {
  children: ReactNode;
};

export function Page({ children }: Props) {
  return (
    <div className='flex justify-center min-h-screen'>
      {children}
      <div className='fixed bottom-0 right-0 p-5 hidden lg:flex'>
        <Clock />
      </div>
    </div>
  );
}
