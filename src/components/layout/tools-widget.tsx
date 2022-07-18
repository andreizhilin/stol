import React, { useCallback, useState } from 'react';
import { PrimaryDropdownButton } from '@atlaskit/atlassian-navigation';
import Popup from '@atlaskit/popup';

import { useLocalization } from '@/features';

import { ToolsDialog } from './tools-dialog';
import { localization } from './localization';

const DEFAULT_IS_TOOLS_DIALOG_OPEN = false;

export function ToolsWidget() {
  const { t } = useLocalization(localization);
  const [isToolsDialogOpen, setIsToolsDialogOpen] = useState(DEFAULT_IS_TOOLS_DIALOG_OPEN);

  const handleToolsClick = useCallback(() => {
    setIsToolsDialogOpen(true);
  }, []);

  const handleToolsDialogClose = useCallback(() => {
    setIsToolsDialogOpen(false);
  }, []);

  return (
    <Popup
      placement='bottom'
      onClose={handleToolsDialogClose}
      content={() => <ToolsDialog />}
      isOpen={isToolsDialogOpen}
      trigger={triggerProps => (
        <PrimaryDropdownButton {...triggerProps} onClick={handleToolsClick} className='pt-px'>
          {t('Tools')}
        </PrimaryDropdownButton>
      )}
    />
  );
}
