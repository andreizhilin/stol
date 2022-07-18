import { useCallback, useState } from 'react';
import { Profile } from '@atlaskit/atlassian-navigation';
import Avatar from '@atlaskit/avatar';
import Popup from '@atlaskit/popup';

import { useLocalization } from '@/features';

import { ProfileDialog } from './profile-dialog';
import { localization } from './localization';

const DEFAULT_IS_PROFILE_DIALOG_OPEN = false;

export function ProfileWidget() {
  const { t } = useLocalization(localization);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(DEFAULT_IS_PROFILE_DIALOG_OPEN);

  const handleProfileClick = useCallback(() => {
    setIsProfileDialogOpen(true);
  }, []);

  const handleProfileDialogClose = useCallback(() => {
    setIsProfileDialogOpen(false);
  }, []);

  return (
    <Popup
      placement='bottom'
      onClose={handleProfileDialogClose}
      content={() => <ProfileDialog />}
      isOpen={isProfileDialogOpen}
      trigger={triggerProps => (
        <Profile
          {...triggerProps}
          testId='profile-button'
          icon={<Avatar size='small' />}
          tooltip={t('Profile')}
          onClick={handleProfileClick}
        />
      )}
    />
  );
}
