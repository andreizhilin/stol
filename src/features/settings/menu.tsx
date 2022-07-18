import { NavLink } from 'react-router-dom';

import { useLocalization } from '../localization';
import { settingsLocalizationDictionary } from './localization-dictionary';

export function SettingsMenu() {
  const { t } = useLocalization(settingsLocalizationDictionary);

  function getClassName(isActive: boolean) {
    return isActive ? 'flex p-2 border-b-2 border-blue-600 bg-gray-100' : 'flex p-2 hover:bg-gray-100';
  }

  return (
    <div className='flex border-b pl-3'>
      <NavLink to='/settings/common' className={({ isActive }) => getClassName(isActive)}>
        {t('Common')}
      </NavLink>
      <NavLink to='/settings/notepad' className={({ isActive }) => getClassName(isActive)}>
        {t('Notepad')}
      </NavLink>
    </div>
  );
}
