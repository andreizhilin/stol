import { Navigate } from 'react-router-dom';

import { useLocalization, Locale } from '@/features';

import { SigninButtonImage } from '../assets';
import { useAuth } from '../hooks';
import { localization } from '../localization';

export function SigninWidget() {
  const { isAuthenticated } = useAuth();
  const { t, locale } = useLocalization(localization);
  const authUri = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${
    import.meta.env.VITE_OAUTH_CLIENT_ID
  }`;

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <div className='m-auto shadow p-10'>
      <a
        data-test='demo-button'
        className='block mb-5 bg-blue-600 cursor-pointer text-white text-center p-4'
        href='/api/authenticate'
      >
        {t('StartDemo')}
      </a>
      {locale === Locale.Ru ? (
        <a data-test='signin-button' className='cursor-pointer' href={authUri}>
          <SigninButtonImage />
        </a>
      ) : (
        <a
          data-test='signin-button'
          className='block mb-5 bg-black cursor-pointer text-white text-center p-4'
          href={authUri}
        >
          {t('SignIn')}
        </a>
      )}
    </div>
  );
}
