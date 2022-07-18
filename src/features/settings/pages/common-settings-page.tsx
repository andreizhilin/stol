import { BaseLayout } from '@/components';
import { AppearanceSettingsWidget, LocalizationSettingsWidget } from '@/features';

import { SettingsLayout } from '../components';

export function CommonSettingsPage() {
  return (
    <BaseLayout>
      <SettingsLayout>
        <div className='mb-3'>
          <AppearanceSettingsWidget />
        </div>
        <LocalizationSettingsWidget />
      </SettingsLayout>
    </BaseLayout>
  );
}
