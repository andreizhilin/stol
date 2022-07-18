import { LinkItem, MenuGroup, Section } from '@atlaskit/menu';

import { useAuth, useLocalization } from '@/features';

import { localization } from './localization';

export function ProfileDialog() {
  const { userId } = useAuth();
  const { t } = useLocalization(localization);

  return (
    <MenuGroup>
      <Section title={userId ?? t('Profile')}>
        <LinkItem testId='logout-button' href='/api/signout'>
          {t('Logout')}
        </LinkItem>
      </Section>
    </MenuGroup>
  );
}
