import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import TodoPatternComparisonContent from '@site/src/components/TodoPatternComparisonContent';

export default function ToastSnackbarDesignsPage(): ReactNode {
  return (
    <Layout description="トースト・スナックバーの success、undo、stacked notification を比較するページです。" title="トースト・スナックバーパターン比較">
      <TodoPatternComparisonContent categoryId="toast-snackbar" />
    </Layout>
  );
}
