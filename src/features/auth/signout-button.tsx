import { RiLogoutCircleRLine } from 'react-icons/ri';

export function SignoutButton() {
  return (
    <a data-test='signout-button' className='cursor-pointer' href='/api/signout'>
      <RiLogoutCircleRLine size='24' />
    </a>
  );
}
