import { ButtonItem, MenuGroup, Section } from '@atlaskit/menu';

import { useLocalization } from '@/features';

import { localization } from '../localization';
import { NavLink } from 'react-router-dom';

export function SettingsMenu() {
  const { t } = useLocalization(localization);

  return (
    <MenuGroup>
      <Section title={t('System')}>
        <NavLink end to='/settings'>
          {({ isActive }) => (
            <ButtonItem isSelected={isActive} testId='common-settings'>
              {t('Common')}
            </ButtonItem>
          )}
        </NavLink>
      </Section>
      <Section title={t('Widgets')}>
        <NavLink end to='/settings/notepad'>
          {({ isActive }) => (
            <ButtonItem isSelected={isActive} testId='notepad-settings'>
              {t('Notepad')}
            </ButtonItem>
          )}
        </NavLink>
      </Section>
    </MenuGroup>
  );
}
