// @ts-ignore
import { useDocsSidebar } from '@docusaurus/theme-common/internal';
import DocCardList from '@theme/DocCardList';
import React from 'react';

export default function DocCardIndexList() {
  const sidebar = useDocsSidebar();
  return <DocCardList items={sidebar.items} />;
}
