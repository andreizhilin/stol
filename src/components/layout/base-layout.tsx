import React, { ReactNode } from 'react';
import { Content, LeftSidebar, Main, PageLayout, TopNavigation } from '@atlaskit/page-layout';

import { Header } from '@/components';

type Props = {
  children: ReactNode;

  leftSidebar?: ReactNode;
};

export function BaseLayout({ children, leftSidebar }: Props) {
  return (
    <PageLayout>
      <TopNavigation isFixed>
        <Header />
      </TopNavigation>
      <Content>
        {leftSidebar && <LeftSidebar>{leftSidebar}</LeftSidebar>}
        <Main>{children}</Main>
      </Content>
    </PageLayout>
  );
}
