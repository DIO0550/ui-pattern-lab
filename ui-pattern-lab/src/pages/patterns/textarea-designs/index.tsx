import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import TodoPatternComparisonContent from '@site/src/components/TodoPatternComparisonContent';

export default function TextareaDesignsPage(): ReactNode {
  return (
    <Layout description="テキストエリアの fixed、auto grow、validation を比較するページです。" title="テキストエリアパターン比較">
      <TodoPatternComparisonContent categoryId="textarea" />
    </Layout>
  );
}
