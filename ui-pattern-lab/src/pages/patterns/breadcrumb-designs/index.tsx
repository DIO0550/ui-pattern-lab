import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import TodoPatternComparisonContent from '@site/src/components/TodoPatternComparisonContent';

export default function BreadcrumbDesignsPage(): ReactNode {
  return (
    <Layout
      description="パンくずリストの separator、current item、省略表示を比較するページです。"
      title="パンくずリストパターン比較"
    >
      <TodoPatternComparisonContent categoryId="breadcrumb" />
    </Layout>
  );
}
