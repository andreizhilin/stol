import { BaseLayout } from '@/components';
import { NotepadSettingsWidget } from '@/features';

import { SettingsLayout } from '../components';

export function NotepadSettingsPage() {
  return (
    <BaseLayout>
      <SettingsLayout>
        <NotepadSettingsWidget />
      </SettingsLayout>
    </BaseLayout>
  );
}
