import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import TodoPatternComparisonContent from '@site/src/components/TodoPatternComparisonContent';

export default function SeparatorDesignsPage(): ReactNode {
  return (
    <Layout description="セパレーターの horizontal、vertical、labelled divider を比較するページです。" title="セパレーターパターン比較">
      <TodoPatternComparisonContent categoryId="separator" />
    </Layout>
  );
}
