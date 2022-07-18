import React from 'react';
import PageHeader from '@atlaskit/page-header';

import { BaseLayout } from '@/components';
import { LanguageSettings, useLocalization } from '@/features';

import { localization } from '../localization';
import { SettingsMenu } from '../components';

export function CommonSettingsPage() {
  const { t } = useLocalization(localization);

  return (
    <BaseLayout leftSidebar={<SettingsMenu />}>
      <div className='mx-8'>
        <PageHeader>{t('Common')}</PageHeader>
        <LanguageSettings />
      </div>
    </BaseLayout>
  );
}
