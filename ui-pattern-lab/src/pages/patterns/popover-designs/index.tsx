import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import TodoPatternComparisonContent from '@site/src/components/TodoPatternComparisonContent';

export default function PopoverDesignsPage(): ReactNode {
  return (
    <Layout description="ポップオーバーの quick edit、picker、helper を比較するページです。" title="ポップオーバーパターン比較">
      <TodoPatternComparisonContent categoryId="popover" />
    </Layout>
  );
}
