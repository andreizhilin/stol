import { ReactNode } from 'react';

import { Clock } from '@/components';

type Props = {
  toolbar?: ReactNode;
};

export function Header({ toolbar }: Props) {
  return (
    <div className='p-5 hidden md:flex justify-between border-b sticky top-0 z-50 bg-white dark:bg-gray-900 dark:border-gray-700'>
      <div data-test='toolbar'>{toolbar}</div>
      <div data-test='clock'>
        <Clock />
      </div>
    </div>
  );
}
