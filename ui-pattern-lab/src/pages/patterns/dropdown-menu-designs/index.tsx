import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import TodoPatternComparisonContent from '@site/src/components/TodoPatternComparisonContent';

export default function DropdownMenuDesignsPage(): ReactNode {
  return (
    <Layout description="ドロップダウンメニューの action、grouped、destructive item を比較するページです。" title="ドロップダウンメニューパターン比較">
      <TodoPatternComparisonContent categoryId="dropdown-menu" />
    </Layout>
  );
}
