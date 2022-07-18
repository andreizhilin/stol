import { Link } from 'react-router-dom';

import { SignoutButton } from '@/features';
import { TbGridDots } from 'react-icons/tb';
import { IoMdCog } from 'react-icons/io';
import { ReactNode } from 'react';

type Props = {
  toolbar?: ReactNode;
};

export function Sidebar({ toolbar }: Props) {
  return (
    <div
      className={`
        flex w-full justify-between border-b sticky top-0 bg-white z-50
        md:border-r md:border-b-0 md:w-auto md:flex-col md:h-screen
        dark:border-gray-700 dark:bg-gray-900
      `}
    >
      <div className='flex p-5 md:border-b dark:border-gray-700'>
        <Link to='/'>
          <TbGridDots size='24' />
        </Link>
        <div className='flex ml-5 md:hidden'>{toolbar}</div>
      </div>
      <div className='p-5 flex md:flex-col'>
        <Link to='/settings' className='pr-5 pb-0 md:pr-0 md:pb-5'>
          <IoMdCog size='24' />
        </Link>
        <SignoutButton />
      </div>
    </div>
  );
}
