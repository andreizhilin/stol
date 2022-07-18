import { NavLink } from 'react-router-dom';
import { AppSwitcher, AtlassianNavigation, Settings, PrimaryButton } from '@atlaskit/atlassian-navigation';

import { useLocalization } from '@/features';
import { Logo } from '@/components';

import { localization } from './localization';
import { ProfileWidget } from './profile-widget';
import { ToolsWidget } from './tools-widget';

export function Header() {
  const { t } = useLocalization(localization);

  return (
    <AtlassianNavigation
      label={t('AppName')}
      primaryItems={[<ToolsWidget key='tools' />]}
      renderAppSwitcher={() => <AppSwitcher tooltip={t('Bookmarks')} />}
      renderProductHome={() => (
        <NavLink to='/'>
          <PrimaryButton className='items-center'>
            <Logo />
          </PrimaryButton>
        </NavLink>
      )}
      renderSettings={() => (
        <NavLink to='/settings'>
          <Settings testId='settings-button' tooltip={t('Settings')} />
        </NavLink>
      )}
      renderProfile={() => <ProfileWidget />}
    />
  );
}
