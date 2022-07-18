import { auth } from '@/services';

export function SigninButton() {
  return (
    <a className='cursor-pointer' href={auth.buildSigninUri()}>
      Вход
    </a>
  );
}
