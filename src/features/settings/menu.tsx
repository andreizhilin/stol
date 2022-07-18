import { NavLink } from 'react-router-dom';

export function SettingsMenu() {
  function getClassName(isActive: boolean) {
    return isActive ? 'flex p-2 border-b-2 border-blue-600 hover:bg-gray-100' : 'flex p-2 hover:bg-gray-100';
  }

  // TODO: Localization
  return (
    <div className='flex border-b pl-3'>
      <NavLink to='/settings/common' className={({ isActive }) => getClassName(isActive)}>
        Common
      </NavLink>
      <NavLink to='/settings/notepad' className={({ isActive }) => getClassName(isActive)}>
        Notepad
      </NavLink>
    </div>
  );
}
