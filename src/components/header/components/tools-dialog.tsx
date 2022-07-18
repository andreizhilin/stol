import React from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonItem, MenuGroup } from '@atlaskit/menu';

import { useLocalization } from '@/features';

import { localization } from '../localization';

type Props = {
  onClick?: () => void;
};

export function ToolsDialog({ onClick }: Props) {
  const { t } = useLocalization(localization);

  return (
    <MenuGroup onClick={onClick}>
      <NavLink to='/notepad'>{({ isActive }) => <ButtonItem isSelected={isActive}>{t('Notepad')}</ButtonItem>}</NavLink>
      <NavLink to='/reminders'>
        {({ isActive }) => <ButtonItem isSelected={isActive}>{t('Reminders')}</ButtonItem>}
      </NavLink>
    </MenuGroup>
  );
}
