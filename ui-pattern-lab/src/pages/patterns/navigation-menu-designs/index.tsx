import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import TodoPatternComparisonContent from '@site/src/components/TodoPatternComparisonContent';

export default function NavigationMenuDesignsPage(): ReactNode {
  return (
    <Layout description="ナビゲーションメニューの horizontal、sidebar、mega menu を比較するページです。" title="ナビゲーションメニューパターン比較">
      <TodoPatternComparisonContent categoryId="navigation-menu" />
    </Layout>
  );
}
