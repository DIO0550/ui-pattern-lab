import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import TodoPatternComparisonContent from '@site/src/components/TodoPatternComparisonContent';

export default function CardDesignsPage(): ReactNode {
  return (
    <Layout description="カードの structure、layout、behavior を比較するページです。" title="カードパターン比較">
      <TodoPatternComparisonContent categoryId="card" />
    </Layout>
  );
}
