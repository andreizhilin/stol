import { ReactNode } from 'react';

import { SignoutButton } from '@/features';

import { Clock } from '../clock';

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div className='flex justify-between min-h-screen'>
      <div className='p-5 flex flex-col justify-end basis-1/12'>
        <SignoutButton />
      </div>
      <div className='flex justify-center basis-10/12'>{children}</div>
      <div className='p-5 hidden lg:flex flex-col justify-end basis-1/12'>
        <Clock />
      </div>
    </div>
  );
}
