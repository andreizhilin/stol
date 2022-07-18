import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function CenteredLayout({ children }: Props) {
  return <div className='flex flex-col h-screen justify-center'>{children}</div>;
}
