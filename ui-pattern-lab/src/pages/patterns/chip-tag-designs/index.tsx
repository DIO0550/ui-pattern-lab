import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import TodoPatternComparisonContent from '@site/src/components/TodoPatternComparisonContent';

export default function ChipTagDesignsPage(): ReactNode {
  return (
    <Layout description="チップ・タグの readonly、filter、removable を比較するページです。" title="チップ・タグパターン比較">
      <TodoPatternComparisonContent categoryId="chip-tag" />
    </Layout>
  );
}
