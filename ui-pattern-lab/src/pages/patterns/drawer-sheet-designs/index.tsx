import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import TodoPatternComparisonContent from '@site/src/components/TodoPatternComparisonContent';

export default function DrawerSheetDesignsPage(): ReactNode {
  return (
    <Layout description="ドロワー・シートの side、bottom、filter drawer を比較するページです。" title="ドロワー・シートパターン比較">
      <TodoPatternComparisonContent categoryId="drawer-sheet" />
    </Layout>
  );
}
