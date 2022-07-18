import { GoSignOut } from 'react-icons/go';

export function SignoutButton() {
  return (
    <a data-test='signout-button' className='ml-2 cursor-pointer' href='/api/signout'>
      <GoSignOut size='24' />
    </a>
  );
}
