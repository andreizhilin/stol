import { NavLink } from 'react-router-dom';

import { useLocalization } from '@/features';

import { settingsLocalizationDictionary } from '../localization';

export function SettingsMenu() {
  const { t } = useLocalization(settingsLocalizationDictionary);

  function getClassName(isActive: boolean) {
    return isActive ? 'flex px-4 py-2 border-b-2 border-blue-600 bg-gray-100' : 'flex px-4 py-2 hover:bg-gray-100';
  }

  return (
    <div className='flex border-b'>
      <NavLink to='/settings/localization' className={({ isActive }) => getClassName(isActive)}>
        {t('Localization')}
      </NavLink>
      <NavLink to='/settings/notepad' className={({ isActive }) => getClassName(isActive)}>
        {t('Notepad')}
      </NavLink>
    </div>
  );
}
