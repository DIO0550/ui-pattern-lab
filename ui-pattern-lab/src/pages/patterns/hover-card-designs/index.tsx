import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import TodoPatternComparisonContent from '@site/src/components/TodoPatternComparisonContent';

export default function HoverCardDesignsPage(): ReactNode {
  return (
    <Layout description="ホバーカードの profile、term、object summary を比較するページです。" title="ホバーカードパターン比較">
      <TodoPatternComparisonContent categoryId="hover-card" />
    </Layout>
  );
}
