import { ReactNode } from 'react';

import { SettingsMenu } from './menu';

type Props = {
  children: ReactNode;
};

export function SettingsLayout({ children }: Props) {
  return (
    <>
      <SettingsMenu />
      <div className='w-full p-5'>{children}</div>
    </>
  );
}
