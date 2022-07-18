import React from 'react';
import PageHeader from '@atlaskit/page-header';

import { BaseLayout } from '@/components';
import { NotepadSettings, useLocalization } from '@/features';

import { localization } from '../localization';
import { SettingsMenu } from '../components';

export function NotepadSettingsPage() {
  const { t } = useLocalization(localization);

  return (
    <BaseLayout leftSidebar={<SettingsMenu />}>
      <div className='mx-8'>
        <PageHeader>{t('Notepad')}</PageHeader>
        <NotepadSettings />
      </div>
    </BaseLayout>
  );
}
