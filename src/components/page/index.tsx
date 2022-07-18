import { ReactNode } from 'react';
import { Clock } from '../clock';

type Props = {
  children: ReactNode;
};

export function Page({ children }: Props) {
  return (
    <div className='flex justify-center min-h-screen bg-gray-50'>
      {children}
      <div className='fixed bottom-0 right-0 p-5 hidden lg:flex'>
        <Clock />
      </div>
    </div>
  );
}
