import React from 'react';
import { Navigate } from 'react-router-dom';

import { useLocalization, Locale } from '@/features';
import { images } from '@/assets';

import { SigninButtonImage } from '../assets';
import { useAuth } from '../hooks';
import { localization } from '../localization';

const AUTH_URI = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${
  import.meta.env.VITE_OAUTH_CLIENT_ID
}&redirect_uri=${import.meta.env.VITE_OAUTH_REDIRECT_URI}`;

export function Signin() {
  const { isAuthenticated } = useAuth();
  const { t, locale } = useLocalization(localization);

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <div className='m-auto shadow p-10'>
      <a
        data-testid='demo-button'
        style={{ background: `url(${images.logo}) center` }}
        className='block mb-5 cursor-pointer text-white text-center p-4'
        href='/api/authenticate'
      >
        {t('StartDemo')}
      </a>
      {locale === Locale.Ru ? (
        <a data-testid='signin-button' className='cursor-pointer' href={AUTH_URI}>
          <SigninButtonImage />
        </a>
      ) : (
        <a
          data-testid='signin-button'
          className='block mb-5 bg-black cursor-pointer text-white text-center p-4'
          href={AUTH_URI}
        >
          {t('SignIn')}
        </a>
      )}
    </div>
  );
}
