import { Link } from 'react-router-dom';

import { SignoutButton } from '@/features';
import { TbGridDots } from 'react-icons/tb';
import { IoMdCog } from 'react-icons/io';

export function Sidebar() {
  return (
    <div className='flex w-full justify-between md:w-auto md:flex-col border sticky top-0 h-screen'>
      <Link to='/' className='p-5 border border-r-0'>
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
