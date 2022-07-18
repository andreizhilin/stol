import { Layout } from '@/components';
import { AppearanceSettingsWidget, LocalizationSettingsWidget } from '@/features';

import { SettingsLayout } from '../components';

export function CommonSettingsPage() {
  return (
    <Layout>
      <SettingsLayout>
        <div className='mb-3'>
          <AppearanceSettingsWidget />
        </div>
        <LocalizationSettingsWidget />
      </SettingsLayout>
    </Layout>
  );
}
