import { Link } from 'react-router-dom';

import { SignoutButton } from '@/features';
import { TbGridDots } from 'react-icons/tb';
import { IoMdCog } from 'react-icons/io';

export function Sidebar() {
  return (
    <div
      className={`
        flex w-full justify-between border-b sticky top-0 bg-white z-50
        md:border-r md:border-b-0 md:w-auto md:flex-col md:h-screen
        dark:border-gray-700 dark:bg-gray-900
      `}
    >
      <Link to='/' className='p-5 md:border-b dark:border-gray-700'>
        <TbGridDots size='24' />
      </Link>
      <div className='p-5 flex md:flex-col'>
        <Link to='/settings' className='pr-5 pb-0 md:pr-0 md:pb-5'>
          <IoMdCog size='24' />
        </Link>
        <SignoutButton />
      </div>
    </div>
  );
}
