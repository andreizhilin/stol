import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function Page({ children }: Props) {
  return <div className='min-h-screen bg-gray-200'>{children}</div>;
}
