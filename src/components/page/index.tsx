import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function Page({ children }: Props) {
  return <div className='flex justify-center min-h-screen bg-gray-50'>{children}</div>;
}
