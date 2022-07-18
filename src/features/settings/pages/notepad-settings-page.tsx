import { Layout } from '@/components';
import { NotepadSettingsWidget } from '@/features';

import { SettingsLayout } from '../components';

export function NotepadSettingsPage() {
  return (
    <Layout>
      <SettingsLayout>
        <NotepadSettingsWidget />
      </SettingsLayout>
    </Layout>
  );
}
