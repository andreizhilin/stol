import { NavLink } from 'react-router-dom';

import { useLocalization } from '@/features';

import { settingsLocalizationDictionary } from '../localization';

export function SettingsMenu() {
  const { t } = useLocalization(settingsLocalizationDictionary);

  function getClassName(isActive: boolean) {
    return isActive
      ? 'flex px-4 py-2 border-b-2 border-blue-600 bg-gray-100 dark:bg-gray-800'
      : 'flex px-4 py-2 hover:bg-gray-10 dark:hover:bg-gray-800';
  }

  return (
    <div className='flex border-b dark:border-gray-700'>
      <NavLink to='/settings/appearance' className={({ isActive }) => getClassName(isActive)}>
        {t('Appearance')}
      </NavLink>
      <NavLink to='/settings/localization' className={({ isActive }) => getClassName(isActive)}>
        {t('Localization')}
      </NavLink>
      <NavLink to='/settings/notepad' className={({ isActive }) => getClassName(isActive)}>
        {t('Notepad')}
      </NavLink>
    </div>
  );
}
