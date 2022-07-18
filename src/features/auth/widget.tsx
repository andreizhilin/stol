import { Navigate } from 'react-router-dom';

import { useLocalization } from '@/features';

import { SigninButtonImage } from './assets';
import { useAuth } from './hooks';
import { localization } from './localization';

export function SigninWidget() {
  const { isAuthenticated } = useAuth();
  const { t } = useLocalization(localization);

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <div className='flex flex-col h-screen justify-center'>
      <div className='m-auto shadow p-10 bg-white'>
        <a
          data-test='demo-button'
          className='block mb-5 bg-blue-600 cursor-pointer text-white text-center p-4'
          href='/api/authenticate'
        >
          {t('StartDemo')}
        </a>
        <a
          data-test='signin-button'
          className='cursor-pointer'
          href={`https://oauth.yandex.ru/authorize?response_type=token&client_id=${
            import.meta.env.VITE_OAUTH_CLIENT_ID
          }`}
        >
          <SigninButtonImage />
        </a>
      </div>
    </div>
  );
}
