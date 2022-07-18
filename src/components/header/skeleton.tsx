import React from 'react';
import { NavigationSkeleton } from '@atlaskit/atlassian-navigation/skeleton';

export function HeaderSkeleton() {
  return <NavigationSkeleton primaryItemsCount={1} testId='header-skeleton' />;
}
