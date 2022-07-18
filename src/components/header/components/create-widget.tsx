import React, { useState } from 'react';
import Popup from '@atlaskit/popup';
import Button from '@atlaskit/button';
import { ButtonItem, MenuGroup, Section } from '@atlaskit/menu';
import HipchatChevronDownIcon from '@atlaskit/icon/glyph/hipchat/chevron-down';

import { CreateReminderFormModal, useLocalization } from '@/features';

import { localization } from '../localization';

const DEFAULT_IS_CREATE_DIALOG_OPEN = false;
const DEFAULT_IS_REMINDER_FORM_OPEN = false;

export function CreateWidget() {
  const { t } = useLocalization(localization);
  const [isReminderFormOpen, setIsReminderFormOpen] = useState(DEFAULT_IS_REMINDER_FORM_OPEN);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(DEFAULT_IS_CREATE_DIALOG_OPEN);

  const handleReminderFormOpen = () => {
    setIsReminderFormOpen(true);
  };

  const handleReminderFormClose = () => {
    setIsReminderFormOpen(false);
  };

  const handleCreateClick = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateDialogClose = () => {
    setIsCreateDialogOpen(false);
  };

  const handleCreateDialogClick = () => {
    setIsCreateDialogOpen(false);
  };

  return (
    <Popup
      placement='bottom'
      onClose={handleCreateDialogClose}
      content={() => (
        <MenuGroup onClick={handleCreateDialogClick}>
          <Section>
            <ButtonItem onClick={handleReminderFormOpen} testId='create-reminder-button'>
              {t('Reminder')}
            </ButtonItem>
          </Section>
        </MenuGroup>
      )}
      isOpen={isCreateDialogOpen}
      trigger={triggerProps => (
        <>
          <Button
            {...triggerProps}
            className='self-center'
            iconAfter={<HipchatChevronDownIcon label='Dropdown' size='small' />}
            appearance='primary'
            testId='create-button'
            onClick={handleCreateClick}
          >
            {t('Create')}
          </Button>
          <CreateReminderFormModal isOpen={isReminderFormOpen} onClose={handleReminderFormClose} />
        </>
      )}
    />
  );
}
