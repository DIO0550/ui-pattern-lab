import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import TodoPatternComparisonContent from '@site/src/components/TodoPatternComparisonContent';

export default function SliderDesignsPage(): ReactNode {
  return (
    <Layout description="スライダーの single、range、stepped value を比較するページです。" title="スライダーパターン比較">
      <TodoPatternComparisonContent categoryId="slider" />
    </Layout>
  );
}
