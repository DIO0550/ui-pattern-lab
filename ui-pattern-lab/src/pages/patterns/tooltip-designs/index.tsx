import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import TodoPatternComparisonContent from '@site/src/components/TodoPatternComparisonContent';

export default function TooltipDesignsPage(): ReactNode {
  return (
    <Layout description="ツールチップの icon label、disabled reason、placement を比較するページです。" title="ツールチップパターン比較">
      <TodoPatternComparisonContent categoryId="tooltip" />
    </Layout>
  );
}
