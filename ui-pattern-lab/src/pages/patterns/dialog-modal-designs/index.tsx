import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import TodoPatternComparisonContent from '@site/src/components/TodoPatternComparisonContent';

export default function DialogModalDesignsPage(): ReactNode {
  return (
    <Layout description="ダイアログ・モーダルの confirmation、form、destructive guard を比較するページです。" title="ダイアログ・モーダルパターン比較">
      <TodoPatternComparisonContent categoryId="dialog-modal" />
    </Layout>
  );
}
