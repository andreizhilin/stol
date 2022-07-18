import React from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonItem, MenuGroup } from '@atlaskit/menu';

import { useLocalization } from '@/features';

import { localization } from './localization';

export function ToolsDialog() {
  const { t } = useLocalization(localization);

  return (
    <MenuGroup>
      <NavLink to='/notepad'>{({ isActive }) => <ButtonItem isSelected={isActive}>{t('Notepad')}</ButtonItem>}</NavLink>
    </MenuGroup>
  );
}
