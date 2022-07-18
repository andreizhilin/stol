import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;

  testId?: string;
};

export function PageWrapper({ children, testId }: Props) {
  return (
    <div data-testid={testId} className='flex flex-col w-full max-w-screen-md p-5 lg:ml-40'>
      {children}
    </div>
  );
}
